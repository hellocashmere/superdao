"use client";

import { Toast as ToastPrimitive } from "@base-ui/react/toast";
import { cn } from "@superdao/lib/utils";
import { Button } from "@superdao/ui/components/button";

export interface ToastActionProps extends ToastPrimitive.Action.Props {}

/**
 * Renders the toast action component.
 *
 * @see https://base-ui.com/react/components/toast
 */
export function ToastAction({
  className,
  render = (
    <Button
      variant="secondary"
      size="sm"
    />
  ),
  ...props
}: ToastActionProps) {
  return (
    <ToastPrimitive.Action
      data-slot="toast-action"
      render={render}
      className={cn("shrink-0", className)}
      {...props}
    />
  );
}
