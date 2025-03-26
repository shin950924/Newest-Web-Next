import { RootState } from "../../../types";
import { useState, useCallback } from "react";
import { setFeed } from "@/redux/slice/feedSlice";
import { getEntries } from "../service/entriesService";
import { useDispatch, useSelector } from "react-redux";

const LIMIT = 20;
type LoadingState = "idle" | "loading" | "loadingMore";

const useGridEntries = () => {
  const dispatch = useDispatch();
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const feed = useSelector((state: RootState) => state.feeds.feeds);
  const [loadingState, setLoadingState] = useState<LoadingState>("idle");

  const fetchEntries = useCallback(async () => {
    if (isFetching || !hasMore) return;
    setLoadingState(offset === 0 ? "loading" : "loadingMore");
    setIsFetching(true);
    try {
      const result = await getEntries(LIMIT, offset);
      dispatch(setFeed([...feed, ...result]));
      setHasMore(result.length >= LIMIT);
      setOffset(offset + result.length);
    } catch (error) {
      console.error("Error fetching entries:", error);
    } finally {
      setLoadingState("idle");
      setIsFetching(false);
    }
  }, [dispatch, feed, hasMore, isFetching, offset]);

  const handleEndReached = useCallback(() => {
    if (loadingState === "idle" && hasMore) fetchEntries();
  }, [fetchEntries, hasMore, loadingState]);

  return { loadingState, fetchEntries, handleEndReached };
};

export default useGridEntries;