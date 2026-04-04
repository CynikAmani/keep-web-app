"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth.store";
import { Authenticating } from "./Authenticating";

interface ProtectedRouteProps {
  children: React.ReactNode;
  fallbackPath?: string;
}

export function ProtectedRoute({
  children,
  fallbackPath = "/unauthorized",
}: ProtectedRouteProps) {
  const router = useRouter();
  const [isHydrated, setIsHydrated] = useState(false);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  

  useEffect(() => {
    const unsub = useAuthStore.persist.onFinishHydration(() => {
      setIsHydrated(true);
    });

    if (useAuthStore.persist.hasHydrated()) {
      setIsHydrated(true);
    }

    return () => unsub();
  }, []);

  useEffect(() => {
    if (isHydrated && !isAuthenticated) {
      router.push(fallbackPath);
    }
  }, [isHydrated, isAuthenticated, router, fallbackPath]);

  if (!isHydrated) {
    return <Authenticating />;
  }

  return isAuthenticated ? <>{children}</> : null;
}