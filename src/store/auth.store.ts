import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { User } from "@/types/auth.types";

export interface AuthState {
  user: User | null;
  token: string | null;
  roles: string[];
  permissions: string[];
  isAuthenticated: boolean;
  isLoading: boolean;
  setAuth: (data: { user: User; token: string; roles: string[]; permissions: string[] }) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      roles: [],
      permissions: [],
      isAuthenticated: true, 
      isLoading: false,
      setAuth: ({ user, token, roles, permissions }) =>
        set({ user, token, roles, permissions, isAuthenticated: true }),
      clearAuth: () =>
        set({ user: null, token: null, roles: [], permissions: [], isAuthenticated: false }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);