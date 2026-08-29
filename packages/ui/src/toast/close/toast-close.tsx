"use client";

import { Toast as ToastPrimitive } from "@base-ui/react/toast";
import { cn } from "@superdao/lib/utils";
import { Button } from "@superdao/ui/components/button";
import { XIcon } from "lucide-react";

export interface ToastCloseProps extends ToastPrimitive.Close.Props {}

/**
 * Renders the toast close component.
 *
 * @see https://base-ui.com/react/components/toast
 */
export function ToastClose({
  className,
  children,
  render = (
    <Button
      variant="ghost"
      size="icon-sm"
    />
  ),
  ...props
}: ToastCloseProps) {
  return (
    <ToastPrimitive.Close
      data-slot="toast-close"
      aria-label="Close toast"
      render={render}
      className={cn(
        "relative shrink-0 text-muted-foreground after:absolute after:-inset-2 after:content-[''] hover:text-foreground",
        className
      )}
      {...props}
    >
      {children ?? <XIcon aria-hidden="true" />}
    </ToastPrimitive.Close>
  );
}
