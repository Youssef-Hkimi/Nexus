"use client";

import type { Key } from "@heroui/react";
import { Description, Label, ListBox, Select } from "@heroui/react";
import { useMemo } from "react";

import { MAX_LISTING_TAGS } from "@/lib/data/categories";

type TagMultiSelectProps = {
  label?: string;
  value: string[];
  options: readonly string[];
  onChange: (tags: string[]) => void;
  max?: number;
  placeholder?: string;
  className?: string;
};

export function TagMultiSelect({
  label = "Tags",
  value,
  options,
  onChange,
  max = MAX_LISTING_TAGS,
  placeholder = "Select tags",
  className,
}: TagMultiSelectProps) {
  const disabledKeys = useMemo(() => {
    if (value.length < max) return [] as string[];
    return options.filter((tag) => !value.includes(tag));
  }, [value, options, max]);

  return (
    <Select
      className={className}
      selectionMode="multiple"
      placeholder={placeholder}
      value={value}
      disabledKeys={disabledKeys}
      onChange={(keys) => {
        const next = Array.isArray(keys)
          ? (keys as Key[]).map(String)
          : keys != null
            ? [String(keys)]
            : [];
        if (next.length > max) {
          onChange(next.slice(0, max));
          return;
        }
        onChange(next);
      }}
    >
      <Label>{label}</Label>
      <Select.Trigger>
        <Select.Value>
          {({ defaultChildren, isPlaceholder }) => {
            if (isPlaceholder || value.length === 0) {
              return defaultChildren;
            }
            return value.join(", ");
          }}
        </Select.Value>
        <Select.Indicator />
      </Select.Trigger>
      <Select.Popover>
        <ListBox selectionMode="multiple">
          {options.map((tag) => (
            <ListBox.Item key={tag} id={tag} textValue={tag}>
              {tag}
              <ListBox.ItemIndicator />
            </ListBox.Item>
          ))}
        </ListBox>
      </Select.Popover>
      <Description>
        Select up to {max} tags ({value.length}/{max})
      </Description>
    </Select>
  );
}
