"use client";

import { useState } from "react";

import { ServerCard } from "@/components/cards/server-card";
import { ExploreSidebar } from "@/components/explore/explore-sidebar";
import { HeroSection } from "@/components/explore/hero-section";
import { CategoryChips } from "@/components/filters/category-chips";
import { EXPLORE_CATEGORIES } from "@/lib/data/categories";
import { FEATURED_SERVERS } from "@/lib/data/servers";

export default function ExplorePage() {
  // Empty string = show all featured; chip selection filters the grid
  const [category, setCategory] = useState("");

  const servers = !category
    ? FEATURED_SERVERS
    : FEATURED_SERVERS.filter(
        (s) =>
          s.category === category ||
          s.tags.some((t) => t.toLowerCase() === category.toLowerCase()),
      );

  return (
    <div className="theme-surface min-h-screen">
      <HeroSection />

      <div className="server-listing-shell pb-16">
        <div className="mb-8">
          <CategoryChips
            items={EXPLORE_CATEGORIES}
            active={category}
            onChange={setCategory}
          />
        </div>

        <div className="grid grid-cols-1 gap-8 xl:grid-cols-[minmax(0,1fr)_300px]">
          <section className="min-w-0">
            <div className="mb-5">
              <h2 className="text-2xl font-bold tracking-tight text-foreground">
                Featured & Trending Servers
              </h2>
              <p className="mt-1 text-sm text-muted">
                Hand-picked communities worth joining right now
              </p>
            </div>

            <div className="server-listing-grid">
              {servers.map((server) => (
                <ServerCard key={server.id} server={server} />
              ))}
            </div>
          </section>

          <div className="xl:pt-12">
            <ExploreSidebar />
          </div>
        </div>
      </div>
    </div>
  );
}
