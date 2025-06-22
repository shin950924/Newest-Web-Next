"use client";
import React, { memo, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import apiClient from "../../api/apiClient";
import MenuBar from "../../home/MenuBar";
import Profile from "../../home/Profile";
import Content from "../../home/Content";
import ContentImage from "../../home/ContentImage";
import RelatedArticle from "../../home/RelatedArticle";
import BottomTabBar from "../../component/common/BottomTabBar";
import Header from "../../home/Header";
import styles from "../../../styles/FeedItem.module.css";
import { FeedItem } from "../../../../types";
import WarningScreen from "@/app/component/common/WarningScreen";

interface SingleFeedPageContainerProps {
  entryId: string;
}

const initialItem: FeedItem = {
  type: "",
  entry_id: 0,
  description: "",
  rss_title: "",
  created_at: "",
  traffic: "",
  tag: "",
  author: "",
  articles: [],
  like_count: 0,
  comment_count: 0,
  is_liked: false,
  media_urls: [],
};

const SingleFeedPageContainer: React.FC<SingleFeedPageContainerProps> = memo(
  ({ entryId }) => {
    const router = useRouter();
    const [item, setItem] = useState<FeedItem>(initialItem);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
      if (!entryId) {
        router.replace("/home");
        return;
      }
      apiClient
        .get<FeedItem>(`/entry_detail?entry_id=${entryId}`)
        .then((res) => setItem(res.data))
        .catch(() => setError(true))
        .finally(() => setLoading(false));
    }, [entryId, router]);

    if (loading) return <p>Loading...</p>;
    if (error || !item) {
      router.replace("/home");
      return null;
    }

    const { articles, media_urls, description, rss_title, created_at, type } =
      item;
    const primary = articles[0] || null;
    const secondary = articles[1]?.images || media_urls[0] || null;
    const title = description || primary?.titles || rss_title;
    const imageUri = primary?.images || secondary;

    return (
      <>
        <Header leftArrow={false} />
        <div className={styles.center}>
          <div className={`${styles.feedItem} ${styles.singleFeed}`}>
            <div className={styles.profileContainer}>
              <Profile item={item} image={imageUri} />
            </div>
            <WarningScreen />
            <div className={styles.contentContainer}>
              <Content title={title} />
              {secondary && <ContentImage uri={secondary} />}
              {type === "news" && (
                <RelatedArticle articles={articles} time={created_at} />
              )}
              <MenuBar data={item} />
            </div>
          </div>
        </div>
        <BottomTabBar />
      </>
    );
  }
);
SingleFeedPageContainer.displayName = "SingleFeedPageContainer";
export default SingleFeedPageContainer;
