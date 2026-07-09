"use client";

import { Button, Chip } from "@heroui/react";
import { LayoutGrid, LayoutTemplate } from "lucide-react";

import { BotPreviewCard } from "@/components/cards/bot-card";
import {
  BotPagePreview,
  type BotPagePreviewModel,
} from "@/components/dashboard/bot-page-preview";
import {
  ServerCardPreview,
  type ServerListingPreviewModel,
} from "@/components/dashboard/server-card-preview";
import {
  ServerPagePreview,
  type ServerPagePreviewModel,
} from "@/components/dashboard/server-page-preview";

export type PreviewMode = "listing" | "page";

type ServerPreviewPanelProps = {
  kind: "server";
  mode: PreviewMode;
  onModeChange: (mode: PreviewMode) => void;
  listing: ServerListingPreviewModel;
  page: ServerPagePreviewModel;
};

type BotPreviewPanelProps = {
  kind: "bot";
  mode: PreviewMode;
  onModeChange: (mode: PreviewMode) => void;
  listing: {
    name: string;
    shortDescription: string;
    category: string;
    tags: string[];
    servers: number;
    votes: number;
    verified: boolean;
    bannerHue?: string;
  };
  page: BotPagePreviewModel;
};

export type PreviewPanelProps = ServerPreviewPanelProps | BotPreviewPanelProps;

export function PreviewPanel(props: PreviewPanelProps) {
  return (
    <aside className="nexus-card sticky top-24 flex max-h-[calc(100vh-7rem)] flex-col overflow-hidden rounded-2xl p-4 md:p-5">
      <div className="mb-4 shrink-0 space-y-3">
        <div>
          <h2 className="text-base font-semibold text-foreground">Preview</h2>
          <p className="text-xs text-muted">
            {props.kind === "server"
              ? "Live preview of your marketplace card and public page"
              : "Live preview of your bot listing card and public page"}
          </p>
        </div>

        <div className="flex w-full gap-1 rounded-xl border border-border bg-default/50 p-1">
          <Button
            size="sm"
            className="flex-1"
            variant={props.mode === "listing" ? "primary" : "ghost"}
            onPress={() => props.onModeChange("listing")}
          >
            <LayoutGrid className="size-3.5" />
            Listing Preview
          </Button>
          <Button
            size="sm"
            className="flex-1"
            variant={props.mode === "page" ? "primary" : "ghost"}
            onPress={() => props.onModeChange("page")}
          >
            <LayoutTemplate className="size-3.5" />
            Page Preview
          </Button>
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto pr-0.5">
        {props.kind === "server" ? (
          props.mode === "listing" ? (
            <ServerCardPreview model={props.listing} />
          ) : (
            <ServerPagePreview model={props.page} />
          )
        ) : props.mode === "listing" ? (
          <div className="space-y-3">
            {props.page.statusLabel ? (
              <Chip size="sm" variant="soft" color="warning">
                <Chip.Label>{props.page.statusLabel}</Chip.Label>
              </Chip>
            ) : null}
            <BotPreviewCard
              name={props.listing.name}
              description={props.listing.shortDescription}
              category={props.listing.category}
              tags={props.listing.tags}
              servers={props.listing.servers}
              votes={props.listing.votes}
              verified={props.listing.verified}
              bannerHue={props.listing.bannerHue}
            />
          </div>
        ) : (
          <BotPagePreview model={props.page} />
        )}
      </div>
    </aside>
  );
}
