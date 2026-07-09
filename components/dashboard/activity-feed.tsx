import { Card } from "@heroui/react";
import {
  Eye,
  MousePointerClick,
  Pencil,
  ThumbsUp,
  TrendingUp,
} from "lucide-react";

import { RECENT_ACTIVITY } from "@/lib/data/dashboard";
import type { ActivityItem } from "@/lib/types";

const ICONS: Record<ActivityItem["icon"], React.ReactNode> = {
  clicks: <MousePointerClick className="size-4" />,
  trending: <TrendingUp className="size-4" />,
  votes: <ThumbsUp className="size-4" />,
  views: <Eye className="size-4" />,
  update: <Pencil className="size-4" />,
};

export function ActivityFeed() {
  return (
    <Card className="nexus-card gap-3">
      <Card.Header>
        <Card.Title>Recent Activity</Card.Title>
        <Card.Description>Live signals from your listings</Card.Description>
      </Card.Header>
      <Card.Content className="space-y-2">
        {RECENT_ACTIVITY.map((item) => (
          <div
            key={item.id}
            className="flex items-start gap-3 rounded-xl px-2 py-2.5 transition-colors duration-200 hover:bg-default/60"
          >
            <div className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
              {ICONS[item.icon]}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-foreground">{item.text}</p>
              <p className="text-xs text-muted">{item.time}</p>
            </div>
          </div>
        ))}
      </Card.Content>
    </Card>
  );
}
