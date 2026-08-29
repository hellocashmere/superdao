"use client";

import { useEffect, useState } from "react";

export type UseLoadingOptions = [duration: number];

export type UseLoadingReturn = boolean;

/**
 * Keeps a loading state active for a fixed client-side duration.
 */
export function useLoading(...[duration]: UseLoadingOptions): UseLoadingReturn {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeout = window.setTimeout(() => setIsLoading(false), duration);

    return () => window.clearTimeout(timeout);
  }, [duration]);

  return isLoading;
}
