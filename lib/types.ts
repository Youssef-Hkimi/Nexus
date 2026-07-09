export type ActivityLevel = "high" | "medium" | "low";

export type ServerListing = {
  id: string;
  name: string;
  description: string;
  members: number;
  online: number;
  category: string;
  tags: string[];
  verified: boolean;
  language: string;
  activity: ActivityLevel;
  bannerHue: string;
  featured?: boolean;
};

export type ServerFeature = {
  id: string;
  title: string;
  description: string;
  icon: "study" | "music" | "voice" | "events" | "gift" | "staff" | "shield" | "roles";
};

export type ServerFaq = {
  id: string;
  question: string;
  answer: string;
};

export type ServerOwner = {
  name: string;
  handle: string;
  verified: boolean;
};

export type ServerStats = {
  monthlyGrowth: number;
  joinClicks: number;
  likes: number;
};

export type ServerDetail = ServerListing & {
  slug: string;
  shortDescription: string;
  longDescription: string;
  createdAt: string;
  region: string;
  inviteStatus: string;
  activityLabel: string;
  inviteUrl: string;
  likes: number;
  isLiked: boolean;
  owner: ServerOwner;
  stats: ServerStats;
  atmosphere: string[];
  features: ServerFeature[];
  highlights: string[];
  faq: ServerFaq[];
  similarServerIds: string[];
  trust: {
    inviteChecked: boolean;
    verifiedOwner: boolean;
    moderated: boolean;
    reportAvailable: boolean;
  };
};

export type BotListing = {
  id: string;
  name: string;
  description: string;
  servers: number;
  votes: number;
  category: string;
  tags: string[];
  verified: boolean;
  rank?: number;
  bannerHue: string;
  premium?: boolean;
};

export type ListingType = "server" | "bot";
export type ListingStatus = "Published" | "Draft" | "Pending" | "Featured";

export type DashboardListing = {
  id: string;
  name: string;
  type: ListingType;
  status: ListingStatus;
  views: number;
  clicks: number;
  updated: string;
  category: string;
  description: string;
  bannerHue: string;
};

export type ActivityItem = {
  id: string;
  icon: "clicks" | "trending" | "votes" | "views" | "update";
  text: string;
  time: string;
};

export type ChartPoint = {
  label: string;
  views: number;
  clicks: number;
};
