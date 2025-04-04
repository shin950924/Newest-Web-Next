"use client";
import React, { memo, useMemo, useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import MenuBar from "../home/MenuBar";
import Profile from "../home/Profile";
import Content from "../home/Content";
import { RootState } from "../../../types";
import ContentImage from "../home/ContentImage";
import RelatedArticle from "../home/RelatedArticle";
import styles from "../../styles/FeedItem.module.css";
import BottomTabBar from "../component/common/BottomTabBar";
import Header from "../home/Header";

const SingleFeed: React.FC = () => {
  const router = useRouter();
  const item = useSelector((state: RootState) => state.feeds.selectFeed);

  const primaryArticle = useMemo(() => {
    if (!item) return null;
    return item.type === "news" && item.articles?.[0] ? item.articles[0] : item;
  }, [item]);

  const secondaryArticle = useMemo(() => {
    if (!item) return null;
    return item.type === "news"
      ? item.articles?.[1]?.images
      : item.media_urls?.[0];
  }, [item]);

  const title = useMemo(() => {
    if (!item) return "";
    if (item.type === "news") {
      if (item.description) {
        return item.description;
      } else if (primaryArticle && "titles" in primaryArticle) {
        return primaryArticle.titles;
      } else {
        return undefined;
      }
    } else {
      return item.description;
    }
  }, [item, primaryArticle]);

  const imageUri = useMemo(() => {
    if (!item) return undefined;
    return item.type === "news" && primaryArticle && "images" in primaryArticle
      ? primaryArticle.images
      : undefined;
  }, [item, primaryArticle]);

  useEffect(() => {
    if (!item) {
      router.replace("/home");
    }
  }, [item, router]);

  if (!item) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <Header leftArrow={false} />
      <div className={styles.center}>
        <div className={`${styles.feedItem} ${styles.singleFeed}`}>
          <div className={styles.profileContainer}>
            <Profile item={item} image={imageUri} />
          </div>
          <div className={styles.contentContainer}>
            <Content title={title ?? ""} />
            <ContentImage uri={secondaryArticle} />
            {item.type === "news" && (
              <RelatedArticle articles={item.articles} time={item.created_at} />
            )}
            <MenuBar data={item} />
          </div>
        </div>
      </div>
      <BottomTabBar />
    </div>
  );
};

export default memo(SingleFeed);
