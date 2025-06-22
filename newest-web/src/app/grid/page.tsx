"use client";
import GridItem from "./GridItem";
import Masonry from "react-masonry-css";
import { Feeds, RootState } from "../../../types";
import { setFeed } from "@/redux/slice/feedSlice";
import { useDispatch, useSelector } from "react-redux";
import { getEntries } from "../service/entriesService";
import useGridEntries from "@/app/hooks/useGridEntries";
import styles from "../../styles/GridScreen.module.css";
import React, { useRef, useEffect, useCallback } from "react";
import LoadingIndicator from "../component/common/LoadingIndicator";
import BottomTabBar from "../component/common/BottomTabBar";

const GridScreen: React.FC = () => {
  const dispatch = useDispatch();
  const sentinelRef = useRef<HTMLDivElement>(null);
  const { loadingState, handleEndReached } = useGridEntries();
  const feeds = useSelector((state: RootState) => state.feeds.feeds);

  const isLoading = loadingState === "loading";
  const isLoadingMore = loadingState === "loadingMore";

  const loadInitialData = useCallback(async () => {
    const response = await getEntries(10, 0);
    dispatch(setFeed(response));
  }, [dispatch]);

  useEffect(() => {
    if (feeds.length === 0) {
      loadInitialData();
    }
  }, [feeds.length, loadInitialData]);

  const onIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const shouldLoadMore = entries.some((entry) => entry.isIntersecting);
      if (shouldLoadMore && !isLoadingMore && feeds.length > 0) {
        handleEndReached();
      }
    },
    [handleEndReached, isLoadingMore, feeds.length]
  );

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(onIntersection, {
      threshold: 0.1,
    });
    observer.observe(sentinel);

    return () => observer.disconnect();
  }, [onIntersection]);

  const renderContent = () => {
    if (isLoading && feeds.length === 0) {
      return <LoadingIndicator />;
    }

    return (
      <>
        <Masonry
          breakpointCols={{ default: 2 }}
          className={styles.masonryGrid}
          columnClassName={styles.masonryGridColumn}
        >
          {feeds.map((item: Feeds, index: number) => (
            <GridItem
              key={index}
              data={item}
              isTextOverlay
              source={
                item.type === "post"
                  ? item.media_urls?.[0]
                  : item.articles?.[0]?.images
              }
            />
          ))}
        </Masonry>
        <div ref={sentinelRef} style={{ height: 20 }} />
        {isLoadingMore && (
          <div className={styles.loadingMoreContainer}>
            <LoadingIndicator />
          </div>
        )}
      </>
    );
  };

  return (
    <div>
      <div className={styles.gridContainer}>{renderContent()}</div>
      <BottomTabBar />
    </div>
  );
};

export default GridScreen;
