import { useAuthStore } from "@/store/auth.store";

export class RBACService {
  static hasRole(role: string): boolean {
    const { roles } = useAuthStore.getState();
    return roles.includes(role);
  }

  static hasPermission(permission: string): boolean {
    const { permissions } = useAuthStore.getState();
    return permissions.includes(permission);
  }
}