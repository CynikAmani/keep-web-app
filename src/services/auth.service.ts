import api from "@/lib/axios";
import { useAuthStore } from "@/store/auth.store";
import { User, SigninPayload, SignupPayload, AuthResponse } from "@/types/auth.types";

export class AuthService {
  async signin(payload: SigninPayload): Promise<User> {
    try {
      const res = await api.post<AuthResponse>("/auth/signin", payload);
      useAuthStore.getState().setAuth({
        user: res.data.user,
        token: res.data.token,
        roles: res.data.roles,
        permissions: res.data.permissions,
      });
      return res.data.user;
    } catch (error: any) {
      if (error.response) {
        throw new Error(error.response.data?.message || "Authentication failed");
      }
      throw new Error("Network error. Please try again.");
    }
  }

  async signup(payload: SignupPayload): Promise<User> {
    try {
      const res = await api.post<AuthResponse>("/auth/signup", payload);
      useAuthStore.getState().setAuth({
        user: res.data.user,
        token: res.data.token,
        roles: res.data.roles,
        permissions: res.data.permissions,
      });
      return res.data.user;
    } catch (error: any) {
      if (error.response) {
        throw new Error(error.response.data?.message || "Registration failed");
      }
      throw new Error("Network error. Please try again.");
    }
  }

  async logout(): Promise<void> {
    try {
      await api.post("/auth/logout");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      useAuthStore.getState().clearAuth();
    }
  }
}

export const authService = new AuthService();