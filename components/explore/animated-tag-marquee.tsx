"use client";

import type { LucideIcon } from "lucide-react";
import {
  BookOpen,
  Bot,
  CalendarDays,
  Coins,
  Gamepad2,
  MessagesSquare,
  Monitor,
  Music,
  Palette,
  PenTool,
  Smile,
  Sparkles,
  Theater,
  Users,
} from "lucide-react";

import styles from "./animated-tag-marquee.module.css";

export type ExploreTag = {
  label: string;
  icon: LucideIcon;
};

export const EXPLORE_MARQUEE_TAGS: ExploreTag[] = [
  { label: "Gaming", icon: Gamepad2 },
  { label: "Anime", icon: Sparkles },
  { label: "Social", icon: Users },
  { label: "Study", icon: BookOpen },
  { label: "Music", icon: Music },
  { label: "Creator", icon: PenTool },
  { label: "Roleplay", icon: Theater },
  { label: "Tech", icon: Monitor },
  { label: "Community", icon: MessagesSquare },
  { label: "Bots", icon: Bot },
  { label: "Events", icon: CalendarDays },
  { label: "Art", icon: Palette },
  { label: "Crypto", icon: Coins },
  { label: "Memes", icon: Smile },
];

type AnimatedTagMarqueeProps = {
  tags?: ExploreTag[];
  activeTag: string;
  onTagClick: (label: string) => void;
};

function TagPill({
  tag,
  active,
  onClick,
}: {
  tag: ExploreTag;
  active: boolean;
  onClick: () => void;
}) {
  const Icon = tag.icon;

  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`${styles.pill} ${active ? styles.pillActive : styles.pillIdle}`}
    >
      <Icon className={styles.icon} aria-hidden />
      <span>{tag.label}</span>
    </button>
  );
}

export function AnimatedTagMarquee({
  tags = EXPLORE_MARQUEE_TAGS,
  activeTag,
  onTagClick,
}: AnimatedTagMarqueeProps) {
  const handleClick = (label: string) => {
    onTagClick(activeTag === label ? "" : label);
  };

  return (
    <div className={styles.wrapper} aria-label="Explore categories">
      <div className={styles.track}>
        <div className={styles.group}>
          {tags.map((tag) => (
            <TagPill
              key={`a-${tag.label}`}
              tag={tag}
              active={activeTag === tag.label}
              onClick={() => handleClick(tag.label)}
            />
          ))}
        </div>
        <div className={styles.group} aria-hidden>
          {tags.map((tag) => (
            <TagPill
              key={`b-${tag.label}`}
              tag={tag}
              active={activeTag === tag.label}
              onClick={() => handleClick(tag.label)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
