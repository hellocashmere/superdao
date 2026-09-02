"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

export interface UsePaginationOptions {
  limit: number;
  offset: number;
  total?: number;
}

export interface UsePaginationReturn {
  canGoNext: boolean;
  canGoPrevious: boolean;
  goToFirst: () => void;
  goToLast: () => void;
  goToNext: () => void;
  goToPrevious: () => void;
  limit: number;
  offset: number;
  page: number;
  pageCount: number;
  query: {
    limit: number;
    offset: number;
  };
  reset: () => void;
  setLimit: (limit: number) => void;
}

/**
 * Manages limit/offset pagination for paginated API requests.
 */
export function usePagination({ limit, offset, total }: UsePaginationOptions): UsePaginationReturn {
  const [currentLimit, setCurrentLimit] = useState(limit);
  const [currentOffset, setCurrentOffset] = useState(offset);
  const page = Math.floor(currentOffset / currentLimit) + 1;
  const pageCount = total === undefined ? 1 : Math.max(1, Math.ceil(total / currentLimit));
  const canGoPrevious = currentOffset > 0;
  const canGoNext = total !== undefined && currentOffset + currentLimit < total;

  useEffect(() => {
    if (total === undefined || total === 0 || currentOffset < total) {
      return;
    }

    setCurrentOffset(Math.floor((total - 1) / currentLimit) * currentLimit);
  }, [currentLimit, currentOffset, total]);

  const reset = useCallback(() => setCurrentOffset(0), []);

  const setLimit = useCallback((nextLimit: number) => {
    setCurrentLimit(nextLimit);
    setCurrentOffset(0);
  }, []);

  const goToFirst = reset;

  const goToPrevious = useCallback(() => {
    setCurrentOffset((current) => Math.max(0, current - currentLimit));
  }, [currentLimit]);

  const goToNext = useCallback(() => {
    if (canGoNext) {
      setCurrentOffset((current) => current + currentLimit);
    }
  }, [canGoNext, currentLimit]);

  const goToLast = useCallback(() => {
    if (total !== undefined && total > 0) {
      setCurrentOffset(Math.floor((total - 1) / currentLimit) * currentLimit);
    }
  }, [currentLimit, total]);

  return {
    canGoNext,
    canGoPrevious,
    goToFirst,
    goToLast,
    goToNext,
    goToPrevious,
    limit: currentLimit,
    offset: currentOffset,
    page,
    pageCount,
    query: useMemo(() => ({ limit: currentLimit, offset: currentOffset }), [currentLimit, currentOffset]),
    reset,
    setLimit,
  };
}
