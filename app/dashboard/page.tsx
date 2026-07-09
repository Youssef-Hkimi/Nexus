"use client";

import { Button, Card } from "@heroui/react";
import {
  BarChart3,
  Bot,
  Plus,
  Server,
  UserRound,
} from "lucide-react";
import { useRouter } from "next/navigation";

import { ActivityFeed } from "@/components/dashboard/activity-feed";
import { DashboardNav } from "@/components/dashboard/dashboard-sidebar";
import { ListingsTable } from "@/components/dashboard/listings-table";
import { PerformanceChart } from "@/components/dashboard/performance-chart";
import { StatsGrid } from "@/components/dashboard/stats-grid";
import { useAuth } from "@/lib/auth/auth-context";

export default function DashboardPage() {
  const router = useRouter();
  const { user, requireAuth } = useAuth();

  function goCreate() {
    requireAuth(() => router.push("/dashboard/new"));
  }

  return (
    <div className="space-y-8">
      <div className="lg:hidden">
        <DashboardNav />
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Welcome back, {user?.username ?? "Alex"}
          </h1>
          <p className="mt-1 text-muted">
            Manage your servers, bots, and community growth.
          </p>
        </div>
        <Button onPress={goCreate}>
          <Plus className="size-4" />
          Create New Listing
        </Button>
      </div>

      <StatsGrid />

      <ListingsTable />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <PerformanceChart />
        <ActivityFeed />
      </div>

      <Card className="nexus-card gap-4" id="settings">
        <Card.Header>
          <Card.Title>Quick Actions</Card.Title>
          <Card.Description>Jump into the workflows you use most</Card.Description>
        </Card.Header>
        <Card.Content className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <Button variant="secondary" className="justify-start" onPress={goCreate}>
            <Server className="size-4" />
            Add Server
          </Button>
          <Button variant="secondary" className="justify-start" onPress={goCreate}>
            <Bot className="size-4" />
            Add Bot
          </Button>
          <Button variant="secondary" className="justify-start">
            <UserRound className="size-4" />
            Edit Profile
          </Button>
          <Button
            variant="secondary"
            className="justify-start"
            onPress={() => {
              document.getElementById("analytics")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <BarChart3 className="size-4" />
            View Analytics
          </Button>
        </Card.Content>
      </Card>

      <div id="bots" className="scroll-mt-28" />
      <div id="reviews" className="scroll-mt-28" />
    </div>
  );
}
