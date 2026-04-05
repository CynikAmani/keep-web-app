import { useAuthStore } from "@/store/auth.store";

export class UserService {
  static getUser() {
    return useAuthStore.getState().user;
  }

  static getUserId() {
    return useAuthStore.getState().user?.id || null;
  }

  static getRoles() {
    return useAuthStore.getState().roles || [];
  }

  static getPermissions() {
    return useAuthStore.getState().permissions || [];
  }
}