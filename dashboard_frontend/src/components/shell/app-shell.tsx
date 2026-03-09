"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Building2, LayoutDashboard, LogOut, Settings, Shield, ShieldCheck, Activity } from "lucide-react";
import { cn } from "@/lib/cn";
import { useAuth } from "@/lib/auth/auth-context";
import { useTenant } from "@/lib/tenant/tenant-context";
import { Button } from "@/components/ui/button";

const navItems = [
  { href: "/dashboards", label: "Dashboards", icon: LayoutDashboard },
  { href: "/widgets", label: "Widgets", icon: Activity },
  { href: "/admin", label: "Admin", icon: Shield },
  { href: "/admin/audit", label: "Audit Log", icon: ShieldCheck },
  { href: "/settings", label: "Settings", icon: Settings },
] as const;

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, signOut, hasRole } = useAuth();
  const tenant = useTenant();
  const [mobileOpen, setMobileOpen] = useState(false);

  const availableWorkspaces = useMemo(
    () => tenant.workspaces.filter((w) => w.orgId === tenant.currentOrgId),
    [tenant.currentOrgId, tenant.workspaces],
  );

  const canSeeAdmin = hasRole("admin", "owner");

  const items = navItems.filter((i) => {
    if (i.href.startsWith("/admin")) return canSeeAdmin;
    return true;
  });

  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      <div className="lg:hidden flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-white">
        <button
          className="text-sm font-medium"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle navigation"
        >
          Menu
        </button>
        <div className="text-sm text-gray-600">{tenant.currentWorkspace?.name ?? "—"}</div>
      </div>

      <div className="app-shell">
        <aside
          className={cn(
            "bg-white border-r border-gray-200 p-4 lg:block",
            mobileOpen ? "block" : "hidden lg:block",
          )}
        >
          <div className="flex items-center gap-2 pb-4 border-b border-gray-200">
            <div className="h-9 w-9 rounded-lg bg-blue-600 text-white flex items-center justify-center">
              <Building2 size={18} />
            </div>
            <div className="min-w-0">
              <div className="text-sm font-semibold truncate">Enterprise Analytics</div>
              <div className="text-xs text-gray-500 truncate">
                {user ? user.email : "Not signed in"}
              </div>
            </div>
          </div>

          <div className="mt-4 space-y-3">
            <div>
              <label className="text-xs text-gray-500">Organization</label>
              <select
                className="mt-1 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm"
                value={tenant.currentOrgId ?? ""}
                onChange={(e) => tenant.setOrg(e.target.value)}
              >
                {tenant.organizations.map((o) => (
                  <option key={o.id} value={o.id}>
                    {o.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs text-gray-500">Workspace</label>
              <select
                className="mt-1 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm"
                value={tenant.currentWorkspaceId ?? ""}
                onChange={(e) => tenant.setWorkspace(e.target.value)}
              >
                {availableWorkspaces.map((w) => (
                  <option key={w.id} value={w.id}>
                    {w.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <nav className="mt-6 space-y-1">
            {items.map((item) => {
              const active = pathname === item.href || pathname.startsWith(item.href + "/");
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2 rounded-lg px-3 py-2 text-sm border transition-colors",
                    active
                      ? "bg-blue-50 text-blue-700 border-blue-100"
                      : "bg-white text-gray-700 border-transparent hover:bg-gray-50 hover:border-gray-100",
                  )}
                  onClick={() => setMobileOpen(false)}
                >
                  <Icon size={16} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="mt-6 pt-4 border-t border-gray-200">
            <Button
              variant="secondary"
              className="w-full justify-center"
              onClick={() => signOut()}
            >
              <LogOut size={16} /> Sign out
            </Button>
          </div>
        </aside>

        <div className="min-w-0">
          <header className="hidden lg:flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-white">
            <div className="min-w-0">
              <div className="text-sm text-gray-500">Workspace</div>
              <div className="text-lg font-semibold truncate">
                {tenant.currentOrg?.name} / {tenant.currentWorkspace?.name}
              </div>
            </div>

            <div className="flex items-center gap-2">
              {canSeeAdmin ? (
                <span className="text-xs rounded-full bg-blue-50 text-blue-700 border border-blue-100 px-2 py-1">
                  Admin enabled
                </span>
              ) : (
                <span className="text-xs rounded-full bg-gray-50 text-gray-700 border border-gray-200 px-2 py-1">
                  Member
                </span>
              )}
            </div>
          </header>

          <main className="p-4 lg:p-6">{children}</main>
        </div>
      </div>
    </div>
  );
}
