import { UserRole } from "@/types/role";

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

export type User = {
  userId: string;
  userEmail: string;
  roleCode: string;
  socialId: string;
  createdAt: string;
  updatedAt: string;
}

export type UserSession = User & {
  userRole: Omit<UserRole, 'createdAt' | 'updatedAt'>
}

export type UserWithRole = {
  userRole: Omit<UserRole, 'createdAt' | 'updatedAt'>
} & User;