"use client"

import { createContext, useContext, ReactNode } from "react";
import { RBACService } from "@/services/rbac.service";

interface RBACContextType {
  hasRole: (role: string) => boolean;
  hasPermission: (permission: string) => boolean;
}

const RBACContext = createContext<RBACContextType | undefined>(undefined);

interface RBACProviderProps {
  children: ReactNode;
}

export const RBACProvider = ({ children }: RBACProviderProps) => {
  return (
    <RBACContext
      value={{
        hasRole: RBACService.hasRole,
        hasPermission: RBACService.hasPermission,
      }}
    >
      {children}
    </RBACContext>
  );
};

export const useRBAC = (): RBACContextType => {
  const ctx = useContext(RBACContext);
  if (!ctx) throw new Error("useRBAC must be used inside RBACProvider");
  return ctx;
};