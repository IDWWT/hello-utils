export type UserRole = {
  roleCode: string;
  roleName: string;
  canEditPostYn: 'Y' | 'N';
  canDeletePostYn: 'Y' | 'N';
  createdAt: string;
  updatedAt: string;
}