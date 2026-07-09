"use client";

import { Toast } from "@heroui/react";
import { ThemeProvider } from "next-themes";

import { LoginDiscordModal } from "@/components/auth/login-discord-modal";
import { AuthProvider } from "@/lib/auth/auth-context";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange={false}
    >
      <AuthProvider>
        {children}
        <LoginDiscordModal />
        <Toast.Provider placement="bottom end" />
      </AuthProvider>
    </ThemeProvider>
  );
}
