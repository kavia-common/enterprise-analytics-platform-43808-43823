"use client";

import React from "react";
import { AppShell } from "@/components/shell/app-shell";
import { RequireAuth } from "@/components/auth/require-auth";
import { Button } from "@/components/ui/button";

export default function WidgetsPage() {
  return (
    <RequireAuth>
      <AppShell>
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h1 className="text-2xl font-semibold">Widgets</h1>
            <p className="text-sm text-gray-600 mt-1">
              Manage reusable widget definitions and templates (UI scaffold).
            </p>
          </div>
          <Button
            onClick={() =>
              alert("Widget CRUD will be wired to backend endpoints in later steps.")
            }
          >
            Create widget
          </Button>
        </div>

        <section className="mt-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {[
            { title: "KPI Card", desc: "Single metric + delta" },
            { title: "Bar Chart", desc: "Grouped histogram" },
            { title: "Table", desc: "Sortable rows" },
          ].map((w) => (
            <div key={w.title} className="card p-4">
              <div className="text-lg font-semibold">{w.title}</div>
              <div className="text-sm text-gray-600 mt-1">{w.desc}</div>
              <div className="mt-4 flex gap-2">
                <Button variant="secondary" onClick={() => alert("Edit widget (TODO)")}>
                  Edit
                </Button>
                <Button variant="danger" onClick={() => alert("Delete widget (TODO)")}>
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </section>
      </AppShell>
    </RequireAuth>
  );
}
