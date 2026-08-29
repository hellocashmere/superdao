"use client";

import { Toast as ToastPrimitive } from "@base-ui/react/toast";
import { cn } from "@superdao/lib/utils";

export interface ToastContentProps extends ToastPrimitive.Content.Props {}

/**
 * Renders the toast content component.
 *
 * @see https://base-ui.com/react/components/toast
 */
export function ToastContent({ className, ...props }: ToastContentProps) {
  return (
    <ToastPrimitive.Content
      data-slot="toast-content"
      className={cn(
        "flex h-full items-center gap-3 overflow-hidden p-4 transition-opacity duration-250 ease-[cubic-bezier(0.22,1,0.36,1)] data-behind:opacity-0 data-expanded:opacity-100",
        className
      )}
      {...props}
    />
  );
}
