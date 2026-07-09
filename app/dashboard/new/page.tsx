"use client";

import {
  Alert,
  Button,
  Description,
  FieldError,
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
import { Bot, Eye, Plus, Save, Send, Server, Shield, Trash2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { DashboardNav } from "@/components/dashboard/dashboard-sidebar";
import { PreviewPanel, type PreviewMode } from "@/components/dashboard/preview-panel";
import { ServerCardPreview } from "@/components/dashboard/server-card-preview";
import { ServerPagePreview } from "@/components/dashboard/server-page-preview";
import { TagMultiSelect } from "@/components/forms/tag-multi-select";
import { UploadBox } from "@/components/forms/upload-box";
import { UploadDropzone } from "@/components/forms/upload-dropzone";
import { ListingTypeModal } from "@/components/listing/listing-type-modal";
import { BotReviewModal } from "@/components/listing/bot-review-modal";
import {
  ServerSetupModal,
  type ServerSetupMode,
} from "@/components/listing/server-setup-modal";
import {
  BOT_CATEGORIES,
  BOT_LISTING_TAGS,
  EXPLORE_CATEGORIES,
  LANGUAGES,
  SERVER_LISTING_TAGS,
} from "@/lib/data/categories";
import { writeStatusOverride } from "@/lib/listing-status";
import type { BotCommand, DiscordServer, ListingType } from "@/lib/types";

const REGIONS = ["Global", "North America", "Europe", "Asia", "South America", "Oceania"] as const;
const ACTIVITY_LEVELS = ["Very Active", "Active", "Calm"] as const;
const VISIBILITY = ["Public", "Unlisted", "Private"] as const;

type ServerForm = {
  name: string;
  shortDescription: string;
  fullDescription: string;
  category: string;
  tags: string[];
  language: string;
  region: string;
  inviteUrl: string;
  members: string;
  online: string;
  likes: string;
  monthlyGrowth: string;
  joinClicks: string;
  createdAt: string;
  activity: string;
  visibility: string;
  featured: boolean;
  verified: boolean;
  iconPreview: string | null;
  bannerPreview: string | null;
  bannerHue: string;
};

type BotForm = {
  name: string;
  clientId: string;
  prefix: string;
  shortDescription: string;
  fullDescription: string;
  category: string;
  tags: string[];
  inviteUrl: string;
  supportUrl: string;
  websiteUrl: string;
  githubUrl: string;
  commands: BotCommand[];
  premium: boolean;
  verified: boolean;
  servers: string;
  votes: string;
  statusLabel: string;
  bannerHue: string;
};

const emptyServer = (): ServerForm => ({
  name: "",
  shortDescription: "",
  fullDescription: "",
  category: "Social",
  tags: [],
  language: "English",
  region: "Global",
  inviteUrl: "",
  members: "",
  online: "",
  likes: "0",
  monthlyGrowth: "0",
  joinClicks: "0",
  createdAt: "2024",
  activity: "Active",
  visibility: "Public",
  featured: false,
  verified: false,
  iconPreview: null,
  bannerPreview: null,
  bannerHue: "220",
});

const sampleServer = (): ServerForm => ({
  name: "Nexus Hub",
  shortDescription: "Official community for creators and server owners.",
  fullDescription:
    "Join thousands of Discord creators building better communities with Nexus tools, events, and support.",
  category: "Social",
  tags: ["Community", "Support", "Events"],
  language: "English",
  region: "Global",
  inviteUrl: "https://discord.gg/nexus",
  members: "128400",
  online: "18420",
  likes: "8900",
  monthlyGrowth: "14",
  joinClicks: "15400",
  createdAt: "March 2021",
  activity: "Very Active",
  visibility: "Public",
  featured: false,
  verified: true,
  iconPreview: null,
  bannerPreview: null,
  bannerHue: "220",
});

const emptyBot = (): BotForm => ({
  name: "",
  clientId: "",
  prefix: "/",
  shortDescription: "",
  fullDescription: "",
  category: "Utility",
  tags: [],
  inviteUrl: "",
  supportUrl: "",
  websiteUrl: "",
  githubUrl: "",
  commands: [
    { id: "c1", name: "", description: "" },
    { id: "c2", name: "", description: "" },
  ],
  premium: false,
  verified: false,
  servers: "0",
  votes: "0",
  statusLabel: "",
  bannerHue: "215",
});

const sampleBot = (): BotForm => ({
  name: "Helper AI",
  clientId: "123456789012345678",
  prefix: "/",
  shortDescription: "Context-aware answers and FAQ automation.",
  fullDescription:
    "## Features\n- Auto FAQ replies\n- Ticket assist\n- Multi-language support\n\nUse `/setup` after inviting the bot.",
  category: "AI",
  tags: ["AI", "Support", "FAQ"],
  inviteUrl: "https://discord.com/oauth2/authorize?client_id=helper",
  supportUrl: "https://discord.gg/nexus",
  websiteUrl: "https://nexus.example/helper",
  githubUrl: "https://github.com/nexus/helper-ai",
  commands: [
    { id: "c1", name: "/ban", description: "Ban a user from the server" },
    { id: "c2", name: "/setup", description: "Configure the bot for your server" },
  ],
  premium: false,
  verified: true,
  servers: "890000",
  votes: "39200",
  statusLabel: "",
  bannerHue: "185",
});

function num(value: string, fallback = 0) {
  const n = Number(String(value).replace(/,/g, ""));
  return Number.isFinite(n) ? n : fallback;
}

function slugify(name: string) {
  return (
    name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "") || `listing-${Date.now()}`
  );
}

function fromDiscordServer(ds: DiscordServer): ServerForm {
  return {
    name: ds.name,
    shortDescription: ds.shortDescription,
    fullDescription: ds.fullDescription,
    category: ds.category,
    tags: ds.tags.slice(0, 3),
    language: ds.language,
    region: ds.region,
    inviteUrl: ds.inviteUrl,
    members: String(ds.members),
    online: String(ds.online),
    likes: "0",
    monthlyGrowth: "10",
    joinClicks: "0",
    createdAt: ds.createdAt,
    activity: "Very Active",
    visibility: "Public",
    featured: false,
    verified: ds.verified,
    iconPreview: null,
    bannerPreview: null,
    bannerHue: ds.bannerHue,
  };
}

export default function NewListingPage() {
  const [tab, setTab] = useState<"server" | "bot">("server");
  const [server, setServer] = useState(sampleServer);
  const [bot, setBot] = useState(sampleBot);
  const [previewMode, setPreviewMode] = useState<PreviewMode>("listing");
  const [modalOpen, setModalOpen] = useState(false);

  const [typeModalOpen, setTypeModalOpen] = useState(true);
  const [pendingType, setPendingType] = useState<ListingType | null>(null);
  const [setupModalOpen, setSetupModalOpen] = useState(false);
  const [setupMode, setSetupMode] = useState<ServerSetupMode | null>(null);
  const [selectedDiscordId, setSelectedDiscordId] = useState<string | null>(null);
  const [flowReady, setFlowReady] = useState(false);

  const [reviewOpen, setReviewOpen] = useState(false);
  const [commandError, setCommandError] = useState<string | null>(null);

  useEffect(() => {
    // Fresh visit always starts with type selection for beta flow
    setTypeModalOpen(true);
    setFlowReady(false);
  }, []);

  const listingPreview = useMemo(
    () => ({
      name: server.name,
      shortDescription: server.shortDescription,
      category: server.category,
      tags: server.tags,
      members: num(server.members),
      online: num(server.online),
      verified: server.verified,
      bannerPreview: server.bannerPreview,
      iconPreview: server.iconPreview,
      bannerHue: server.bannerHue,
    }),
    [server],
  );

  const pagePreview = useMemo(
    () => ({
      ...listingPreview,
      fullDescription: server.fullDescription,
      language: server.language,
      region: server.region,
      likes: num(server.likes),
      monthlyGrowth: num(server.monthlyGrowth, 10),
      joinClicks: num(server.joinClicks),
      createdAt: server.createdAt,
    }),
    [listingPreview, server],
  );

  const botListingPreview = useMemo(
    () => ({
      name: bot.name,
      shortDescription: bot.shortDescription,
      category: bot.category,
      tags: bot.tags,
      servers: num(bot.servers),
      votes: num(bot.votes),
      verified: bot.verified,
      bannerHue: bot.bannerHue,
    }),
    [bot],
  );

  const botPagePreview = useMemo(
    () => ({
      name: bot.name,
      shortDescription: bot.shortDescription,
      fullDescription: bot.fullDescription,
      category: bot.category,
      tags: bot.tags,
      clientId: bot.clientId,
      prefix: bot.prefix,
      inviteUrl: bot.inviteUrl,
      supportUrl: bot.supportUrl,
      websiteUrl: bot.websiteUrl,
      githubUrl: bot.githubUrl,
      commands: bot.commands,
      verified: bot.verified,
      servers: num(bot.servers),
      votes: num(bot.votes),
      bannerHue: bot.bannerHue,
      statusLabel: bot.statusLabel || undefined,
    }),
    [bot],
  );

  function handleTypeContinue() {
    if (!pendingType) return;
    setTab(pendingType);
    setTypeModalOpen(false);
    if (pendingType === "server") {
      setSetupMode(null);
      setSelectedDiscordId(null);
      setSetupModalOpen(true);
    } else {
      setBot(sampleBot());
      setFlowReady(true);
    }
  }

  function handleSetupContinue() {
    if (setupMode === "manual") {
      setServer(emptyServer());
      setSetupModalOpen(false);
      setFlowReady(true);
      toast.success("Manual server setup ready");
      return;
    }
    if (setupMode === "import" && selectedDiscordId) {
      // selection already applied via onSelectServer
      setSetupModalOpen(false);
      setFlowReady(true);
      toast.success("Server details imported from Discord");
    }
  }

  function validCommands(commands: BotCommand[]) {
    return commands.filter((c) => c.name.trim() && c.description.trim());
  }

  function tryPublishBot() {
    const good = validCommands(bot.commands);
    if (good.length < 2) {
      setCommandError("Add at least 2 commands with a name and description before publishing.");
      toast.danger("Missing commands", {
        description: "Bot listings require at least 2 commands.",
      });
      return;
    }
    if (!bot.name.trim() || !bot.clientId.trim() || !bot.inviteUrl.trim()) {
      toast.danger("Missing required fields", {
        description: "Bot name, client ID, and invite URL are required.",
      });
      return;
    }
    setCommandError(null);
    setReviewOpen(true);
  }

  function finalizeBotPublish() {
    const id = slugify(bot.name || "bot");
    setBot((b) => ({ ...b, statusLabel: "Live · Pending Review" }));
    writeStatusOverride({
      id,
      name: bot.name || "Untitled Bot",
      type: "bot",
      status: "Live · Pending Review",
      updated: "Just now",
      category: bot.category,
      description: bot.shortDescription,
      bannerHue: bot.bannerHue,
    });
    toast.success("Bot listing submitted for review");
  }

  function publishServer() {
    if (!server.name.trim() || !server.inviteUrl.trim()) {
      toast.danger("Missing required fields", {
        description: "Server name and invite URL are required.",
      });
      return;
    }
    const id = slugify(server.name);
    writeStatusOverride({
      id,
      name: server.name,
      type: "server",
      status: "Live",
      updated: "Just now",
      category: server.category,
      description: server.shortDescription,
      bannerHue: server.bannerHue,
    });
    toast.success("Server listing published");
  }

  function updateCommand(id: string, patch: Partial<BotCommand>) {
    setBot((b) => ({
      ...b,
      commands: b.commands.map((c) => (c.id === id ? { ...c, ...patch } : c)),
    }));
  }

  return (
    <div className="space-y-6">
      <div className="lg:hidden">
        <DashboardNav />
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Create Listing</h1>
          <p className="mt-1 text-muted">
            Build your listing and preview how it appears in the marketplace and public page.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="secondary"
            onPress={() => {
              setPendingType(null);
              setTypeModalOpen(true);
            }}
          >
            Change type
          </Button>
          {tab === "server" ? (
            <Button variant="secondary" onPress={() => setModalOpen(true)}>
              <Eye className="size-4" />
              Expand Preview
            </Button>
          ) : null}
        </div>
      </div>

      <div
        role="tablist"
        aria-label="Listing type"
        className="flex w-full max-w-md gap-1 rounded-2xl border border-border bg-default/60 p-1"
      >
        <Button
          className="flex-1"
          variant={tab === "server" ? "primary" : "ghost"}
          onPress={() => {
            setTab("server");
            setPendingType("server");
            setSetupModalOpen(true);
            setFlowReady(false);
          }}
        >
          <Server className="size-4" />
          Server Listing
        </Button>
        <Button
          className="flex-1"
          variant={tab === "bot" ? "primary" : "ghost"}
          onPress={() => {
            setTab("bot");
            setFlowReady(true);
          }}
        >
          <Bot className="size-4" />
          Bot Listing
        </Button>
      </div>

      {!flowReady ? (
        <div className="nexus-card rounded-2xl p-8 text-center text-sm text-muted">
          Choose a listing type to continue. Use the dialogs to pick Server or Bot, then complete
          setup.
        </div>
      ) : tab === "server" ? (
        <div className="grid grid-cols-1 gap-8 xl:grid-cols-[minmax(0,1fr)_400px]">
          <form
            className="nexus-card space-y-6 rounded-2xl p-5 md:p-6"
            onSubmit={(e) => e.preventDefault()}
          >
            <Alert status="accent" className="rounded-2xl">
              <Alert.Indicator>
                <Shield className="size-4" />
              </Alert.Indicator>
              <Alert.Content>
                <Alert.Title>Community safety</Alert.Title>
                <Alert.Description>
                  Servers listed on Nexus should be safe, public-facing communities that follow
                  Discord’s Terms of Service and avoid harmful or misleading content.
                </Alert.Description>
              </Alert.Content>
            </Alert>

            <section className="space-y-4">
              <div>
                <h2 className="text-sm font-semibold text-foreground">Basic info</h2>
                <p className="text-xs text-muted">Core details shown across Nexus</p>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <TextField
                  isRequired
                  value={server.name}
                  onChange={(v) => setServer((s) => ({ ...s, name: v }))}
                >
                  <Label>Server name</Label>
                  <Input placeholder="My awesome server" />
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
                isRequired
                value={server.inviteUrl}
                onChange={(v) => setServer((s) => ({ ...s, inviteUrl: v }))}
              >
                <Label>Discord invite URL</Label>
                <Input placeholder="https://discord.gg/..." />
              </TextField>

              <TextField
                value={server.shortDescription}
                onChange={(v) => setServer((s) => ({ ...s, shortDescription: v }))}
              >
                <Label>Short description</Label>
                <Input placeholder="One-line pitch for the listing card" />
              </TextField>

              <TextField
                value={server.fullDescription}
                onChange={(v) => setServer((s) => ({ ...s, fullDescription: v }))}
              >
                <Label>Full description</Label>
                <TextArea rows={4} placeholder="Shown on the public server page About section" />
              </TextField>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <TagMultiSelect
                  value={server.tags}
                  options={SERVER_LISTING_TAGS}
                  onChange={(tags) => setServer((s) => ({ ...s, tags }))}
                  placeholder="Select up to 3 tags"
                />

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

              <Select
                selectedKey={server.region}
                onSelectionChange={(key) => setServer((s) => ({ ...s, region: String(key) }))}
              >
                <Label>Region</Label>
                <Select.Trigger>
                  <Select.Value />
                  <Select.Indicator />
                </Select.Trigger>
                <Select.Popover>
                  <ListBox>
                    {REGIONS.map((r) => (
                      <ListBox.Item key={r} id={r} textValue={r}>
                        {r}
                        <ListBox.ItemIndicator />
                      </ListBox.Item>
                    ))}
                  </ListBox>
                </Select.Popover>
              </Select>
            </section>

            <section className="space-y-4">
              <div>
                <h2 className="text-sm font-semibold text-foreground">Stats</h2>
                <p className="text-xs text-muted">Demo metrics for listing previews</p>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <TextField
                  value={server.members}
                  onChange={(v) => setServer((s) => ({ ...s, members: v }))}
                >
                  <Label>Member count</Label>
                  <Input inputMode="numeric" placeholder="10000" />
                </TextField>
                <TextField
                  value={server.online}
                  onChange={(v) => setServer((s) => ({ ...s, online: v }))}
                >
                  <Label>Online count</Label>
                  <Input inputMode="numeric" placeholder="1200" />
                </TextField>
                <TextField
                  value={server.likes}
                  onChange={(v) => setServer((s) => ({ ...s, likes: v }))}
                >
                  <Label>Likes</Label>
                  <Input inputMode="numeric" />
                </TextField>
                <TextField
                  value={server.monthlyGrowth}
                  onChange={(v) => setServer((s) => ({ ...s, monthlyGrowth: v }))}
                >
                  <Label>Monthly growth %</Label>
                  <Input inputMode="numeric" />
                </TextField>
                <TextField
                  value={server.joinClicks}
                  onChange={(v) => setServer((s) => ({ ...s, joinClicks: v }))}
                >
                  <Label>Join clicks</Label>
                  <Input inputMode="numeric" />
                </TextField>
                <TextField
                  value={server.createdAt}
                  onChange={(v) => setServer((s) => ({ ...s, createdAt: v }))}
                >
                  <Label>Created</Label>
                  <Input placeholder="March 2021" />
                </TextField>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <Select
                  selectedKey={server.activity}
                  onSelectionChange={(key) =>
                    setServer((s) => ({ ...s, activity: String(key) }))
                  }
                >
                  <Label>Activity</Label>
                  <Select.Trigger>
                    <Select.Value />
                    <Select.Indicator />
                  </Select.Trigger>
                  <Select.Popover>
                    <ListBox>
                      {ACTIVITY_LEVELS.map((a) => (
                        <ListBox.Item key={a} id={a} textValue={a}>
                          {a}
                          <ListBox.ItemIndicator />
                        </ListBox.Item>
                      ))}
                    </ListBox>
                  </Select.Popover>
                </Select>
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
                      {VISIBILITY.map((v) => (
                        <ListBox.Item key={v} id={v} textValue={v}>
                          {v}
                          <ListBox.ItemIndicator />
                        </ListBox.Item>
                      ))}
                    </ListBox>
                  </Select.Popover>
                </Select>
              </div>
            </section>

            <section className="space-y-3">
              <div>
                <h2 className="text-sm font-semibold text-foreground">Server media</h2>
                <p className="text-xs text-muted">
                  Servers support icon and banner only — no gallery images.
                </p>
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <UploadBox
                  title="Server icon"
                  hint="Drag & drop or click"
                  sizeHint="Recommended 512×512"
                  variant="icon"
                />
                <UploadBox
                  title="Server banner"
                  hint="Drag & drop or click"
                  sizeHint="Recommended 960×320"
                  variant="banner"
                />
              </div>
            </section>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="flex items-center justify-between rounded-2xl border border-border px-4 py-3">
                <div>
                  <p className="text-sm font-medium">Verified badge</p>
                  <p className="text-xs text-muted">Show verified trust signal</p>
                </div>
                <Switch
                  aria-label="Verified"
                  isSelected={server.verified}
                  onChange={(v) => setServer((s) => ({ ...s, verified: v }))}
                >
                  <Switch.Content>
                    <Switch.Control>
                      <Switch.Thumb />
                    </Switch.Control>
                  </Switch.Content>
                </Switch>
              </div>
              <div className="flex items-center justify-between rounded-2xl border border-border px-4 py-3">
                <div>
                  <p className="text-sm font-medium">Featured</p>
                  <p className="text-xs text-muted">Request featured placement</p>
                </div>
                <Switch
                  aria-label="Featured"
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

            <div className="flex flex-wrap gap-2 pt-1">
              <Button
                variant="secondary"
                onPress={() => {
                  writeStatusOverride({
                    id: slugify(server.name || "server-draft"),
                    name: server.name || "Untitled Server",
                    type: "server",
                    status: "Draft",
                    updated: "Just now",
                    category: server.category,
                    description: server.shortDescription,
                    bannerHue: server.bannerHue,
                  });
                  toast.success("Draft saved");
                }}
              >
                <Save className="size-4" />
                Save Draft
              </Button>
              <Button onPress={publishServer}>
                <Send className="size-4" />
                Publish Server
              </Button>
            </div>
          </form>

          <PreviewPanel
            kind="server"
            mode={previewMode}
            onModeChange={setPreviewMode}
            listing={listingPreview}
            page={pagePreview}
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8 xl:grid-cols-[minmax(0,1fr)_400px]">
          <form
            className="nexus-card space-y-5 rounded-2xl p-5 md:p-6"
            onSubmit={(e) => e.preventDefault()}
          >
            <Alert status="warning" className="rounded-2xl">
              <Alert.Indicator>
                <Shield className="size-4" />
              </Alert.Indicator>
              <Alert.Content>
                <Alert.Title>Bot listing rules</Alert.Title>
                <Alert.Description>
                  Bots listed on Nexus must follow Discord’s Terms of Service, avoid malicious
                  behavior, avoid spam, and provide clear functionality for users.
                </Alert.Description>
              </Alert.Content>
            </Alert>

            {bot.statusLabel ? (
              <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm font-medium text-foreground">
                Status: {bot.statusLabel}
              </div>
            ) : null}

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <TextField
                isRequired
                value={bot.name}
                onChange={(v) => setBot((s) => ({ ...s, name: v }))}
              >
                <Label>Bot name</Label>
                <Input placeholder="My utility bot" />
              </TextField>

              <TextField
                isRequired
                value={bot.clientId}
                onChange={(v) => setBot((s) => ({ ...s, clientId: v }))}
              >
                <Label>Bot client ID</Label>
                <Input placeholder="From Discord Developer Portal" />
                <Description>Found in the Discord Developer Portal application page.</Description>
              </TextField>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <TextField value={bot.prefix} onChange={(v) => setBot((s) => ({ ...s, prefix: v }))}>
                <Label>Bot prefix</Label>
                <Input placeholder="/" />
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
              isRequired
              value={bot.shortDescription}
              onChange={(v) => setBot((s) => ({ ...s, shortDescription: v }))}
            >
              <Label>Short description</Label>
              <Input placeholder="One-line pitch" />
            </TextField>

            <TextField
              value={bot.fullDescription}
              onChange={(v) => setBot((s) => ({ ...s, fullDescription: v }))}
            >
              <Label>Long description</Label>
              <TextArea rows={5} placeholder="Features, setup, and examples" />
              <Description>
                Use markdown to format your bot features, setup instructions, and command examples.
              </Description>
            </TextField>

            <TagMultiSelect
              value={bot.tags}
              options={BOT_LISTING_TAGS}
              onChange={(tags) => setBot((s) => ({ ...s, tags }))}
              placeholder="Select up to 3 tags"
            />

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <TextField
                isRequired
                value={bot.inviteUrl}
                onChange={(v) => setBot((s) => ({ ...s, inviteUrl: v }))}
              >
                <Label>Bot invite URL</Label>
                <Input placeholder="https://discord.com/oauth2/..." />
              </TextField>
              <TextField
                value={bot.supportUrl}
                onChange={(v) => setBot((s) => ({ ...s, supportUrl: v }))}
              >
                <Label>Support server URL</Label>
                <Input placeholder="https://discord.gg/..." />
              </TextField>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <TextField
                value={bot.websiteUrl}
                onChange={(v) => setBot((s) => ({ ...s, websiteUrl: v }))}
              >
                <Label>Website URL (Optional)</Label>
                <Input placeholder="https://" />
              </TextField>
              <TextField
                value={bot.githubUrl}
                onChange={(v) => setBot((s) => ({ ...s, githubUrl: v }))}
              >
                <Label>GitHub repository (Optional)</Label>
                <Input placeholder="https://github.com/..." />
              </TextField>
            </div>

            <section className="space-y-3">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h2 className="text-sm font-semibold text-foreground">Bot commands</h2>
                  <p className="text-xs text-muted">At least 2 commands are required to publish</p>
                </div>
                <Button
                  size="sm"
                  variant="secondary"
                  onPress={() =>
                    setBot((b) => ({
                      ...b,
                      commands: [
                        ...b.commands,
                        { id: `c${Date.now()}`, name: "", description: "" },
                      ],
                    }))
                  }
                >
                  <Plus className="size-4" />
                  Add command
                </Button>
              </div>

              {commandError ? (
                <p className="text-sm text-danger">{commandError}</p>
              ) : null}

              <div className="space-y-3">
                {bot.commands.map((cmd, index) => (
                  <div
                    key={cmd.id}
                    className="grid grid-cols-1 gap-3 rounded-xl border border-border p-3 md:grid-cols-[1fr_1.4fr_auto]"
                  >
                    <TextField
                      value={cmd.name}
                      onChange={(v) => updateCommand(cmd.id, { name: v })}
                      isInvalid={Boolean(commandError) && !cmd.name.trim()}
                    >
                      <Label>Command {index + 1}</Label>
                      <Input placeholder="/ban" />
                      {commandError && !cmd.name.trim() ? (
                        <FieldError>Required</FieldError>
                      ) : null}
                    </TextField>
                    <TextField
                      value={cmd.description}
                      onChange={(v) => updateCommand(cmd.id, { description: v })}
                      isInvalid={Boolean(commandError) && !cmd.description.trim()}
                    >
                      <Label>Description</Label>
                      <Input placeholder="Ban a user from the server" />
                      {commandError && !cmd.description.trim() ? (
                        <FieldError>Required</FieldError>
                      ) : null}
                    </TextField>
                    <div className="flex items-end">
                      <Button
                        isIconOnly
                        variant="ghost"
                        aria-label="Remove command"
                        isDisabled={bot.commands.length <= 2}
                        onPress={() =>
                          setBot((b) => ({
                            ...b,
                            commands: b.commands.filter((c) => c.id !== cmd.id),
                          }))
                        }
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <div>
              <p className="mb-2 text-sm font-semibold text-foreground">Bot media</p>
              <p className="mb-3 text-xs text-muted">
                Avatar, banner, and gallery previews (up to 6 images). Gallery is bot-only.
              </p>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <UploadDropzone
                  title="Bot avatar"
                  hint="Drag & drop or click"
                  sizeHint="Recommended 512×512"
                />
                <UploadDropzone
                  title="Banner"
                  hint="Drag & drop or click"
                  sizeHint="Recommended 960×320"
                />
                <UploadDropzone
                  title="Gallery"
                  hint="Add up to 6 images"
                  sizeHint="Recommended 1200×675"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
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
              <div className="flex items-center justify-between rounded-2xl border border-border px-4 py-3">
                <div>
                  <p className="text-sm font-medium">Verified badge</p>
                  <p className="text-xs text-muted">Show verified trust signal</p>
                </div>
                <Switch
                  aria-label="Verified bot"
                  isSelected={bot.verified}
                  onChange={(v) => setBot((s) => ({ ...s, verified: v }))}
                >
                  <Switch.Content>
                    <Switch.Control>
                      <Switch.Thumb />
                    </Switch.Control>
                  </Switch.Content>
                </Switch>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 pt-1">
              <Button
                variant="secondary"
                onPress={() => {
                  writeStatusOverride({
                    id: slugify(bot.name || "bot-draft"),
                    name: bot.name || "Untitled Bot",
                    type: "bot",
                    status: "Draft",
                    updated: "Just now",
                    category: bot.category,
                    description: bot.shortDescription,
                    bannerHue: bot.bannerHue,
                  });
                  toast.success("Draft saved");
                }}
              >
                <Save className="size-4" />
                Save Draft
              </Button>
              <Button onPress={tryPublishBot}>
                <Send className="size-4" />
                Publish Bot
              </Button>
            </div>
          </form>

          <PreviewPanel
            kind="bot"
            mode={previewMode}
            onModeChange={setPreviewMode}
            listing={botListingPreview}
            page={botPagePreview}
          />
        </div>
      )}

      <ListingTypeModal
        isOpen={typeModalOpen}
        onOpenChange={setTypeModalOpen}
        value={pendingType}
        onChange={setPendingType}
        onContinue={handleTypeContinue}
      />

      <ServerSetupModal
        isOpen={setupModalOpen}
        onOpenChange={setSetupModalOpen}
        mode={setupMode}
        onModeChange={setSetupMode}
        selectedServerId={selectedDiscordId}
        onSelectServer={(ds) => {
          setSelectedDiscordId(ds.id);
          setServer(fromDiscordServer(ds));
        }}
        onContinue={handleSetupContinue}
      />

      <BotReviewModal
        isOpen={reviewOpen}
        onOpenChange={setReviewOpen}
        onAgree={finalizeBotPublish}
      />

      <Modal.Backdrop isOpen={modalOpen} onOpenChange={setModalOpen}>
        <Modal.Container size="lg">
          <Modal.Dialog className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Heading>
                {previewMode === "listing" ? "Listing card preview" : "Server page preview"}
              </Modal.Heading>
            </Modal.Header>
            <Modal.Body>
              <div className="mb-4 flex gap-1 rounded-xl border border-border bg-default/50 p-1">
                <Button
                  size="sm"
                  className="flex-1"
                  variant={previewMode === "listing" ? "primary" : "ghost"}
                  onPress={() => setPreviewMode("listing")}
                >
                  Listing Preview
                </Button>
                <Button
                  size="sm"
                  className="flex-1"
                  variant={previewMode === "page" ? "primary" : "ghost"}
                  onPress={() => setPreviewMode("page")}
                >
                  Page Preview
                </Button>
              </div>
              <div className="mx-auto max-w-md">
                {previewMode === "listing" ? (
                  <ServerCardPreview model={listingPreview} />
                ) : (
                  <ServerPagePreview model={pagePreview} />
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
