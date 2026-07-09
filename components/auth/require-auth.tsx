"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/lib/auth/auth-context";

export function RequireAuth({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isReady, setLoginModalOpen } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isReady) return;
    if (!isAuthenticated) {
      setLoginModalOpen(true);
    }
  }, [isReady, isAuthenticated, setLoginModalOpen]);

  if (!isReady) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center text-sm text-muted">
        Loading workspace…
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="nexus-card mx-auto max-w-md space-y-3 rounded-2xl p-6 text-center">
        <h2 className="text-lg font-semibold text-foreground">Login required</h2>
        <p className="text-sm text-muted">
          Connect Discord to access your dashboard and manage listings on Nexus.
        </p>
        <button
          type="button"
          className="text-sm font-semibold text-accent underline-offset-2 hover:underline"
          onClick={() => setLoginModalOpen(true)}
        >
          Open login
        </button>
        <button
          type="button"
          className="block w-full text-sm text-muted hover:text-foreground"
          onClick={() => router.push("/explore")}
        >
          Back to explore
        </button>
      </div>
    );
  }

  return <>{children}</>;
}
