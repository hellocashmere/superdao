"use client";

import { useMediaQuery as useMediaQueryPrimitive } from "usehooks-ts";

export type UseMediaQueryOptions = Parameters<typeof useMediaQueryPrimitive>;

export type UseMediaQueryReturn = ReturnType<typeof useMediaQueryPrimitive>;

/**
 * Reports whether the current viewport matches a CSS media query.
 */
export function useMediaQuery(...args: UseMediaQueryOptions): UseMediaQueryReturn {
  return useMediaQueryPrimitive(...args);
}
