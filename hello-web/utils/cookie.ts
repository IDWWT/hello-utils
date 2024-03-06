import { GetUserAccessToken } from "@/types/user";
import { getCookie } from 'cookies-next';

export const getUserAccessTokenFromCookie = (): GetUserAccessToken => {
  const keys: (keyof GetUserAccessToken)[] = ['userId', 'accessToken'];
  const userAccessToken = (keys as string[]).reduce((acc, cur) => {
    acc[cur] = getCookie(cur);
    return acc;
  }, {} as { [index: string]: string | undefined });
  return userAccessToken as GetUserAccessToken;
}

export const getXUserInfoFromCookie = () => {
  const { userId, accessToken } = getUserAccessTokenFromCookie();
  return {
    "X-User-Id": userId || "",
    "X-User-Token": accessToken || "",
  }
}