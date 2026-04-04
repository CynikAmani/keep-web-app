import { RBACService } from "@/services/rbac.service";

export const useRBAC = () => {
  return {
    hasRole: (role: string) => RBACService.hasRole(role),
    hasPermission: (permission: string) => RBACService.hasPermission(permission),
  };
};