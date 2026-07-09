"use client";

import { Chip } from "@heroui/react";

export function CategoryChips({
  items,
  active,
  onChange,
  id,
}: {
  items: readonly string[];
  active: string;
  onChange: (value: string) => void;
  id?: string;
}) {
  return (
    <div id={id} className="flex flex-wrap gap-2">
      {items.map((item) => {
        const isActive = active === item;
        return (
          <button
            key={item}
            type="button"
            onClick={() => onChange(item)}
            className="rounded-full outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <Chip
              size="md"
              color={isActive ? "accent" : "default"}
              variant={isActive ? "primary" : "soft"}
              className={
                isActive
                  ? "cursor-pointer shadow-sm"
                  : "cursor-pointer border border-border/80 bg-white/70 backdrop-blur-sm dark:bg-white/5"
              }
            >
              <Chip.Label>{item}</Chip.Label>
            </Chip>
          </button>
        );
      })}
    </div>
  );
}
