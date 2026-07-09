import { notFound } from "next/navigation";

import { ServerDetailClient } from "@/components/server/server-detail-client";
import { getServerBySlug } from "@/lib/data/server-details";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  // Prebuild known server slugs from mock data ids
  return [
    { slug: "nexus-hub" },
    { slug: "lofi-girl" },
    { slug: "reactflux" },
    { slug: "midjourney" },
    { slug: "minecraft" },
    { slug: "anime-soul" },
    { slug: "study-together" },
    { slug: "startup-lounge" },
    { slug: "cozy-corner" },
    { slug: "valorant-hub" },
    { slug: "crypto-hub" },
    { slug: "art-garden" },
    { slug: "meme-factory" },
  ];
}

export default async function ServerDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const server = getServerBySlug(slug);

  if (!server) {
    notFound();
  }

  return <ServerDetailClient server={server} />;
}
