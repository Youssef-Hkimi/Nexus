import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { SiteNavbar } from "@/components/layout/site-navbar";
import { Providers } from "@/components/providers";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nexus — Discord Server & Bot Discovery",
  description:
    "Explore thousands of Discord servers and bots. Join communities, find tools, and grow your server on Nexus.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable} h-full`}>
      <body className="min-h-full bg-background text-foreground antialiased">
        <Providers>
          <SiteNavbar />
          <main className="flex-1">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
