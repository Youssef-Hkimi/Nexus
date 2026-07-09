"use client";

import { Button, Drawer, SearchField, toast } from "@heroui/react";
import {
  LayoutDashboard,
  Menu,
  MessageCircle,
  Search,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { ThemeToggle } from "@/components/layout/theme-toggle";

const NAV_ITEMS = [
  { href: "/explore", label: "Explore", match: (p: string) => p.startsWith("/explore") },
  { href: "/server", label: "Servers", match: (p: string) => p.startsWith("/server") },
  { href: "/bots", label: "Bots", match: (p: string) => p.startsWith("/bots") },
  {
    href: "/dashboard",
    label: "Dashboard",
    match: (p: string) => p.startsWith("/dashboard"),
  },
];

export function SiteNavbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="navbar-shell sticky top-0 z-50 border-b border-border/80 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-[1440px] items-center gap-3 px-4 md:px-6 lg:px-8">
        <Link href="/explore" className="flex shrink-0 items-center gap-2.5">
          <span className="flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#629BF8] to-[#82B0F9] text-white shadow-sm">
            <Sparkles className="size-4" />
          </span>
          <span className="text-lg font-bold tracking-tight text-foreground">Nexus</span>
        </Link>

        <nav className="ml-4 hidden items-center gap-5 lg:flex">
          {NAV_ITEMS.map((item) => {
            const active = item.match(pathname);
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`nav-link ${active ? "nav-link-active" : ""}`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <div className="hidden w-48 md:block lg:w-56">
            <SearchField aria-label="Search Nexus" className="w-full">
              <SearchField.Group>
                <SearchField.SearchIcon />
                <SearchField.Input placeholder="Search..." />
                <SearchField.ClearButton />
              </SearchField.Group>
            </SearchField>
          </div>

          <ThemeToggle />

          <Button
            className="hidden sm:inline-flex"
            onPress={() =>
              toast("Login with Discord", {
                description: "OAuth flow is mocked in this demo.",
                variant: "accent",
              })
            }
          >
            <MessageCircle className="size-4" />
            Login with Discord
          </Button>

          <Button
            isIconOnly
            aria-label="Open menu"
            className="lg:hidden"
            variant="ghost"
            onPress={() => setMobileOpen(true)}
          >
            <Menu className="size-5" />
          </Button>
        </div>
      </div>

      <Drawer>
        <Drawer.Backdrop isOpen={mobileOpen} onOpenChange={setMobileOpen}>
          <Drawer.Content placement="right">
            <Drawer.Dialog className="w-[min(100vw,20rem)]">
              <Drawer.CloseTrigger />
              <Drawer.Header>
                <Drawer.Heading>Menu</Drawer.Heading>
              </Drawer.Header>
              <Drawer.Body className="flex flex-col gap-1">
                <SearchField aria-label="Search Nexus" className="mb-3 w-full">
                  <SearchField.Group>
                    <SearchField.SearchIcon />
                    <SearchField.Input placeholder="Search servers & bots..." />
                    <SearchField.ClearButton />
                  </SearchField.Group>
                </SearchField>
                {NAV_ITEMS.map((item) => {
                  const active = item.match(pathname);
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors duration-200 ${
                        active
                          ? "bg-accent/15 text-accent"
                          : "text-foreground hover:bg-default"
                      }`}
                    >
                      {item.label === "Dashboard" ? <LayoutDashboard className="size-4" /> : null}
                      {item.label === "Explore" ? <Search className="size-4" /> : null}
                      {item.label}
                    </Link>
                  );
                })}
                <Button
                  className="mt-3 w-full"
                  onPress={() => {
                    setMobileOpen(false);
                    toast("Login with Discord", {
                      description: "OAuth flow is mocked in this demo.",
                      variant: "accent",
                    });
                  }}
                >
                  <MessageCircle className="size-4" />
                  Login with Discord
                </Button>
              </Drawer.Body>
            </Drawer.Dialog>
          </Drawer.Content>
        </Drawer.Backdrop>
      </Drawer>
    </header>
  );
}
