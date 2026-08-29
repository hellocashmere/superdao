"use client";

import { useDebounceValue as useDebounceValuePrimitive } from "usehooks-ts";

export type UseDebounceValueOptions<T> = Parameters<typeof useDebounceValuePrimitive<T>>;

export type UseDebounceValueReturn<T> = ReturnType<typeof useDebounceValuePrimitive<T>>;

/**
 * Returns a debounced value using the shared hook implementation.
 */
export function useDebounceValue<T>(...args: UseDebounceValueOptions<T>): UseDebounceValueReturn<T> {
  return useDebounceValuePrimitive(...args);
}
