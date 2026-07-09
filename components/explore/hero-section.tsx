"use client";

import { Button, SearchField } from "@heroui/react";
import { Search } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function HeroSection() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <section className="relative isolate overflow-hidden">
      {/* Artwork background — top hero only, fades into page */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[420px] md:h-[480px]">
        <div
          className="hero-artwork hero-fade-mask absolute inset-0 bg-cover bg-center bg-no-repeat opacity-90 dark:opacity-100"
          style={{
            backgroundImage: isDark
              ? "url(/artworkdark1.png)"
              : "linear-gradient(180deg, rgba(98,155,248,0.22) 0%, rgba(130,176,249,0.12) 35%, rgba(245,249,255,0.0) 100%), radial-gradient(ellipse 80% 60% at 50% 0%, rgba(98,155,248,0.28), transparent 70%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: isDark
              ? "linear-gradient(to bottom, transparent 40%, #2D2E33 100%)"
              : "linear-gradient(to bottom, transparent 35%, #FFFFFF 100%)",
          }}
        />
      </div>

      <div className="relative mx-auto flex max-w-[920px] flex-col items-center px-4 pb-10 pt-16 text-center md:px-6 md:pt-20 lg:pt-24">
        <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-border/80 bg-white/70 px-3 py-1 text-xs font-medium text-muted backdrop-blur-md dark:bg-white/5">
          <span className="size-1.5 rounded-full bg-accent" />
          Discover Discord communities & bots
        </p>

        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
          Find your next{" "}
          <span className="nexus-gradient-text">favorite</span> community
        </h1>

        <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
          Explore thousands of Discord servers and bots to enhance your experience.
          Join communities, find tools, and level up your server.
        </p>

        <div className="mt-8 flex w-full max-w-xl flex-col gap-3 sm:flex-row sm:items-center">
          <SearchField aria-label="Search communities" className="w-full flex-1">
            <SearchField.Group>
              <SearchField.SearchIcon />
              <SearchField.Input placeholder="Search servers, bots, tags..." />
              <SearchField.ClearButton />
            </SearchField.Group>
          </SearchField>
          <Button className="shrink-0 sm:h-10">
            <Search className="size-4" />
            Search
          </Button>
        </div>
      </div>
    </section>
  );
}
