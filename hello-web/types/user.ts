export type UserUniqueKey = {
  userEmail: string;
};

export type UserAccessToken = {
  userId: string;
  accessToken: string;
}

export type UserSearchCondition = {
  first: number,
  after?: string,
}
