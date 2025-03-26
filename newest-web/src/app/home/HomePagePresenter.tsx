import Header from "./Header";
import FeedItem from "./FeedItem";
import React, { memo, useCallback } from "react";
import styles from "../../styles/Home.module.css";
import { Feeds, HomePagePresenterProps } from "../../../types";
import LoadingIndicator from "../component/common/LoadingIndicator";

const HomePagePresenter: React.FC<HomePagePresenterProps> = ({
  feedList,
  isLoading,
  isLoadingMore,
  foldedStateMap,
  sentinelRef,
  onToggleFold,
}) => {
  const renderFeedItem = useCallback(
    (feed: Feeds, index: number) => {
      const feedId = feed.entry_id ? `E${feed.entry_id}` : `P${feed.post_id}`;
      const isFolded = foldedStateMap[feedId] ?? true;

      const handleToggleFold = () => {
        onToggleFold(feedId);
      };

      return (
        <FeedItem
          key={index}
          item={feed}
          isFold={isFolded}
          isFoldable={true}
          sentinelRef={sentinelRef}
          onToggleFold={handleToggleFold}
        />
      );
    },
    [foldedStateMap, onToggleFold]
  );

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <Header leftArrow={false} />
        {isLoading ? (
          <LoadingIndicator />
        ) : (
          <div className={styles.scrollArea}>
            {feedList.map((feed, index) => renderFeedItem(feed, index))}
            {isLoadingMore && <LoadingIndicator />}
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(HomePagePresenter);
