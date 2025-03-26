// hooks/useEntries.ts
import { useState, useCallback, useRef, useEffect } from 'react';
import { getEntries } from '../service/entriesService';
import { Feeds } from '../../../types';

const LIMIT = 10;
type LoadingState = 'idle' | 'loading' | 'refreshing' | 'loadingMore';

const useEntries = () => {
  const [data, setData] = useState<Feeds[]>([]);
  
  const dataRef = useRef(data);
  useEffect(() => {
    dataRef.current = data;
  }, [data]);

  const [loadingState, setLoadingState] = useState<LoadingState>('idle');
  const [error, setError] = useState<string | null>(null);

  const offsetRef = useRef<number>(0);
  const hasMoreRef = useRef<boolean>(true);
  const isFetchingRef = useRef<boolean>(false);

  const fetchEntries = useCallback(async (isRefresh: boolean = false) => {
    if (isFetchingRef.current) return;
    if (!isRefresh && !hasMoreRef.current) return;

    const currentOffset = isRefresh ? 0 : offsetRef.current;
    setLoadingState(
      isRefresh
        ? 'refreshing'
        : currentOffset === 0
        ? 'loading'
        : 'loadingMore'
    );

    if (isRefresh) {
      offsetRef.current = 0;
      hasMoreRef.current = true;
    }

    isFetchingRef.current = true;

    try {
      const result: Feeds[] = await getEntries(LIMIT, currentOffset);
      const newData = isRefresh ? result : [...dataRef.current, ...result];
      setData(newData);

      if (result.length < LIMIT) {
        hasMoreRef.current = false;
      }
      offsetRef.current = currentOffset + LIMIT;
      setError(null);
    } catch (err: unknown) {
      console.error('Error fetching entries:', err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('데이터를 불러오는 데 실패했습니다.');
      }
    }
  }, []);

  useEffect(() => {
    fetchEntries();
  }, [fetchEntries]);

  const handleRefresh = useCallback(() => {
    fetchEntries(true);
  }, [fetchEntries]);

  const handleEndReached = useCallback(() => {
    if (loadingState === 'idle' && hasMoreRef.current) {
      fetchEntries();
    }
  }, [loadingState, fetchEntries]);

  // 업데이트된 항목으로 로컬 상태 업데이트
  const updateEntry = useCallback((updatedEntry: Feeds) => {
    const newData = dataRef.current.map((entry) =>
      entry.entry_id === updatedEntry.entry_id ? updatedEntry : entry
    );
    setData(newData);
  }, []);

  return {
    data,
    error,
    loading: loadingState === 'loading',
    refreshing: loadingState === 'refreshing',
    loadingMore: loadingState === 'loadingMore',
    updateEntry,
    fetchEntries,
    handleRefresh,
    handleEndReached,
  };
};

export default useEntries;