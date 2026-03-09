"use client";

import React from "react";
import Link from "next/link";
import { AppShell } from "@/components/shell/app-shell";
import { RequireAdmin } from "@/components/auth/require-admin";

export default function AdminPage() {
  return (
    <RequireAdmin>
      <AppShell>
        <h1 className="text-2xl font-semibold">Admin</h1>
        <p className="text-sm text-gray-600 mt-1">
          Administrative tools for RBAC, org policies, and audit review.
        </p>

        <section className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link href="/admin/audit" className="card p-4 hover:bg-gray-50 transition-colors">
            <div className="text-lg font-semibold">Audit Log</div>
            <div className="text-sm text-gray-600 mt-1">
              Review user actions across organizations and workspaces.
            </div>
          </Link>

          <div className="card p-4">
            <div className="text-lg font-semibold">RBAC & Policies</div>
            <div className="text-sm text-gray-600 mt-1">
              Coming next: roles, permissions, and policy management screens.
            </div>
          </div>
        </section>
      </AppShell>
    </RequireAdmin>
  );
}
