"use client";
import { RootState } from "../../../types";
import { setFeed } from "@/redux/slice/feedSlice";
import HomePagePresenter from "./HomePagePresenter";
import { useDispatch, useSelector } from "react-redux";
import { getEntries } from "@/app/service/entriesService";
import BottomTabBar from "../component/common/BottomTabBar";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { logEvent } from "firebase/analytics";
import { analytics } from "@/lib/firebase";

const ITEMS_PER_PAGE = 10;

type FoldedStateMapType = Record<string, boolean>;

export default function HomePageContainer() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const feeds = useSelector((state: RootState) => state.feeds.feeds);
  const [foldedStateMap, setFoldedStateMap] = useState<FoldedStateMapType>({});
  const sendEvent = async () => {
    await logEvent(analytics, "page_view", {
      page_location: window.location.href,
    });
  };
  useEffect(() => {
    sendEvent();
    const loadInitialData = async () => {
      try {
        setIsLoading(true);
        const response = await getEntries(ITEMS_PER_PAGE, 0);
        dispatch(setFeed(response));
      } catch (error) {
        console.error("Failed to load initial data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadInitialData();
  }, [dispatch]);

  const loadMoreFeeds = useCallback(async () => {
    if (isLoadingMore || isLoading) return;

    try {
      setIsLoadingMore(true);
      const offset = feeds.length;
      const response = await getEntries(ITEMS_PER_PAGE, offset);

      if (response && response.length > 0) {
        dispatch(setFeed([...feeds, ...response]));
      }
    } catch (error) {
      console.error("Failed to load more feeds:", error);
    } finally {
      setIsLoadingMore(false);
    }
  }, [feeds, isLoading, isLoadingMore, dispatch]);

  useEffect(() => {
    const setupObserver = () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }

      observerRef.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && !isLoadingMore && feeds.length > 0) {
            loadMoreFeeds();
          }
        },
        { threshold: 0.1 }
      );

      if (sentinelRef.current) {
        observerRef.current.observe(sentinelRef.current);
      }
    };

    setupObserver();

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [loadMoreFeeds, isLoadingMore, feeds]);

  const setSentinel = useCallback((node: HTMLDivElement | null) => {
    sentinelRef.current = node;

    if (observerRef.current && node) {
      observerRef.current.observe(node);
    }
  }, []);

  const toggleFoldState = useCallback((feedId: string) => {
    setFoldedStateMap((prev) => ({
      ...prev,
      [feedId]: !(prev[feedId] ?? true),
    }));
  }, []);

  return (
    <div>
      <HomePagePresenter
        feedList={feeds}
        isLoading={isLoading}
        sentinelRef={setSentinel}
        isLoadingMore={isLoadingMore}
        onToggleFold={toggleFoldState}
        foldedStateMap={foldedStateMap}
      />
      <BottomTabBar />
    </div>
  );
}
