"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth/auth-context";

/**
 * PUBLIC_INTERFACE
 * Client-side guard for routes that require an authenticated user.
 */
export function RequireAuth({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) router.replace("/auth/login");
  }, [user, router]);

  if (!user) return null;
  return <>{children}</>;
}
