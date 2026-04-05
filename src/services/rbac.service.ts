import { useAuthStore } from "@/store/auth.store";

export class RBACService {
  static hasRole(role: string): boolean {
    const roles = useAuthStore.getState().roles;
    return roles.includes(role);
  }

  static hasPermission(permission: string): boolean {
    const permissions = useAuthStore.getState().permissions;
    return permissions.includes(permission);
  }
}