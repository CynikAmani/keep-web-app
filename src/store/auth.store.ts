import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { User } from "@/types/auth.types";

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  hasHydrated: boolean;
  setAuth: (data: { user: User; token: string }) => void;
  clearAuth: () => void;
  setHydrated: () => void;
}

const ensureStringArray = (value: unknown): string[] =>
  Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : [];

const normalizeUser = (user: User | null | undefined): User => {
  if (!user) {
    throw new Error("Auth store received an invalid user payload.");
  }

  return {
    ...user,
    roles: ensureStringArray(user.roles),
    permissions: ensureStringArray(user.permissions),
  };
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      hasHydrated: false,
      setAuth: ({ user, token }) =>
        set({
          user: normalizeUser(user),
          token,
          isAuthenticated: true,
        }),
      clearAuth: () =>
        set({ user: null, token: null, isAuthenticated: false }),
      setHydrated: () => set({ hasHydrated: true }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage), 
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated();
      },
    }
  )
);
