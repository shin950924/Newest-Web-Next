// src/app/singleFeed/[entry_id]/page.tsx
import { Metadata } from "next";
import { FeedItem } from "../../../../types";
import { BASE_URL } from "@/app/api/apiClient";
import SingleFeedPageContainer from "./SingleFeedPageContainer";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ entry_id: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const id = resolvedParams.entry_id;

  const res = await fetch(`${BASE_URL}/entry_detail?entry_id=${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return { title: "Feed Not Found" };
  }

  const item: FeedItem = await res.json();
  const primaryArticle = item.articles[0];

  const title = item.rss_title || "Newest";
  const description = item.description || "Newest! - 피드를 확인하세요!";

  const imageUrl =
    primaryArticle?.images || "https://www.shin1995seoul.com/images/001.png";

  return {
    title,
    description,
    openGraph: {
      type: "article",
      title,
      description,
      url: `https://www.shin1995seoul.com/singleFeed/${id}`,
      siteName: "Newest",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
    icons: {
      icon: "/favicon.ico",
      apple: "/apple-touch-icon.png",
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
