"use client";

import React from "react";
import { useRBAC } from "@/hooks/auth/useRBAC";

interface PermissionGuardProps {
  permission: string;
  children: React.ReactNode; 
}

export function PermissionGuard({ 
  permission, 
  children, 
}: PermissionGuardProps) {
  const { hasPermission } = useRBAC();

  return hasPermission(permission) ? <>{children}</> : null;
}