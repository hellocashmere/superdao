"use client";

import { Toast as ToastPrimitive } from "@base-ui/react/toast";
import { cn } from "@superdao/lib/utils";

export interface ToastDescriptionProps extends ToastPrimitive.Description.Props {}

/**
 * Renders the toast description component.
 *
 * @see https://base-ui.com/react/components/toast
 */
export function ToastDescription({ className, ...props }: ToastDescriptionProps) {
  return (
    <ToastPrimitive.Description
      data-slot="toast-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
}
