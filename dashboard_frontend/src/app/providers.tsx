"use client";

import React from "react";
import { AuthProvider } from "@/lib/auth/auth-context";
import { TenantProvider } from "@/lib/tenant/tenant-context";

/**
 * PUBLIC_INTERFACE
 * Top-level client providers for the application (auth + multi-tenant selection).
 */
export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <TenantProvider>{children}</TenantProvider>
    </AuthProvider>
  );
}
