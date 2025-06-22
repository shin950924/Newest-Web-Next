import Content from "./Content";
import Profile from "./Profile";
import MenuBar from "./MenuBar";
import ContentImage from "./ContentImage";
import RelatedArticle from "./RelatedArticle";
import { FeedItemProps } from "../../../types";
import styles from "../../styles/FeedItem.module.css";
import React, { memo, useMemo, useCallback } from "react";
import WarningScreen from "../component/common/WarningScreen";

const FeedItem: React.FC<FeedItemProps> = ({
  item,
  isFold,
  isFoldable,
  sentinelRef,
  onToggleFold,
}) => {
  const primaryArticle = useMemo(() => {
    return item.type === "news" && item.articles?.[0] ? item.articles[0] : item;
  }, [item]);

  const secondaryArticle = useMemo(() => {
    return item.type === "news"
      ? item.articles?.[1]?.images
      : item.media_urls?.[0];
  }, [item]);

  const title = useMemo(() => {
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
    return item.type === "news" && "images" in primaryArticle
      ? primaryArticle.images
      : undefined;
  }, [item, primaryArticle]);

  const handlePressProfile = useCallback(() => {
    if (isFoldable && onToggleFold) {
      onToggleFold();
    }
  }, [isFoldable, onToggleFold]);

  return (
    <div className={styles.feedItem} ref={sentinelRef}>
      <div onClick={handlePressProfile} className={styles.profileContainer}>
        <Profile item={item} image={imageUri} />
      </div>
      {(!isFoldable || !isFold) && (
        <div className={styles.contentContainer}>
          <WarningScreen />
          <Content title={title ?? ""} />
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

export default memo(FeedItem);
