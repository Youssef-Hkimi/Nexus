"use client";

import {
  Button,
  Description,
  Input,
  Label,
  ListBox,
  Modal,
  Select,
  Switch,
  TextArea,
  TextField,
  toast,
} from "@heroui/react";
import { Bot, Eye, Save, Send, Server } from "lucide-react";
import { useMemo, useState } from "react";

import { BotPreviewCard } from "@/components/cards/bot-card";
import { ServerPreviewCard } from "@/components/cards/server-card";
import { DashboardNav } from "@/components/dashboard/dashboard-sidebar";
import { UploadDropzone } from "@/components/forms/upload-dropzone";
import { BOT_CATEGORIES, EXPLORE_CATEGORIES, LANGUAGES } from "@/lib/data/categories";

type ServerForm = {
  name: string;
  shortDescription: string;
  fullDescription: string;
  category: string;
  tags: string;
  language: string;
  inviteUrl: string;
  members: string;
  online: string;
  rules: string;
  visibility: string;
  featured: boolean;
};

type BotForm = {
  name: string;
  shortDescription: string;
  fullDescription: string;
  category: string;
  tags: string;
  inviteUrl: string;
  supportUrl: string;
  websiteUrl: string;
  features: string;
  premium: boolean;
};

const defaultServer: ServerForm = {
  name: "Nexus Hub",
  shortDescription: "Official community for creators and server owners.",
  fullDescription:
    "Join thousands of Discord creators building better communities with Nexus tools, events, and support.",
  category: "Social",
  tags: "Community, Support, Events",
  language: "English",
  inviteUrl: "https://discord.gg/nexus",
  members: "128400",
  online: "18420",
  rules: "Be kind. No spam. Share feedback constructively.",
  visibility: "Public",
  featured: false,
};

const defaultBot: BotForm = {
  name: "Helper AI",
  shortDescription: "Context-aware answers and FAQ automation.",
  fullDescription:
    "Helper AI answers member questions, routes tickets, and keeps your onboarding sharp.",
  category: "AI",
  tags: "AI, Support, FAQ",
  inviteUrl: "https://discord.com/oauth2/authorize?client_id=helper",
  supportUrl: "https://discord.gg/nexus",
  websiteUrl: "https://nexus.example/helper",
  features: "Auto FAQ, Ticket assist, Multi-language",
  premium: false,
};

export default function NewListingPage() {
  const [tab, setTab] = useState<"server" | "bot">("server");
  const [server, setServer] = useState(defaultServer);
  const [bot, setBot] = useState(defaultBot);
  const [previewOpen, setPreviewOpen] = useState(false);

  const serverTags = useMemo(
    () =>
      server.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    [server.tags],
  );

  const botTags = useMemo(
    () =>
      bot.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    [bot.tags],
  );

  return (
    <div className="space-y-6">
      <div className="lg:hidden">
        <DashboardNav />
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Create Listing</h1>
          <p className="mt-1 text-muted">
            Publish a server or bot and preview how it will appear on Nexus.
          </p>
        </div>
        <Button variant="secondary" onPress={() => setPreviewOpen(true)}>
          <Eye className="size-4" />
          Preview
        </Button>
      </div>

      {/* HeroUI Tabs.Indicator uses SharedElement and crashes without a transition provider.
          Use HeroUI Buttons as a tab strip instead — same UX, no runtime error. */}
      <div
        role="tablist"
        aria-label="Listing type"
        className="flex w-full max-w-md gap-1 rounded-2xl border border-border bg-default/60 p-1"
      >
        <Button
          className="flex-1"
          variant={tab === "server" ? "primary" : "ghost"}
          onPress={() => setTab("server")}
        >
          <Server className="size-4" />
          Server Listing
        </Button>
        <Button
          className="flex-1"
          variant={tab === "bot" ? "primary" : "ghost"}
          onPress={() => setTab("bot")}
        >
          <Bot className="size-4" />
          Bot Listing
        </Button>
      </div>

      {tab === "server" ? (
        <div className="pt-2">
          <div className="grid grid-cols-1 gap-8 xl:grid-cols-[minmax(0,1fr)_360px]">
            <form
              className="nexus-card space-y-5 rounded-2xl p-5 md:p-6"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <TextField
                  name="server-name"
                  value={server.name}
                  onChange={(v) => setServer((s) => ({ ...s, name: v }))}
                >
                  <Label>Server name</Label>
                  <Input placeholder="My awesome server" />
                  <Description>Shown on cards and search results.</Description>
                </TextField>

                <Select
                  selectedKey={server.category}
                  onSelectionChange={(key) =>
                    setServer((s) => ({ ...s, category: String(key) }))
                  }
                >
                  <Label>Category</Label>
                  <Select.Trigger>
                    <Select.Value />
                    <Select.Indicator />
                  </Select.Trigger>
                  <Select.Popover>
                    <ListBox>
                      {EXPLORE_CATEGORIES.map((c) => (
                        <ListBox.Item key={c} id={c} textValue={c}>
                          {c}
                          <ListBox.ItemIndicator />
                        </ListBox.Item>
                      ))}
                    </ListBox>
                  </Select.Popover>
                </Select>
              </div>

              <TextField
                name="short"
                value={server.shortDescription}
                onChange={(v) => setServer((s) => ({ ...s, shortDescription: v }))}
              >
                <Label>Short description</Label>
                <Input placeholder="One-line pitch" />
              </TextField>

              <TextField
                name="full"
                value={server.fullDescription}
                onChange={(v) => setServer((s) => ({ ...s, fullDescription: v }))}
              >
                <Label>Full description</Label>
                <TextArea rows={4} placeholder="Tell people what makes your community special" />
              </TextField>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <TextField
                  name="tags"
                  value={server.tags}
                  onChange={(v) => setServer((s) => ({ ...s, tags: v }))}
                >
                  <Label>Tags</Label>
                  <Input placeholder="Comma separated tags" />
                  <Description>Example: Chill, Music, Events</Description>
                </TextField>

                <Select
                  selectedKey={server.language}
                  onSelectionChange={(key) =>
                    setServer((s) => ({ ...s, language: String(key) }))
                  }
                >
                  <Label>Language</Label>
                  <Select.Trigger>
                    <Select.Value />
                    <Select.Indicator />
                  </Select.Trigger>
                  <Select.Popover>
                    <ListBox>
                      {LANGUAGES.filter((l) => l !== "All").map((l) => (
                        <ListBox.Item key={l} id={l} textValue={l}>
                          {l}
                          <ListBox.ItemIndicator />
                        </ListBox.Item>
                      ))}
                    </ListBox>
                  </Select.Popover>
                </Select>
              </div>

              <TextField
                name="invite"
                value={server.inviteUrl}
                onChange={(v) => setServer((s) => ({ ...s, inviteUrl: v }))}
              >
                <Label>Discord invite URL</Label>
                <Input placeholder="https://discord.gg/..." />
              </TextField>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <TextField
                  name="members"
                  value={server.members}
                  onChange={(v) => setServer((s) => ({ ...s, members: v }))}
                >
                  <Label>Member count</Label>
                  <Input inputMode="numeric" placeholder="1000" />
                </TextField>
                <TextField
                  name="online"
                  value={server.online}
                  onChange={(v) => setServer((s) => ({ ...s, online: v }))}
                >
                  <Label>Online count</Label>
                  <Input inputMode="numeric" placeholder="120" />
                </TextField>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <UploadDropzone
                  title="Server icon"
                  hint="Drag & drop or click to upload"
                  sizeHint="Recommended 512×512"
                />
                <UploadDropzone
                  title="Banner"
                  hint="Drag & drop or click to upload"
                  sizeHint="Recommended 960×320"
                />
                <UploadDropzone
                  title="Gallery"
                  hint="Add up to 6 images"
                  sizeHint="Recommended 1200×675"
                />
              </div>

              <TextField
                name="rules"
                value={server.rules}
                onChange={(v) => setServer((s) => ({ ...s, rules: v }))}
              >
                <Label>Rules / community notes</Label>
                <TextArea rows={3} placeholder="Optional notes shown on your public page" />
              </TextField>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <Select
                  selectedKey={server.visibility}
                  onSelectionChange={(key) =>
                    setServer((s) => ({ ...s, visibility: String(key) }))
                  }
                >
                  <Label>Visibility</Label>
                  <Select.Trigger>
                    <Select.Value />
                    <Select.Indicator />
                  </Select.Trigger>
                  <Select.Popover>
                    <ListBox>
                      {["Public", "Unlisted", "Private"].map((v) => (
                        <ListBox.Item key={v} id={v} textValue={v}>
                          {v}
                          <ListBox.ItemIndicator />
                        </ListBox.Item>
                      ))}
                    </ListBox>
                  </Select.Popover>
                </Select>

                <div className="flex items-center justify-between rounded-2xl border border-border px-4 py-3">
                  <div>
                    <p className="text-sm font-medium">Featured request</p>
                    <p className="text-xs text-muted">Ask to be considered for homepage</p>
                  </div>
                  <Switch
                    aria-label="Featured request"
                    isSelected={server.featured}
                    onChange={(v) => setServer((s) => ({ ...s, featured: v }))}
                  >
                    <Switch.Content>
                      <Switch.Control>
                        <Switch.Thumb />
                      </Switch.Control>
                    </Switch.Content>
                  </Switch>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                <Button
                  variant="secondary"
                  onPress={() => toast.success("Draft saved")}
                >
                  <Save className="size-4" />
                  Save Draft
                </Button>
                <Button
                  onPress={() => toast.success("Server listing published")}
                >
                  <Send className="size-4" />
                  Publish Server
                </Button>
              </div>
            </form>

            <div className="xl:sticky xl:top-24 xl:self-start">
              <p className="mb-3 text-sm font-semibold text-foreground">Live preview</p>
              <ServerPreviewCard
                name={server.name}
                description={server.shortDescription}
                category={server.category}
                tags={serverTags}
                members={Number(server.members) || 0}
                online={Number(server.online) || 0}
                verified
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="pt-6">
          <div className="grid grid-cols-1 gap-8 xl:grid-cols-[minmax(0,1fr)_360px]">
            <form
              className="nexus-card space-y-5 rounded-2xl p-5 md:p-6"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <TextField
                  name="bot-name"
                  value={bot.name}
                  onChange={(v) => setBot((s) => ({ ...s, name: v }))}
                >
                  <Label>Bot name</Label>
                  <Input placeholder="My utility bot" />
                </TextField>

                <Select
                  selectedKey={bot.category}
                  onSelectionChange={(key) => setBot((s) => ({ ...s, category: String(key) }))}
                >
                  <Label>Category</Label>
                  <Select.Trigger>
                    <Select.Value />
                    <Select.Indicator />
                  </Select.Trigger>
                  <Select.Popover>
                    <ListBox>
                      {BOT_CATEGORIES.filter((c) => c !== "All").map((c) => (
                        <ListBox.Item key={c} id={c} textValue={c}>
                          {c}
                          <ListBox.ItemIndicator />
                        </ListBox.Item>
                      ))}
                    </ListBox>
                  </Select.Popover>
                </Select>
              </div>

              <TextField
                name="bot-short"
                value={bot.shortDescription}
                onChange={(v) => setBot((s) => ({ ...s, shortDescription: v }))}
              >
                <Label>Short description</Label>
                <Input placeholder="One-line pitch" />
              </TextField>

              <TextField
                name="bot-full"
                value={bot.fullDescription}
                onChange={(v) => setBot((s) => ({ ...s, fullDescription: v }))}
              >
                <Label>Full description</Label>
                <TextArea rows={4} placeholder="Explain features and ideal use cases" />
              </TextField>

              <TextField
                name="bot-tags"
                value={bot.tags}
                onChange={(v) => setBot((s) => ({ ...s, tags: v }))}
              >
                <Label>Tags</Label>
                <Input placeholder="Comma separated tags" />
              </TextField>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <TextField
                  name="bot-invite"
                  value={bot.inviteUrl}
                  onChange={(v) => setBot((s) => ({ ...s, inviteUrl: v }))}
                >
                  <Label>Bot invite URL</Label>
                  <Input placeholder="https://discord.com/oauth2/..." />
                </TextField>
                <TextField
                  name="support"
                  value={bot.supportUrl}
                  onChange={(v) => setBot((s) => ({ ...s, supportUrl: v }))}
                >
                  <Label>Support server URL</Label>
                  <Input placeholder="https://discord.gg/..." />
                </TextField>
              </div>

              <TextField
                name="website"
                value={bot.websiteUrl}
                onChange={(v) => setBot((s) => ({ ...s, websiteUrl: v }))}
              >
                <Label>Website URL</Label>
                <Input placeholder="https://" />
              </TextField>

              <TextField
                name="features"
                value={bot.features}
                onChange={(v) => setBot((s) => ({ ...s, features: v }))}
              >
                <Label>Commands / features list</Label>
                <TextArea rows={3} placeholder="Comma separated features or commands" />
              </TextField>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <UploadDropzone
                  title="Bot avatar"
                  hint="Drag & drop or click to upload"
                  sizeHint="Recommended 512×512"
                />
                <UploadDropzone
                  title="Banner"
                  hint="Drag & drop or click to upload"
                  sizeHint="Recommended 960×320"
                />
                <UploadDropzone
                  title="Gallery"
                  hint="Add up to 6 images"
                  sizeHint="Recommended 1200×675"
                />
              </div>

              <div className="flex items-center justify-between rounded-2xl border border-border px-4 py-3">
                <div>
                  <p className="text-sm font-medium">Premium bot</p>
                  <p className="text-xs text-muted">Highlight paid plan features</p>
                </div>
                <Switch
                  aria-label="Premium bot"
                  isSelected={bot.premium}
                  onChange={(v) => setBot((s) => ({ ...s, premium: v }))}
                >
                  <Switch.Content>
                    <Switch.Control>
                      <Switch.Thumb />
                    </Switch.Control>
                  </Switch.Content>
                </Switch>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                <Button variant="secondary" onPress={() => toast.success("Draft saved")}>
                  <Save className="size-4" />
                  Save Draft
                </Button>
                <Button onPress={() => toast.success("Bot listing published")}>
                  <Send className="size-4" />
                  Publish Bot
                </Button>
              </div>
            </form>

            <div className="xl:sticky xl:top-24 xl:self-start">
              <p className="mb-3 text-sm font-semibold text-foreground">Live preview</p>
              <BotPreviewCard
                name={bot.name}
                description={bot.shortDescription}
                category={bot.category}
                tags={botTags}
                servers={890000}
                votes={39200}
                verified
              />
            </div>
          </div>
        </div>
      )}

      <Modal.Backdrop isOpen={previewOpen} onOpenChange={setPreviewOpen}>
        <Modal.Container size="lg">
          <Modal.Dialog>
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Heading>
                {tab === "server" ? "Server card preview" : "Bot card preview"}
              </Modal.Heading>
            </Modal.Header>
            <Modal.Body>
              <div className="mx-auto max-w-md">
                {tab === "server" ? (
                  <ServerPreviewCard
                    name={server.name}
                    description={server.shortDescription}
                    category={server.category}
                    tags={serverTags}
                    members={Number(server.members) || 0}
                    online={Number(server.online) || 0}
                    verified
                  />
                ) : (
                  <BotPreviewCard
                    name={bot.name}
                    description={bot.shortDescription}
                    category={bot.category}
                    tags={botTags}
                    servers={890000}
                    votes={39200}
                    verified
                  />
                )}
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button slot="close" variant="secondary">
                Close
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </div>
  );
}
