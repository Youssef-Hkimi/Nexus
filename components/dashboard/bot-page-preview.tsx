"use client";

import { Avatar, Button, Chip } from "@heroui/react";
import {
  BadgeCheck,
  Bot,
  Code2,
  ExternalLink,
  Hash,
  MessageCircle,
} from "lucide-react";

import { GradientBanner } from "@/components/ui/gradient-banner";
import { formatCount, initials } from "@/lib/format";
import type { BotCommand } from "@/lib/types";

export type BotPagePreviewModel = {
  name: string;
  shortDescription: string;
  fullDescription: string;
  category: string;
  tags: string[];
  clientId: string;
  prefix: string;
  inviteUrl: string;
  supportUrl: string;
  websiteUrl: string;
  githubUrl: string;
  commands: BotCommand[];
  verified: boolean;
  servers: number;
  votes: number;
  bannerHue?: string;
  statusLabel?: string;
};

export function BotPagePreview({ model }: { model: BotPagePreviewModel }) {
  const name = model.name || "Bot name";
  const commands = model.commands.filter((c) => c.name.trim() || c.description.trim());

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-[var(--page-bg)]">
      <div className="relative">
        <GradientBanner hue={model.bannerHue ?? "215"} className="h-28 w-full" />
        <div className="absolute -bottom-8 left-4">
          <Avatar className="size-16 rounded-2xl border-2 border-background shadow-md">
            <Avatar.Fallback className="rounded-2xl bg-accent/20 text-sm font-bold text-accent">
              {initials(name)}
            </Avatar.Fallback>
          </Avatar>
        </div>
      </div>

      <div className="space-y-4 px-4 pt-11 pb-4">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-lg font-bold text-foreground">{name}</h3>
            <Chip size="sm" variant="soft" color="accent">
              <Bot className="size-3.5" />
              <Chip.Label>BOT</Chip.Label>
            </Chip>
            {model.verified ? (
              <Chip size="sm" variant="soft" color="accent">
                <BadgeCheck className="size-3.5" />
                <Chip.Label>Verified</Chip.Label>
              </Chip>
            ) : null}
            {model.statusLabel ? (
              <Chip size="sm" variant="soft" color="warning">
                <Chip.Label>{model.statusLabel}</Chip.Label>
              </Chip>
            ) : null}
          </div>
          <p className="mt-1 text-sm text-muted">
            {model.shortDescription || "Short description appears here."}
          </p>
        </div>

        <div className="flex flex-wrap gap-3 text-xs text-muted">
          <span className="inline-flex items-center gap-1">
            <Hash className="size-3.5" />
            Client ID: {model.clientId || "—"}
          </span>
          <span>Prefix: {model.prefix || "/"}</span>
          <span>{formatCount(model.servers)} servers</span>
          <span>{formatCount(model.votes)} votes</span>
        </div>

        <div className="flex flex-wrap gap-1.5">
          <Chip size="sm" variant="soft" color="accent">
            <Chip.Label>{model.category || "Utility"}</Chip.Label>
          </Chip>
          {(model.tags.length ? model.tags : ["Tag"]).map((tag) => (
            <Chip key={tag} size="sm" variant="soft">
              <Chip.Label>{tag}</Chip.Label>
            </Chip>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          <Button size="sm">Invite bot</Button>
          <Button size="sm" variant="secondary">
            <MessageCircle className="size-3.5" />
            Support server
          </Button>
        </div>

        <section className="space-y-2">
          <h4 className="text-sm font-semibold text-foreground">About</h4>
          <div className="whitespace-pre-wrap rounded-xl border border-border bg-default/40 p-3 text-sm leading-relaxed text-muted">
            {model.fullDescription || "Long description with markdown will preview here."}
          </div>
          <p className="text-[11px] text-muted">Markdown-style preview (plain text for demo)</p>
        </section>

        <section className="space-y-2">
          <h4 className="text-sm font-semibold text-foreground">Commands</h4>
          {commands.length ? (
            <ul className="space-y-2">
              {commands.map((cmd) => (
                <li
                  key={cmd.id}
                  className="rounded-xl border border-border bg-default/30 px-3 py-2"
                >
                  <p className="font-mono text-sm font-semibold text-accent">
                    {cmd.name || "/command"}
                  </p>
                  <p className="mt-0.5 text-xs text-muted">
                    {cmd.description || "Command description"}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted">Add at least two commands to preview them here.</p>
          )}
        </section>

        {(model.githubUrl || model.websiteUrl) && (
          <section className="flex flex-wrap gap-2">
            {model.githubUrl ? (
              <Chip size="sm" variant="soft">
                <Code2 className="size-3.5" />
                <Chip.Label>GitHub</Chip.Label>
              </Chip>
            ) : null}
            {model.websiteUrl ? (
              <Chip size="sm" variant="soft">
                <ExternalLink className="size-3.5" />
                <Chip.Label>Website</Chip.Label>
              </Chip>
            ) : null}
          </section>
        )}

        <section className="space-y-2">
          <h4 className="text-sm font-semibold text-foreground">Gallery</h4>
          <div className="grid grid-cols-3 gap-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="aspect-video rounded-lg border border-dashed border-border bg-default/40"
              />
            ))}
          </div>
          <p className="text-[11px] text-muted">Gallery previews appear when images are uploaded</p>
        </section>
      </div>
    </div>
  );
}
