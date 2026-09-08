"use client";

import { useIntersectionObserver as useIntersectionObserverPrimitive } from "usehooks-ts";

export type UseIntersectionObserverOptions = NonNullable<Parameters<typeof useIntersectionObserverPrimitive>[0]>;

export type UseIntersectionObserverReturn = ReturnType<typeof useIntersectionObserverPrimitive>;

/**
 * Tracks whether an element intersects its root or the viewport.
 */
export function useIntersectionObserver(options?: UseIntersectionObserverOptions): UseIntersectionObserverReturn {
	return useIntersectionObserverPrimitive(options);
}
