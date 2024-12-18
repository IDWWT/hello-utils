import RedisConnection from "./redis";
import { User, GetUserAccessToken, UserSearchCondition, UserWithRole, UserUniqueKey, UserSession, SetUserAccessToken } from "@/types/user";
import { getClient } from "./graphql-server";
import { CREATE_USER_BY_EMAIL, GET_USER_ID_BY_EMAIL, GET_USER_LIST, GET_USER_SESSION_BY_EMAIL } from "@/graphql/user";
import { Session } from "next-auth";

export const checkNotExistUserSession = (session: Session) => {
  const NEED_CHECK_PROPERTIES: (keyof UserWithRole)[] = ['userId', 'userEmail', 'roleCode', 'userRole'];
  return NEED_CHECK_PROPERTIES.some(key => !Object.keys(session).includes(key));
}

export const getAccessToken = async ({ userId }: Pick<User, 'userId'>): Promise<string | null> => {
  return RedisConnection.redisExecutor(async (redisClient) => {
    return await redisClient.get(`${userId}_accessToken`);
  });
}

export const setAccessToken = async ({ userId, accessToken }: SetUserAccessToken) => {
  return RedisConnection.redisExecutor(async (redisClient) => {
    return await redisClient.set(`${userId}_accessToken`, accessToken, { EX: 259200 }); // 3일 후 만료
  });
}

export const setUserSession = async (userSession: UserSession) => {
  return RedisConnection.redisExecutor(async (redisClient) => {
    return await redisClient.set(`user_session_${userSession.userId}`, JSON.stringify(userSession), { EX: 259200 }); // 3일 후 만료
  });
}

export const delAccessToken = async ({ userId }: Pick<User, 'userId'>): Promise<string | null> => {
  return RedisConnection.redisExecutor(async (redisClient) => {
    return await redisClient.del(`${userId}_accessToken`);
  });
}

export const getUserIdByEmail = async ({ userEmail }: UserUniqueKey) => {
  const { data } = await getClient().query({ query: GET_USER_ID_BY_EMAIL, variables: { userEmail } });
  return data.users[0]?.userId;
}

export const getUserSessionByEmail = async ({ userEmail }: UserUniqueKey): Promise<UserWithRole | undefined> => {
  const { data } = await getClient().query({ query: GET_USER_SESSION_BY_EMAIL, variables: { userEmail } });
  return data.users[0];
}

export const getUserList = async ({ first, after }: UserSearchCondition) => {
  const { data } = await getClient().query({ query: GET_USER_LIST, variables: { first, after } });
  return data;
}

export const createUserByEmail = async ({ userEmail }: UserUniqueKey): Promise<UserWithRole> => {
  const { data } = await getClient().mutate({ mutation: CREATE_USER_BY_EMAIL, variables: { userEmail } })
  return data.mutateUser.user;
}
