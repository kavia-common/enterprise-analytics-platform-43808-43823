"use client";

import React, { useMemo, useState } from "react";
import { Plus, RefreshCw } from "lucide-react";
import { AppShell } from "@/components/shell/app-shell";
import { RequireAuth } from "@/components/auth/require-auth";
import { Button } from "@/components/ui/button";
import type { Dashboard, Widget } from "@/lib/types";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function seedDashboard(workspaceId: string): Dashboard {
  const widgets: Widget[] = [
    {
      id: "w_kpi",
      dashboardId: "d_main",
      type: "kpi",
      title: "Active Users (mock)",
      config: { value: 1284, delta: 6.2 },
    },
    {
      id: "w_bar",
      dashboardId: "d_main",
      type: "bar",
      title: "Events by day (mock)",
      config: {},
    },
    {
      id: "w_table",
      dashboardId: "d_main",
      type: "table",
      title: "Top Pages (mock)",
      config: {},
    },
  ];

  return {
    id: "d_main",
    workspaceId,
    name: "Executive Overview",
    description: "High-level overview of key metrics.",
    widgets,
  };
}

export default function DashboardsPage() {
  const [tick, setTick] = useState(0);

  const dashboard = useMemo(() => seedDashboard("workspace"), []);
  const chartData = useMemo(() => {
    // Deterministic-ish mock data that changes with refresh.
    const base = [22, 28, 25, 36, 31, 40, 38];
    return base.map((v, idx) => ({
      day: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][idx],
      events: v + (tick % 7) * 2,
    }));
  }, [tick]);

  const tableRows = useMemo(() => {
    const pages = ["/", "/pricing", "/docs", "/login", "/dashboards"];
    return pages.map((p, i) => ({
      page: p,
      views: 1200 - i * 140 + (tick % 5) * 11,
      ctr: `${(3.2 - i * 0.3 + (tick % 3) * 0.1).toFixed(1)}%`,
    }));
  }, [tick]);

  return (
    <RequireAuth>
      <AppShell>
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h1 className="text-2xl font-semibold">Dashboards</h1>
            <p className="text-sm text-gray-600 mt-1">
              Multi-tenant dashboards with configurable widgets (UI scaffold).
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="secondary" onClick={() => setTick((t) => t + 1)}>
              <RefreshCw size={16} /> Refresh mock data
            </Button>
            <Button onClick={() => alert("Widget builder will be wired to backend in later steps.")}>
              <Plus size={16} /> New widget
            </Button>
          </div>
        </div>

        <section className="mt-6 grid grid-cols-1 xl:grid-cols-3 gap-4">
          <div className="card p-4">
            <div className="text-sm text-gray-500">Dashboard</div>
            <div className="text-lg font-semibold">{dashboard.name}</div>
            <div className="text-sm text-gray-600 mt-1">{dashboard.description}</div>
          </div>

          <div className="card p-4 xl:col-span-2">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-500">KPI</div>
                <div className="text-lg font-semibold">Active Users</div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-semibold">
                  {1284 + (tick % 9) * 7}
                </div>
                <div className="text-xs text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-full px-2 py-1 inline-block">
                  +{(6.2 + (tick % 4) * 0.3).toFixed(1)}% WoW
                </div>
              </div>
            </div>
          </div>

          <div className="card p-4 xl:col-span-2">
            <div className="text-sm text-gray-500">Chart</div>
            <div className="text-lg font-semibold">Events by day</div>
            <div className="h-64 mt-3">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="events" fill="#3b82f6" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="card p-4">
            <div className="text-sm text-gray-500">Table</div>
            <div className="text-lg font-semibold">Top Pages</div>

            <div className="mt-3 overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="text-xs text-gray-500">
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2 pr-2 font-medium">Page</th>
                    <th className="text-right py-2 px-2 font-medium">Views</th>
                    <th className="text-right py-2 pl-2 font-medium">CTR</th>
                  </tr>
                </thead>
                <tbody>
                  {tableRows.map((r) => (
                    <tr key={r.page} className="border-b border-gray-100">
                      <td className="py-2 pr-2 font-mono text-xs">{r.page}</td>
                      <td className="py-2 px-2 text-right">{r.views}</td>
                      <td className="py-2 pl-2 text-right">{r.ctr}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </AppShell>
    </RequireAuth>
  );
}
