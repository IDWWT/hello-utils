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

export const setAccessToken = async ({ userId, accessToken }: UserAccessToken) => {
  return RedisConnection.redisExecutor(async (redisClient) => {
    return await redisClient.set(`${userId}_accessToken`, accessToken, { EX: 259200 }); // 3일 후 만료
  });
}