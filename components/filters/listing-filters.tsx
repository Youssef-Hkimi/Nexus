"use client";

import { Checkbox, Separator, Switch } from "@heroui/react";

const SECTION = "space-y-3";
const TITLE = "text-sm font-semibold text-foreground";

export type FilterState = {
  categories: string[];
  language: string;
  size: string;
  activity: string;
  tags: string[];
  verifiedOnly: boolean;
};

export function ListingFilters({
  categories,
  languages,
  sizes,
  activities,
  tags,
  value,
  onChange,
}: {
  categories: readonly string[];
  languages: readonly string[];
  sizes: readonly string[];
  activities: readonly string[];
  tags: readonly string[];
  value: FilterState;
  onChange: (next: FilterState) => void;
}) {
  return (
    <aside className="nexus-card sticky top-24 space-y-5 rounded-2xl p-5">
      <div>
        <h2 className="text-base font-semibold text-foreground">Filters</h2>
        <p className="mt-1 text-xs text-muted">Refine discovery results</p>
      </div>

      <Separator />

      <div className={SECTION}>
        <p className={TITLE}>Categories</p>
        <div className="flex flex-col gap-2">
          {categories
            .filter((c) => c !== "All")
            .map((cat) => {
              const selected = value.categories.includes(cat);
              return (
                <Checkbox
                  key={cat}
                  isSelected={selected}
                  onChange={(isSelected) => {
                    const next = isSelected
                      ? [...value.categories, cat]
                      : value.categories.filter((c) => c !== cat);
                    onChange({ ...value, categories: next });
                  }}
                >
                  <Checkbox.Content>
                    <Checkbox.Control>
                      <Checkbox.Indicator />
                    </Checkbox.Control>
                    <span className="text-sm font-normal text-foreground">{cat}</span>
                  </Checkbox.Content>
                </Checkbox>
              );
            })}
        </div>
      </div>

      <Separator />

      <div className={SECTION}>
        <p className={TITLE}>Language</p>
        <div className="flex flex-wrap gap-2">
          {languages.map((lang) => (
            <button
              key={lang}
              type="button"
              onClick={() => onChange({ ...value, language: lang })}
              className={`rounded-full px-3 py-1 text-xs font-medium transition-colors duration-200 ${
                value.language === lang
                  ? "bg-accent text-white"
                  : "bg-default text-muted hover:text-foreground"
              }`}
            >
              {lang}
            </button>
          ))}
        </div>
      </div>

      <Separator />

      <div className={SECTION}>
        <p className={TITLE}>Server size</p>
        <div className="flex flex-wrap gap-2">
          {sizes.map((size) => (
            <button
              key={size}
              type="button"
              onClick={() => onChange({ ...value, size })}
              className={`rounded-full px-3 py-1 text-xs font-medium transition-colors duration-200 ${
                value.size === size
                  ? "bg-accent text-white"
                  : "bg-default text-muted hover:text-foreground"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <Separator />

      <div className={SECTION}>
        <p className={TITLE}>Activity level</p>
        <div className="flex flex-wrap gap-2">
          {activities.map((activity) => (
            <button
              key={activity}
              type="button"
              onClick={() => onChange({ ...value, activity })}
              className={`rounded-full px-3 py-1 text-xs font-medium transition-colors duration-200 ${
                value.activity === activity
                  ? "bg-accent text-white"
                  : "bg-default text-muted hover:text-foreground"
              }`}
            >
              {activity}
            </button>
          ))}
        </div>
      </div>

      <Separator />

      <div className={SECTION}>
        <p className={TITLE}>Tags</p>
        <div className="flex flex-col gap-2">
          {tags
            .filter((t) => t !== "All")
            .slice(0, 8)
            .map((tag) => {
              const selected = value.tags.includes(tag);
              return (
                <Checkbox
                  key={tag}
                  isSelected={selected}
                  onChange={(isSelected) => {
                    const next = isSelected
                      ? [...value.tags, tag]
                      : value.tags.filter((t) => t !== tag);
                    onChange({ ...value, tags: next });
                  }}
                >
                  <Checkbox.Content>
                    <Checkbox.Control>
                      <Checkbox.Indicator />
                    </Checkbox.Control>
                    <span className="text-sm font-normal text-foreground">{tag}</span>
                  </Checkbox.Content>
                </Checkbox>
              );
            })}
        </div>
      </div>

      <Separator />

      <div className="flex items-center justify-between gap-3">
        <span className="text-sm font-medium text-foreground">Verified only</span>
        <Switch
          aria-label="Verified only"
          isSelected={value.verifiedOnly}
          onChange={(selected) => onChange({ ...value, verifiedOnly: selected })}
        >
          <Switch.Content>
            <Switch.Control>
              <Switch.Thumb />
            </Switch.Control>
          </Switch.Content>
        </Switch>
      </div>
    </aside>
  );
}
