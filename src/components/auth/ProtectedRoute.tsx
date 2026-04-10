"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth.store";
import { Authenticating } from "./Authenticating";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const router = useRouter();

  const hasHydrated = useAuthStore((state) => state.hasHydrated);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  useEffect(() => {
    if (hasHydrated && !isAuthenticated) {
      router.replace("/unauthorized");
    }
  }, [hasHydrated, isAuthenticated, router]);

  if (!hasHydrated) return <Authenticating />;

  if (!isAuthenticated) return <Authenticating />;

  return <>{children}</>;
}