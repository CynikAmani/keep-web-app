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
  hasHydrated: boolean;
  setAuth: (data: { user: User; token: string; roles: string[]; permissions: string[] }) => void;
  clearAuth: () => void;
  setHydrated: () => void;
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
      hasHydrated: false,
      setAuth: ({ user, token, roles, permissions }) =>
        set({ user, token, roles, permissions, isAuthenticated: true }),
      clearAuth: () =>
        set({ user: null, token: null, roles: [], permissions: [], isAuthenticated: false }),
      setHydrated: () => set({ hasHydrated: true }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage), 
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        roles: state.roles,
        permissions: state.permissions,
        isAuthenticated: state.isAuthenticated,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated();
      },
    }
  )
);