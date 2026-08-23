"use client"

import { AlertDialog as AlertDialogPrimitive } from "@base-ui/react/alert-dialog"

import { cn } from "@superdao/ui/lib/utils"

export interface AlertDialogOverlayProps
  extends AlertDialogPrimitive.Backdrop.Props {}

/**
 * Dims and isolates the page behind an open alert dialog.
 *
 * @see https://base-ui.com/react/components/alert-dialog
 */
export function AlertDialogOverlay({
  className,
  ref,
  ...props
}: AlertDialogOverlayProps) {
  return (
    <AlertDialogPrimitive.Backdrop
      ref={ref}
      data-slot="alert-dialog-overlay"
      className={cn(
        "fixed inset-0 isolate z-50 bg-background/84 duration-100 data-closed:animate-out data-closed:fade-out-0 data-open:animate-in data-open:fade-in-0 supports-backdrop-filter:backdrop-blur-xs",
        className
      )}
      {...props}
    />
  )
}
