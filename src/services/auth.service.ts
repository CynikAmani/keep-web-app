import axios from "axios";
import api from "@/lib/axios";
import { useAuthStore } from "@/store/auth.store";
import { User, SigninPayload, SignupPayload, AuthResourceResponse } from "@/types/auth.types";

export class AuthService {
  async signin(payload: SigninPayload): Promise<User> {
    let res;

    try {
      res = await api.post<AuthResourceResponse>("/auth/signin", payload);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || "Authentication failed");
      }
      throw error;
    }

    useAuthStore.getState().setAuth({
      user: res.data.data.user,
      token: res.data.data.token,
    });

    return res.data.data.user;
  }

  async signup(payload: SignupPayload): Promise<User> {
    let res;

    try {
      res = await api.post<AuthResourceResponse>("/auth/signup", payload);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || "Registration failed");
      }
      throw error;
    }

    useAuthStore.getState().setAuth({
      user: res.data.data.user,
      token: res.data.data.token,
    });

    return res.data.data.user;
  }

  async logout(): Promise<void> {
    try {
      await api.post("/auth/logout");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      useAuthStore.getState().clearAuth();
      if (typeof window !== "undefined") {
        window.location.replace("/");
      }
    }
  }
}

export const authService = new AuthService();
