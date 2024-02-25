import RedisConnection from "./redis";
import { User, UserAccessToken, UserSearchCondition, UserSession, UserUniqueKey } from "@/types/user";
import { getClient } from "./graphql-server";
import { CREATE_USER_BY_EMAIL, GET_USER_ID_BY_EMAIL, GET_USER_LIST, GET_USER_SESSION_BY_EMAIL } from "@/graphql/user";


export const getAccessToken = async ({ userId }: Pick<User, 'userId'>): Promise<string | null> => {
  return RedisConnection.redisExecutor(async (redisClient) => {
    return await redisClient.get(`${userId}_accessToken`);
  });
}

export const setAccessToken = async ({ userId, accessToken }: UserAccessToken) => {
  return RedisConnection.redisExecutor(async (redisClient) => {
    return await redisClient.set(`${userId}_accessToken`, accessToken, { EX: 259200 }); // 3일 후 만료
  });
}

export const getUserIdByEmail = async ({ userEmail }: UserUniqueKey) => {
  const { data } = await getClient().query({ query: GET_USER_ID_BY_EMAIL, variables: { userEmail } });
  return data.users.edges[0]?.node?.userId;
}

export const getUserSessionByEmail = async ({ userEmail }: UserUniqueKey): Promise<UserSession> => {
  const { data } = await getClient().query({ query: GET_USER_SESSION_BY_EMAIL, variables: { userEmail } });
  return data.users.edges[0]?.node;
}

export const getUserList = async ({ first, after }: UserSearchCondition) => {
  const { data } = await getClient().query({ query: GET_USER_LIST, variables: { first, after } });
  return data;
}

export const createUserByEmail = async ({ userEmail }: UserUniqueKey) => {
  const { data } = await getClient().mutate({ mutation: CREATE_USER_BY_EMAIL, variables: { userEmail } })
  return data.mutateUser.user.userId;
}
