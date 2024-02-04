import RDSConnection from "./rds";
import { Connection, RowDataPacket } from "mysql2/promise";
import RedisConnection from "./redis";

export type UserUniqueKey = {
  userEmail: string;
};
export type UserAccessToken = {
  userId: string;
  accessToken: string;
}

export const getUserId = async ({ userEmail }: UserUniqueKey): Promise<string | null> => {
  return RDSConnection.transactionExecutor(async (connection: Connection) => {
    let query = '';
    let params: any[] = [];

    query += `
      SELECT user_id AS userId
      FROM user_master
      WHERE user_email = ?
    `;

    params.push(userEmail);

    const [rows, fields] = await connection.query(query, params);
    const user = (rows as RowDataPacket[])[0];
    return user ? user['userId'] : null;
  });
};

export const createUser = async ({ userEmail }: UserUniqueKey) => {
  return RDSConnection.transactionExecutor(async (connection: Connection) => {
    let query = '';
    let params: any[] = [];

    query += `
      INSERT INTO user_master
        (user_id, user_email, role_code)
      VALUES
        (UUID(), ?, 'NORMAL')
    `;

    params.push(userEmail);

    const result = await connection.execute(query, params);
    return result[0];
  });
}

export const setAccessToken = async ({ userId, accessToken }: UserAccessToken) => {
  return RedisConnection.redisExecutor(async (redisClient) => {
    return await redisClient.set(`${userId}_accessToken`, accessToken, { EX: 259200 }); // 3일 후 만료
  });
}