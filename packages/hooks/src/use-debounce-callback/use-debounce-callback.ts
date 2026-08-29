"use client";

import { useDebounceCallback as useDebounceCallbackPrimitive } from "usehooks-ts";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type UseDebounceCallbackOptions<T extends (...args: any) => ReturnType<T>> = Parameters<
  typeof useDebounceCallbackPrimitive<T>
>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type UseDebounceCallbackReturn<T extends (...args: any) => ReturnType<T>> = ReturnType<
  typeof useDebounceCallbackPrimitive<T>
>;

/**
 * Creates a debounced callback using the shared hook implementation.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useDebounceCallback<T extends (...args: any) => ReturnType<T>>(
  ...args: UseDebounceCallbackOptions<T>
): UseDebounceCallbackReturn<T> {
  return useDebounceCallbackPrimitive(...args);
}
