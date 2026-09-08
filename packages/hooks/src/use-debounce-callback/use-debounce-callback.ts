"use client";

import { useDebounceCallback as useDebounceCallbackPrimitive } from "usehooks-ts";

type Callback = Parameters<typeof useDebounceCallbackPrimitive>[0];

export type UseDebounceCallbackOptions<T extends Callback> = Parameters<typeof useDebounceCallbackPrimitive<T>>;

export type UseDebounceCallbackReturn<T extends Callback> = ReturnType<typeof useDebounceCallbackPrimitive<T>>;

/**
 * Creates a debounced callback using the shared hook implementation.
 */
export function useDebounceCallback<T extends Callback>(
	...args: UseDebounceCallbackOptions<T>
): UseDebounceCallbackReturn<T> {
	return useDebounceCallbackPrimitive(...args);
}
