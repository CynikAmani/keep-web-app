"use client";

import { useAuthStore } from "@/store/auth.store";
import { AllowedRoles } from "@/config/navigation.config";

interface ActionGuardProps {
  children: React.ReactNode;
  allowedRoles: AllowedRoles;
  fallback?: React.ReactNode;
}

export function ActionGuard({ 
  children, 
  allowedRoles, 
  fallback = null 
}: ActionGuardProps) {
  const { roles: userRoles, isAuthenticated } = useAuthStore();

  if (!isAuthenticated) return fallback;

  const hasAccess = 
    allowedRoles === "*" || 
    allowedRoles.some((role) => userRoles.includes(role));

  return hasAccess ? <>{children}</> : fallback;
}