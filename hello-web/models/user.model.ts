import { UserRole } from "./role.model";

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