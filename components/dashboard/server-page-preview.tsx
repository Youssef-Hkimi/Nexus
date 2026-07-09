"use client";

import { Avatar, Button, Card, Chip, Separator } from "@heroui/react";
import {
  BadgeCheck,
  Calendar,
  Copy,
  Globe2,
  Link2,
  ThumbsUp,
  Users,
} from "lucide-react";

import { formatCount, initials } from "@/lib/format";
import type { ServerListingPreviewModel } from "@/components/dashboard/server-card-preview";

export type ServerPagePreviewModel = ServerListingPreviewModel & {
  fullDescription: string;
  language: string;
  region: string;
  likes: number;
  monthlyGrowth: number;
  joinClicks: number;
  createdAt: string;
};

export function ServerPagePreview({ model }: { model: ServerPagePreviewModel }) {
  const hue = model.bannerHue ?? "220";

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-background shadow-sm">
      {/* Mini hero banner */}
      <div className="relative h-36 w-full overflow-hidden md:h-40">
        {model.bannerPreview ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={model.bannerPreview}
            alt=""
            className="h-full w-full object-cover"
          />
        ) : (
          <div
            className="h-full w-full"
            style={{
              background: `linear-gradient(135deg, hsl(${hue} 55% 28%) 0%, hsl(${hue} 45% 18%) 40%, hsl(${Number(hue) + 40} 50% 30%) 100%)`,
            }}
          />
        )}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-12"
          style={{
            background:
              "linear-gradient(to bottom, transparent 0%, var(--page-bg, var(--background)) 100%)",
          }}
        />
      </div>

      <div className="space-y-4 px-3 pb-4 pt-0">
        <div className="-mt-8 flex items-end gap-3">
          <Avatar className="server-listing-icon size-16 shrink-0 border-4 border-background shadow-md">
            {model.iconPreview ? <Avatar.Image src={model.iconPreview} alt="" /> : null}
            <Avatar.Fallback className="server-listing-icon bg-accent/20 text-sm font-bold text-accent">
              {initials(model.name || "SV")}
            </Avatar.Fallback>
          </Avatar>
          <div className="min-w-0 flex-1 pb-0.5">
            <div className="flex flex-wrap items-center gap-1.5">
              <p className="truncate text-base font-bold text-foreground">
                {model.name || "Server name"}
              </p>
              {model.verified ? <BadgeCheck className="size-4 text-accent" /> : null}
              <Chip size="sm" variant="soft" color="accent">
                <Chip.Label>{model.category || "Category"}</Chip.Label>
              </Chip>
            </div>
          </div>
        </div>

        <p className="line-clamp-2 text-sm text-muted">
          {model.shortDescription || "Your short description will appear here."}
        </p>

        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted">
          <span className="inline-flex items-center gap-1">
            <Users className="size-3.5 text-accent" />
            {formatCount(model.members)} members
          </span>
          <span className="inline-flex items-center gap-1">
            <span className="size-1.5 rounded-full bg-emerald-400" />
            {formatCount(model.online)} online
          </span>
          <span className="inline-flex items-center gap-1">
            <Globe2 className="size-3.5" />
            {model.language || "English"}
          </span>
        </div>

        <div className="flex flex-wrap gap-1.5">
          <Button size="sm" variant="secondary">
            <ThumbsUp className="size-3.5" />
            Like
            <span className="text-[11px] opacity-90">{formatCount(model.likes)}</span>
          </Button>
          <Button size="sm" variant="secondary">
            <Copy className="size-3.5" />
            Copy Invite
          </Button>
          <Button size="sm">
            <Link2 className="size-3.5" />
            Join Server
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-3">
          <Card className="nexus-card gap-2 p-3">
            <p className="text-xs font-semibold text-foreground">About this server</p>
            <p className="line-clamp-4 text-xs leading-relaxed text-muted">
              {model.fullDescription ||
                "Your full description will appear on the public server page."}
            </p>
          </Card>

          <Card className="nexus-card gap-3 p-3">
            <p className="text-xs font-semibold text-foreground">Server Stats</p>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: "Total Members", value: formatCount(model.members) },
                { label: "Online Now", value: formatCount(model.online) },
                { label: "Monthly Growth", value: `+${model.monthlyGrowth}%` },
                { label: "Join Clicks", value: formatCount(model.joinClicks) },
                { label: "Likes", value: formatCount(model.likes) },
              ].map((stat) => (
                <div key={stat.label} className="rounded-lg bg-default/50 p-2">
                  <p className="text-[10px] text-muted">{stat.label}</p>
                  <p className="text-sm font-bold text-foreground">{stat.value}</p>
                </div>
              ))}
            </div>
            <Separator />
            <div className="space-y-2">
              <p className="text-[10px] font-semibold tracking-wide text-muted uppercase">
                Server Details
              </p>
              <div className="flex items-center gap-2">
                <Calendar className="size-3.5 shrink-0 text-muted" />
                <div>
                  <p className="text-[10px] text-muted">Created</p>
                  <p className="text-xs font-medium text-foreground">
                    {model.createdAt || "—"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Globe2 className="size-3.5 shrink-0 text-muted" />
                <div>
                  <p className="text-[10px] text-muted">Region</p>
                  <p className="text-xs font-medium text-foreground">
                    {model.region || "Global"}
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
