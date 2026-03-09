"use client";

import React, { useMemo, useState } from "react";
import { AppShell } from "@/components/shell/app-shell";
import { RequireAdmin } from "@/components/auth/require-admin";
import { Input } from "@/components/ui/input";
import type { AuditEvent } from "@/lib/types";

const seedEvents: AuditEvent[] = [
  {
    id: "ae_1",
    at: new Date(Date.now() - 1000 * 60 * 12).toISOString(),
    actorEmail: "admin@acme.com",
    action: "dashboard.create",
    entityType: "dashboard",
    entityId: "d_main",
    metadata: { workspaceId: "ws_acme_prod" },
  },
  {
    id: "ae_2",
    at: new Date(Date.now() - 1000 * 60 * 42).toISOString(),
    actorEmail: "member@acme.com",
    action: "widget.update",
    entityType: "widget",
    entityId: "w_bar",
    metadata: { field: "title" },
  },
  {
    id: "ae_3",
    at: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    actorEmail: "admin@globex.com",
    action: "workspace.switch",
    entityType: "workspace",
    entityId: "ws_globex_main",
    metadata: {},
  },
];

export default function AuditLogPage() {
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const qq = q.trim().toLowerCase();
    if (!qq) return seedEvents;
    return seedEvents.filter((e) => {
      const hay = [
        e.actorEmail ?? "",
        e.action,
        e.entityType,
        e.entityId ?? "",
        JSON.stringify(e.metadata ?? {}),
      ]
        .join(" ")
        .toLowerCase();
      return hay.includes(qq);
    });
  }, [q]);

  return (
    <RequireAdmin>
      <AppShell>
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h1 className="text-2xl font-semibold">Audit Log</h1>
            <p className="text-sm text-gray-600 mt-1">
              View admin-relevant security and activity events (UI scaffold).
            </p>
          </div>
          <div className="w-full max-w-sm">
            <Input
              placeholder="Filter by actor, action, entity…"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </div>
        </div>

        <div className="mt-6 card p-0 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-xs text-gray-500 bg-gray-50">
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium">Time</th>
                <th className="text-left py-3 px-4 font-medium">Actor</th>
                <th className="text-left py-3 px-4 font-medium">Action</th>
                <th className="text-left py-3 px-4 font-medium">Entity</th>
                <th className="text-left py-3 px-4 font-medium">Metadata</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((e) => (
                <tr key={e.id} className="border-b border-gray-100">
                  <td className="py-3 px-4 font-mono text-xs">
                    {new Date(e.at).toLocaleString()}
                  </td>
                  <td className="py-3 px-4">{e.actorEmail ?? "—"}</td>
                  <td className="py-3 px-4 font-mono text-xs">{e.action}</td>
                  <td className="py-3 px-4">
                    <span className="text-xs rounded-full bg-gray-50 border border-gray-200 px-2 py-1">
                      {e.entityType}
                    </span>
                    {e.entityId ? (
                      <span className="ml-2 font-mono text-xs text-gray-600">
                        {e.entityId}
                      </span>
                    ) : null}
                  </td>
                  <td className="py-3 px-4 font-mono text-xs text-gray-600">
                    {JSON.stringify(e.metadata ?? {})}
                  </td>
                </tr>
              ))}

              {filtered.length === 0 ? (
                <tr>
                  <td className="py-6 px-4 text-sm text-gray-600" colSpan={5}>
                    No events match your filter.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </AppShell>
    </RequireAdmin>
  );
}
