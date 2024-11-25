import { UserRole } from "@/types/role";

export type UserUniqueKey = {
  userEmail: string;
};

export type SetUserAccessToken = {
  userId: string;
  accessToken: string;
}

export type GetUserAccessToken = {
  userId: string | undefined;
  accessToken: string | undefined;
}

export type UserSearchCondition = {
  first: number,
  after?: string,
}

export type User = {
  userId: string;
  userEmail: string;
  roleCode: string;
  socialId: string;
  createdAt: string;
  updatedAt: string;
}

export type UserSession = User & {
  provider: string;
  providerAccountId: string;
  accessToken: string;
  userRole: Omit<UserRole, 'createdAt' | 'updatedAt'>
}

export type UserWithRole = {
  userRole: Omit<UserRole, 'createdAt' | 'updatedAt'>
} & User;