import { jwtDecode } from "jwt-decode";
import { getStoredToken } from "@/lib/axios";

export interface RBACPayload {
  user_id: number;
  roles: string[];
  permissions: string[];
  exp?: number;
}

export class RBACService {
  /*
  -----------------------
  | Private helpers
  -----------------------
  */ 
  private static getPayload(): RBACPayload | null {
    const token = getStoredToken()
    if (!token) return null;

    try {
      return jwtDecode<RBACPayload>(token);
    } catch (error) {
      console.error("RBACService: Failed to decode token", error);
      return null;
    }
  }

  private static getRoles(): string[] {
    return this.getPayload()?.roles || [];
  }

  private static getPermissions(): string[] {
    return this.getPayload()?.permissions || [];
  }

  // -----------------------
  // Public API
  // -----------------------
  static hasRole(role: string): boolean {
    return this.getRoles().includes(role);
  }

  static hasPermission(permission: string): boolean {
    return this.getPermissions().includes(permission);
  }

  static getUserId(): number | null {
    return this.getPayload()?.user_id || null;
  }
}