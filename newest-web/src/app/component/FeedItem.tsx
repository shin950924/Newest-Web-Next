// components/FeedItem.tsx
import React from "react";

import styles from "../../styles/FeedItem.module.css";
import Profile from "./Profile";
import Content from "./Content";
import ContentImage from "./ContentImage";
import RelatedArticle from "./RelatedArticle";
import MenuBar from "./MenuBar";

interface FeedItemProps {
  item: any;
  isFold: boolean;
  isFoldable: boolean;
  onToggleFold: () => void;
}

const FeedItem: React.FC<FeedItemProps> = ({
  item,
  isFold,
  isFoldable,
  onToggleFold,
}) => {
  const isArticle = (value: any): boolean => "titles" in value;

  const primaryArticle =
    item.type === "news" && item.articles?.[0] ? item.articles[0] : item;
  const secondaryArticle =
    item.type === "news" ? item.articles?.[1]?.images : item.media_urls?.[0];
  const title =
    item.type === "news"
      ? item.description ||
        (isArticle(primaryArticle) ? primaryArticle.titles : undefined)
      : item.description;
  const imageUri = item.type === "news" ? primaryArticle.images : undefined;

  const handlePressProfile = () => {
    if (isFoldable && onToggleFold) {
      onToggleFold();
    }
  };

  return (
    <div className={styles.feedItem}>
      <div onClick={handlePressProfile} className={styles.profileContainer}>
        <Profile item={item} image={imageUri} />
      </div>
      {(!isFoldable || !isFold) && (
        <div className={styles.contentContainer}>
          <Content title={title} />
          <ContentImage uri={secondaryArticle} />
          {item.type === "news" && (
            <RelatedArticle articles={item.articles} time={item.created_at} />
          )}
          <MenuBar data={item} />
        </div>
      )}
    </div>
  );
};

export default FeedItem;
