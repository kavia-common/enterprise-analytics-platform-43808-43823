"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth/auth-context";

/**
 * PUBLIC_INTERFACE
 * Client-side guard for admin-only routes.
 */
export function RequireAdmin({ children }: { children: React.ReactNode }) {
  const { user, hasRole } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.replace("/auth/login");
      return;
    }
    if (!hasRole("admin", "owner")) router.replace("/dashboards");
  }, [user, hasRole, router]);

  if (!user) return null;
  if (!hasRole("admin", "owner")) return null;
  return <>{children}</>;
}
