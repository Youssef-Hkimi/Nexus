"use client";

import {
  Avatar,
  Button,
  Card,
  Chip,
  Dropdown,
  Label,
  Modal,
  Separator,
  TextArea,
  TextField,
  toast,
} from "@heroui/react";
import {
  ArrowLeft,
  BadgeCheck,
  Calendar,
  CheckCircle2,
  Copy,
  Flag,
  Gift,
  Globe2,
  Headphones,
  Link2,
  MessageCircle,
  Mic,
  MoreHorizontal,
  PartyPopper,
  Shield,
  ShieldCheck,
  Sparkles,
  ThumbsUp,
  Users,
} from "lucide-react";
import { useMemo, useState } from "react";

import { LinkButton } from "@/components/ui/link-button";
import { getSimilarServers } from "@/lib/data/server-details";
import { formatCount, initials } from "@/lib/format";
import { getServerBannerUrl } from "@/lib/server-banner";
import type { ServerDetail, ServerFeature } from "@/lib/types";

const FEATURE_ICONS: Record<ServerFeature["icon"], React.ReactNode> = {
  study: <Sparkles className="size-4" />,
  music: <Headphones className="size-4" />,
  voice: <Mic className="size-4" />,
  events: <PartyPopper className="size-4" />,
  gift: <Gift className="size-4" />,
  staff: <Users className="size-4" />,
  shield: <Shield className="size-4" />,
  roles: <BadgeCheck className="size-4" />,
};

function FaqItem({
  question,
  answer,
  open,
  onToggle,
}: {
  question: string;
  answer: string;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="rounded-xl border border-border bg-surface/40">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left transition-colors duration-200 hover:bg-default/50"
      >
        <span className="text-sm font-medium text-foreground">{question}</span>
        <span className="text-muted">{open ? "−" : "+"}</span>
      </button>
      {open ? (
        <div className="border-t border-border px-4 py-3 text-sm leading-relaxed text-muted">
          {answer}
        </div>
      ) : null}
    </div>
  );
}

export function ServerDetailView({ server }: { server: ServerDetail }) {
  const similar = useMemo(() => getSimilarServers(server), [server]);
  const [liked, setLiked] = useState(Boolean(server.isLiked));
  const [likeCount, setLikeCount] = useState(
    typeof server.likes === "number" ? server.likes : server.stats?.likes ?? 0,
  );
  const [reportOpen, setReportOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<string | null>(server.faq[0]?.id ?? null);

  const copyInvite = () => {
    void navigator.clipboard?.writeText(server.inviteUrl).catch(() => undefined);
    toast.success("Invite copied", { description: server.inviteUrl });
  };

  const joinServer = () => {
    toast.success(`Joining ${server.name}`, {
      description: "Invite flow is mocked in this demo.",
    });
  };

  const toggleLike = () => {
    setLiked((prev) => {
      const next = !prev;
      setLikeCount((count) => Math.max(0, count + (next ? 1 : -1)));
      toast.success(next ? "Server liked" : "Like removed");
      return next;
    });
  };

  const bannerUrl = useMemo(
    () => getServerBannerUrl(server.slug, server.bannerHue),
    [server.slug, server.bannerHue],
  );

  return (
    <div className="theme-surface min-h-screen pb-16">
      {/* Hero — cinematic banner + profile header */}
      <section className="relative">
        <div
          className="server-hero-banner"
          role="img"
          aria-label={`${server.name} banner`}
          style={{ backgroundImage: `url("${bannerUrl}")` }}
        />

        <div className="server-hero-profile">
          <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-5 px-4 pb-8 md:flex-row md:items-end md:justify-between md:px-6 lg:px-8">
            <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:items-end">
              <Avatar className="server-hero-avatar size-24 shrink-0 rounded-3xl border-4 border-background shadow-lg md:size-28">
                <Avatar.Fallback
                  className="rounded-3xl text-xl font-bold text-white"
                  style={{
                    background: `linear-gradient(145deg, hsl(${server.bannerHue} 60% 48%), hsl(${(Number(server.bannerHue) + 35) % 360} 55% 38%))`,
                  }}
                >
                  {initials(server.name)}
                </Avatar.Fallback>
              </Avatar>

              <div className="min-w-0 space-y-2 pb-0.5">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                    {server.name}
                  </h1>
                  {server.verified ? (
                    <Chip color="accent" size="sm" variant="soft">
                      <BadgeCheck className="size-3.5" />
                      <Chip.Label>Verified</Chip.Label>
                    </Chip>
                  ) : null}
                  <Chip size="sm" variant="soft" color="accent">
                    <Chip.Label>{server.category}</Chip.Label>
                  </Chip>
                </div>
                <p className="max-w-2xl text-sm leading-relaxed text-muted md:text-base">
                  {server.shortDescription}
                </p>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted">
                  <span className="inline-flex items-center gap-1.5">
                    <Users className="size-4 text-accent" />
                    {formatCount(server.members)} members
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <span className="size-2 rounded-full bg-emerald-400" />
                    {formatCount(server.online)} online
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Globe2 className="size-4" />
                    {server.language}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {server.tags.map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      className="rounded-full outline-none focus-visible:ring-2 focus-visible:ring-accent"
                      onClick={() => toast.info(`Tag: ${tag}`)}
                    >
                      <Chip
                        size="sm"
                        variant="soft"
                        className="cursor-pointer transition-colors duration-200 hover:bg-accent/15"
                      >
                        <Chip.Label>{tag}</Chip.Label>
                      </Chip>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 md:justify-end md:pb-1">
              <Button
                variant={liked ? "primary" : "secondary"}
                className={
                  liked
                    ? "bg-[#629BF8] text-white transition-colors duration-200 hover:bg-[#629BF8]/90"
                    : "transition-colors duration-200"
                }
                onPress={toggleLike}
              >
                <ThumbsUp className={`size-4 ${liked ? "fill-current" : ""}`} />
                Like
                <span className="text-xs opacity-90">{formatCount(likeCount)}</span>
              </Button>
              <Button variant="secondary" onPress={copyInvite}>
                <Copy className="size-4" />
                Copy Invite
              </Button>
              <Button onPress={joinServer}>
                <Link2 className="size-4" />
                Join Server
              </Button>
              <Dropdown>
                <Dropdown.Trigger
                  aria-label="More actions"
                  className="button button--ghost button--icon-only"
                >
                  <MoreHorizontal className="size-4" />
                </Dropdown.Trigger>
                <Dropdown.Popover placement="bottom end">
                  <Dropdown.Menu
                    onAction={(key) => {
                      if (key === "report") setReportOpen(true);
                      if (key === "copy") copyInvite();
                    }}
                  >
                    <Dropdown.Item id="copy" textValue="Copy invite">
                      <Copy className="size-4" />
                      Copy invite
                    </Dropdown.Item>
                    <Dropdown.Item id="report" textValue="Report server" variant="danger">
                      <Flag className="size-4" />
                      Report
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown.Popover>
              </Dropdown>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto grid w-full max-w-[1440px] grid-cols-1 gap-8 px-4 py-8 md:px-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:px-8 xl:grid-cols-[minmax(0,1.7fr)_340px]">
        {/* Main column */}
        <div className="min-w-0 space-y-6">
          <LinkButton href="/server" variant="ghost" className="w-fit">
            <ArrowLeft className="size-4" />
            Back to servers
          </LinkButton>

          {/* About — description only */}
          <Card className="nexus-card gap-4">
            <Card.Header>
              <Card.Title>About this server</Card.Title>
              <Card.Description>What makes {server.name} special</Card.Description>
            </Card.Header>
            <Card.Content>
              <p className="text-sm leading-relaxed text-foreground/90 md:text-[15px]">
                {server.longDescription}
              </p>
            </Card.Content>
          </Card>

          {/* Atmosphere */}
          <Card className="nexus-card gap-4">
            <Card.Header>
              <Card.Title>Atmosphere</Card.Title>
              <Card.Description>The vibe you can expect</Card.Description>
            </Card.Header>
            <Card.Content>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {server.atmosphere.map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-2.5 rounded-xl border border-border bg-default/30 px-3 py-2.5 text-sm text-foreground"
                  >
                    <Sparkles className="mt-0.5 size-4 shrink-0 text-accent" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </Card.Content>
          </Card>

          {/* What you can do here */}
          <Card className="nexus-card gap-4">
            <Card.Header>
              <Card.Title>What you can do here</Card.Title>
              <Card.Description>Community features and spaces</Card.Description>
            </Card.Header>
            <Card.Content>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {server.features.map((feature) => (
                  <div
                    key={feature.id}
                    className="hover-lift flex gap-3 rounded-2xl border border-border bg-surface/50 p-3"
                  >
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
                      {FEATURE_ICONS[feature.icon]}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{feature.title}</p>
                      <p className="mt-0.5 text-xs leading-relaxed text-muted">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Card.Content>
          </Card>

          {/* Community Highlights */}
          <Card className="nexus-card gap-4">
            <Card.Header>
              <Card.Title>Community Highlights</Card.Title>
              <Card.Description>Why members stick around</Card.Description>
            </Card.Header>
            <Card.Content>
              <ul className="space-y-2">
                {server.highlights.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 rounded-xl bg-default/30 px-3 py-2.5 text-sm text-foreground"
                  >
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-accent" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Card.Content>
          </Card>

          {/* FAQ */}
          <Card className="nexus-card gap-4">
            <Card.Header>
              <Card.Title>FAQ</Card.Title>
              <Card.Description>Common questions about {server.name}</Card.Description>
            </Card.Header>
            <Card.Content className="space-y-2">
              {server.faq.map((item) => (
                <FaqItem
                  key={item.id}
                  question={item.question}
                  answer={item.answer}
                  open={openFaq === item.id}
                  onToggle={() => setOpenFaq((cur) => (cur === item.id ? null : item.id))}
                />
              ))}
            </Card.Content>
          </Card>
        </div>

        {/* Sidebar */}
        <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          {/* Server Stats + Details */}
          <Card className="nexus-card-elevated gap-4">
            <Card.Header>
              <Card.Title className="text-base">Server Stats</Card.Title>
            </Card.Header>
            <Card.Content className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Total Members", value: formatCount(server.members) },
                  { label: "Online Now", value: formatCount(server.online) },
                  { label: "Monthly Growth", value: `+${server.stats.monthlyGrowth}%` },
                  { label: "Join Clicks", value: formatCount(server.stats.joinClicks) },
                ].map((stat) => (
                  <div key={stat.label} className="rounded-xl bg-default/50 p-3">
                    <p className="text-xs text-muted">{stat.label}</p>
                    <p className="mt-1 text-lg font-bold text-foreground">{stat.value}</p>
                  </div>
                ))}
              </div>

              <Separator />

              <div>
                <p className="mb-3 text-xs font-semibold tracking-wide text-muted uppercase">
                  Server Details
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Calendar className="size-4 shrink-0 text-muted" />
                    <div className="min-w-0">
                      <p className="text-xs text-muted">Created</p>
                      <p className="text-sm font-medium text-foreground">{server.createdAt}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Globe2 className="size-4 shrink-0 text-muted" />
                    <div className="min-w-0">
                      <p className="text-xs text-muted">Region</p>
                      <p className="text-sm font-medium text-foreground">{server.region}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card.Content>
          </Card>

          <Card className="nexus-card-elevated gap-3">
            <Card.Header>
              <Card.Title className="text-base">Owner / Staff</Card.Title>
            </Card.Header>
            <Card.Content className="space-y-3">
              <div className="flex items-center gap-3">
                <Avatar className="size-12">
                  <Avatar.Fallback className="bg-accent/15 font-semibold text-accent">
                    {initials(server.owner.name)}
                  </Avatar.Fallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-1.5">
                    <p className="text-sm font-semibold text-foreground">{server.owner.name}</p>
                    {server.owner.verified ? (
                      <BadgeCheck className="size-4 text-accent" />
                    ) : null}
                  </div>
                  <p className="text-xs text-muted">{server.owner.handle}</p>
                </div>
              </div>
              <Button
                variant="secondary"
                className="w-full"
                onPress={() =>
                  toast.info("Contact owner", {
                    description: "Messaging is mocked in this demo.",
                  })
                }
              >
                <MessageCircle className="size-4" />
                Contact Owner
              </Button>
            </Card.Content>
          </Card>

          <Card className="nexus-card-elevated gap-3">
            <Card.Header>
              <Card.Title className="text-base">Trust & Safety</Card.Title>
            </Card.Header>
            <Card.Content className="space-y-2.5">
              {[
                {
                  ok: server.trust.inviteChecked,
                  label: "Invite checked",
                  icon: <Link2 className="size-4" />,
                },
                {
                  ok: server.trust.verifiedOwner,
                  label: "Verified owner",
                  icon: <BadgeCheck className="size-4" />,
                },
                {
                  ok: server.trust.moderated,
                  label: "Moderated community",
                  icon: <ShieldCheck className="size-4" />,
                },
                {
                  ok: server.trust.reportAvailable,
                  label: "Report available",
                  icon: <Flag className="size-4" />,
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-2.5 rounded-xl bg-default/40 px-3 py-2 text-sm"
                >
                  <span className={item.ok ? "text-emerald-500" : "text-muted"}>{item.icon}</span>
                  <span className="text-foreground">{item.label}</span>
                  <CheckCircle2
                    className={`ml-auto size-4 ${item.ok ? "text-emerald-500" : "text-muted"}`}
                  />
                </div>
              ))}
            </Card.Content>
          </Card>

          <Card className="nexus-card-elevated gap-3">
            <Card.Header>
              <Card.Title className="text-base">Similar Servers</Card.Title>
            </Card.Header>
            <Card.Content className="space-y-2">
              {similar.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 rounded-xl p-2 transition-colors duration-200 hover:bg-default/60"
                >
                  <Avatar className="size-10 rounded-xl">
                    <Avatar.Fallback className="rounded-xl bg-accent/15 text-xs font-semibold text-accent">
                      {initials(item.name)}
                    </Avatar.Fallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-foreground">{item.name}</p>
                    <p className="text-xs text-muted">{item.category}</p>
                  </div>
                  <LinkButton href={`/server/${item.id}`} size="sm" variant="tertiary">
                    View
                  </LinkButton>
                </div>
              ))}
            </Card.Content>
          </Card>

          <Card className="overflow-hidden border-0 bg-gradient-to-br from-[#629BF8] to-[#82B0F9] p-0 text-white shadow-lg">
            <div className="space-y-3 p-5">
              <p className="text-xs font-semibold tracking-wide text-white/80 uppercase">
                Ready to join?
              </p>
              <h3 className="text-xl font-bold leading-snug">Ready to join {server.name}?</h3>
              <p className="text-sm text-white/90">
                Jump in, pick your roles, and meet the community.
              </p>
              <div className="flex flex-col gap-2">
                <Button
                  className="w-full bg-white text-[#102033] hover:bg-white/90"
                  variant="secondary"
                  onPress={joinServer}
                >
                  Join Server
                </Button>
                <Button
                  className="w-full border-white/30 bg-white/10 text-white hover:bg-white/20"
                  variant="tertiary"
                  onPress={copyInvite}
                >
                  <Copy className="size-4" />
                  Copy Invite
                </Button>
              </div>
            </div>
          </Card>
        </aside>
      </div>

      {/* Report modal */}
      <Modal.Backdrop isOpen={reportOpen} onOpenChange={setReportOpen}>
        <Modal.Container>
          <Modal.Dialog className="sm:max-w-md">
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Heading>Report {server.name}</Modal.Heading>
            </Modal.Header>
            <Modal.Body>
              <p className="text-sm text-muted">
                Tell us what is wrong with this listing. Reports are mocked in this demo and will
                not be sent.
              </p>
              <Separator className="my-3" />
              <TextField>
                <Label>Reason</Label>
                <TextArea rows={3} placeholder="Spam, scam, inappropriate content..." />
              </TextField>
            </Modal.Body>
            <Modal.Footer>
              <Button slot="close" variant="secondary">
                Cancel
              </Button>
              <Button
                variant="danger"
                onPress={() => {
                  toast.danger("Report submitted", {
                    description: "Our team will review this listing.",
                  });
                  setReportOpen(false);
                }}
              >
                Submit report
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </div>
  );
}
