"use client";

import { Toast as ToastPrimitive } from "@base-ui/react/toast";

export interface ToastProviderProps extends ToastPrimitive.Provider.Props {}

/**
 * Renders the toast provider component.
 *
 * @see https://base-ui.com/react/components/toast
 */
export function ToastProvider({ ...props }: ToastProviderProps) {
  return <ToastPrimitive.Provider {...props} />;
}
