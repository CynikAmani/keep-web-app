"use client";

import React from "react";
import { useRBAC } from "@/hooks/auth/useRBAC";
import { btnBrandMd } from "@/config/uiClasses";

interface ActionButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  permission: string;
  variantClassName?: string;
  children: React.ReactNode;
}

export function ActionButton({ 
  permission, 
  variantClassName = btnBrandMd, 
  children, 
  ...props 
}: ActionButtonProps) {
  const { hasPermission } = useRBAC();

  if (!hasPermission(permission)) return null;

  return (
    <button className={variantClassName} {...props}>
      {children}
    </button>
  );
}