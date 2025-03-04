"use client";
import React, { useCallback, useState, useEffect, useRef } from "react";
import styles from "../styles/Home.module.css";
import FeedItem from "./component/FeedItem";
import Header from "./component/Header";
import LoadingIndicator from "./component/LoadingIndicator";
import useEntries from "./hooks/useEntries";
import { Feeds } from "../../types";
import BottomTabBar from "./component/BottomTabBar";

export default function HomePage() {
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const [foldStates, setFoldStates] = useState<{ [key: string]: boolean }>({});
  const { data, error, loading, loadingMore, handleRefresh, handleEndReached } =
    useEntries();

  useEffect(() => {
    handleRefresh();
  }, [handleRefresh]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        handleEndReached();
      }
    });

    if (sentinelRef.current) {
      observer.observe(sentinelRef.current);
    }

    return () => {
      if (sentinelRef.current) {
        observer.unobserve(sentinelRef.current);
      }
    };
  }, [handleEndReached]);

  const handleToggleFold = useCallback((item_id: string) => {
    setFoldStates((prev) => ({
      ...prev,
      [item_id]: !(prev[item_id] ?? true),
    }));
  }, []);

  const renderItem = useCallback(
    (item: Feeds, index: number) => {
      const item_id = item.entry_id ? `E${item.entry_id}` : `P${item.post_id}`;
      const isFold = foldStates[item_id] ?? true;
      return (
        <FeedItem
          key={index}
          item={item}
          isFold={isFold}
          isFoldable={true}
          onToggleFold={() => handleToggleFold(item_id)}
        />
      );
    },
    [foldStates, handleToggleFold]
  );

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <Header />
        {loading && data.length === 0 ? (
          <LoadingIndicator />
        ) : (
          <div className={styles.scrollArea}>
            {data.map(renderItem)}
            {loadingMore && <LoadingIndicator />}
            <div ref={sentinelRef} className={styles.sentinel} />
            {!loading && !error && data.length === 0 && (
              <div className={styles.emptyContainer}>
                <p>No entries available.</p>
              </div>
            )}
          </div>
        )}
      </div>
      <BottomTabBar />
    </div>
  );
}
