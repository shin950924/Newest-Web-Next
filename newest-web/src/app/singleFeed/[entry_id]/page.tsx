// src/app/singleFeed/[entry_id]/page.tsx
import { Metadata } from "next";
import { FeedItem } from "../../../../types";
import { BASE_URL } from "@/app/api/apiClient";
import SingleFeedPageContainer from "./SingleFeedPageContainer";

// OG 메타 생성
export async function generateMetadata({
  params,
}: {
  params: Promise<{ entry_id: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const id = resolvedParams.entry_id;
  const res = await fetch(`${BASE_URL}?entry_id=${id}`, { cache: "no-store" });
  if (!res.ok) {
    return { title: "Feed Not Found" };
  }
  const item: FeedItem = await res.json();
  const primary = item.articles[0] ?? null;
  const secondary = item.articles[1]?.images || item.media_urls[0] || "";
  const title = item.description || primary?.titles || item.rss_title || "";

  return {
    title,
    description: item.description || item.rss_title,
    openGraph: {
      type: "article",
      title,
      description: item.description || item.rss_title,
      url: `https://www.shin1995seoul.com/singleFeed/${id}`,
      images: secondary ? [secondary] : [],
    },
    twitter: {
      card: "summary_large_image",
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ entry_id: string }>;
}) {
  const resolvedParams = await params;
  return <SingleFeedPageContainer entryId={resolvedParams.entry_id} />;
}
