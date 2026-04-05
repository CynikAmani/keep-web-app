"use client";

import { useAuth } from "@/hooks/auth/useAuth";
import { useRBAC } from "@/hooks/auth/useRBAC";
import { APP_NAVIGATION } from "@/config/navigation.config";

export function useAppNavigation() {
  const { isAuthenticated } = useAuth();
  const { hasRole } = useRBAC();

  const filteredNavigation = APP_NAVIGATION.filter((item) => {
    if (!isAuthenticated) return false;

    if (item.allowedRoles === "*") return true;

    return item.allowedRoles.some((role) => hasRole(role));
  });

  return filteredNavigation;
}