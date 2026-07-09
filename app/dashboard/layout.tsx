"use client";

import { DashboardNav } from "@/components/dashboard/dashboard-sidebar";
import { RequireAuth } from "@/components/auth/require-auth";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <RequireAuth>
      <div className="mx-auto grid min-h-[calc(100vh-4rem)] w-full max-w-[1440px] grid-cols-1 gap-6 px-4 py-8 md:px-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:px-8">
        <div className="hidden lg:block">
          <DashboardNav />
        </div>
        <div className="min-w-0">{children}</div>
      </div>
    </RequireAuth>
  );
}
