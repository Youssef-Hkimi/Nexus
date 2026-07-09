"use client";

import {
  BarChart3,
  Bot,
  LayoutDashboard,
  PlusCircle,
  Server,
  Settings,
  Star,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const ITEMS = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard, exact: true },
  { href: "/dashboard#servers", label: "My Servers", icon: Server },
  { href: "/dashboard#bots", label: "My Bots", icon: Bot },
  { href: "/dashboard/new", label: "Create Listing", icon: PlusCircle, exact: true },
  { href: "/dashboard#analytics", label: "Analytics", icon: BarChart3 },
  { href: "/dashboard#reviews", label: "Reviews", icon: Star },
  { href: "/dashboard#settings", label: "Settings", icon: Settings },
] as const;

export function DashboardNav() {
  const pathname = usePathname();

  return (
    <aside className="nexus-card sticky top-24 h-fit space-y-1 rounded-2xl p-3">
      <div className="mb-3 px-2 py-2">
        <p className="text-xs font-semibold tracking-wide text-muted uppercase">Workspace</p>
        <p className="mt-1 text-sm font-semibold text-foreground">Alex&apos;s Studio</p>
      </div>
      {ITEMS.map((item) => {
        const Icon = item.icon;
        const active =
          item.href === "/dashboard/new"
            ? pathname.startsWith("/dashboard/new")
            : "exact" in item && item.exact
              ? pathname === "/dashboard"
              : false;

        return (
          <Link
            key={item.label}
            href={item.href}
            className={`flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors duration-200 ${
              active
                ? item.href === "/dashboard/new"
                  ? "bg-accent text-white shadow-sm"
                  : "bg-accent/15 text-accent"
                : "text-foreground hover:bg-default"
            }`}
          >
            <Icon className="size-4 shrink-0" />
            {item.label}
          </Link>
        );
      })}
    </aside>
  );
}
