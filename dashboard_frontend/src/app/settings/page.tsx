"use client";

import React from "react";
import { AppShell } from "@/components/shell/app-shell";
import { RequireAuth } from "@/components/auth/require-auth";

export default function SettingsPage() {
  return (
    <RequireAuth>
      <AppShell>
        <h1 className="text-2xl font-semibold">Settings</h1>
        <p className="text-sm text-gray-600 mt-1">
          Profile, workspace settings, API keys, and notification preferences will live here.
        </p>

        <div className="mt-6 card p-4">
          <div className="text-sm text-gray-500">Note</div>
          <div className="text-sm mt-1">
            This is the UI scaffold for step 01.01. Backend integration comes in later steps.
          </div>
        </div>
      </AppShell>
    </RequireAuth>
  );
}
