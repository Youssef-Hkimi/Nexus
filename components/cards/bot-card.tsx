"use client";

import { Avatar, Button, Card, Chip, toast } from "@heroui/react";
import { BadgeCheck, Bot, Eye, Server, ThumbsUp, TrendingUp } from "lucide-react";

import { GradientBanner } from "@/components/ui/gradient-banner";
import { formatCount, initials } from "@/lib/format";
import type { BotListing } from "@/lib/types";

export function BotCard({ bot }: { bot: BotListing }) {
  return (
    <Card className="nexus-card hover-lift group overflow-hidden p-0">
      <div className="relative">
        <GradientBanner hue={bot.bannerHue} className="h-28" />
        <div className="absolute -bottom-7 left-4">
          <Avatar className="size-14 rounded-2xl border-2 border-background shadow-md">
            <Avatar.Fallback className="rounded-2xl bg-accent/20 text-sm font-bold text-accent">
              {initials(bot.name)}
            </Avatar.Fallback>
          </Avatar>
        </div>
        <div className="absolute top-3 right-3 flex gap-1.5">
          {typeof bot.rank === "number" ? (
            <Chip size="sm" variant="soft" className="backdrop-blur-sm">
              <TrendingUp className="size-3.5" />
              <Chip.Label>#{bot.rank}</Chip.Label>
            </Chip>
          ) : null}
          {bot.verified ? (
            <Chip color="accent" size="sm" variant="soft" className="backdrop-blur-sm">
              <BadgeCheck className="size-3.5" />
              <Chip.Label>Verified</Chip.Label>
            </Chip>
          ) : null}
        </div>
      </div>

      <Card.Header className="mt-8 gap-1 px-4 pt-0">
        <div className="flex flex-wrap items-center gap-2">
          <Card.Title className="text-base">{bot.name}</Card.Title>
          <Chip size="sm" variant="soft" color="accent">
            <Bot className="size-3.5" />
            <Chip.Label>BOT</Chip.Label>
          </Chip>
        </div>
        <Card.Description className="line-clamp-2 text-sm leading-relaxed">
          {bot.description}
        </Card.Description>
      </Card.Header>

      <Card.Content className="space-y-3 px-4">
        <div className="flex flex-wrap items-center gap-3 text-xs text-muted">
          <span className="inline-flex items-center gap-1">
            <Server className="size-3.5" />
            {formatCount(bot.servers)} servers
          </span>
          <span className="inline-flex items-center gap-1">
            <ThumbsUp className="size-3.5" />
            {formatCount(bot.votes)} votes
          </span>
        </div>

        <div className="flex flex-wrap gap-1.5">
          <Chip size="sm" variant="soft" color="accent">
            <Chip.Label>{bot.category}</Chip.Label>
          </Chip>
          {bot.tags.slice(0, 2).map((tag) => (
            <Chip key={tag} size="sm" variant="soft">
              <Chip.Label>{tag}</Chip.Label>
            </Chip>
          ))}
        </div>
      </Card.Content>

      <Card.Footer className="flex-wrap gap-2 px-4 pb-4">
        <Button
          className="min-w-[7rem] flex-1"
          onPress={() =>
            toast.success(`Invite ready for ${bot.name}`, {
              description: "Bot invite is mocked in this demo.",
            })
          }
        >
          Invite
        </Button>
        <Button
          variant="secondary"
          onPress={() =>
            toast.info(`Viewing ${bot.name}`, {
              description: "Public bot pages are mocked for now.",
            })
          }
        >
          <Eye className="size-4" />
          View
        </Button>
        <Button
          variant="tertiary"
          onPress={() => toast.success(`Voted for ${bot.name}`)}
        >
          <ThumbsUp className="size-4" />
          Vote
        </Button>
      </Card.Footer>
    </Card>
  );
}

export function BotPreviewCard({
  name,
  description,
  category,
  tags,
  servers,
  votes,
  verified,
  bannerHue = "215",
}: {
  name: string;
  description: string;
  category: string;
  tags: string[];
  servers: number;
  votes: number;
  verified?: boolean;
  bannerHue?: string;
}) {
  const preview: BotListing = {
    id: "preview",
    name: name || "Bot name",
    description: description || "Your short description will appear here.",
    servers: servers || 0,
    votes: votes || 0,
    category: category || "Utility",
    tags: tags.length ? tags : ["Feature"],
    verified: Boolean(verified),
    bannerHue,
  };

  return <BotCard bot={preview} />;
}
