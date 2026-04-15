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
  const { user, isAuthenticated } = useAuthStore();
  const safeRoles = user?.roles || [];

  if (!isAuthenticated) return fallback;

  const hasAccess = 
    allowedRoles === "*" || 
    allowedRoles.some((role) => safeRoles.includes(role));

  return hasAccess ? <>{children}</> : fallback;
}
