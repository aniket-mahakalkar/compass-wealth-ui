import type { AppPermission, Role } from "@/types/auth";

export const rolePermissionMap: Record<Role, AppPermission[]> = {
  ADMIN: ["route:dashboard", "route:admin", "users:read", "users:update-role"],
  USER: ["route:dashboard"],
};

export const hasRolePermission = (
  role: Role | undefined,
  requiredPermission: AppPermission,
): boolean => {
  if (!role) {
    return false;
  }

  return rolePermissionMap[role].includes(requiredPermission);
};
