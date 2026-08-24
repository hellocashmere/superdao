"use client"

import { AlertDialog as AlertDialogPrimitive } from "@base-ui/react/alert-dialog"

import { cn } from "@superdao/ui/lib/utils"

import { AlertDialogOverlay } from "../overlay/alert-dialog-overlay"
import { AlertDialogPortal } from "../portal/alert-dialog-portal"

export interface AlertDialogContentProps
  extends AlertDialogPrimitive.Popup.Props {
  /**
   * Controls the maximum dialog width.
   */
  size?: "default" | "sm"
}

/**
 * Renders the alert-dialog portal, backdrop, and popup content.
 *
 * @see https://base-ui.com/react/components/alert-dialog
 */
export function AlertDialogContent({
  className,
  ref,
  size = "default",
  ...props
}: AlertDialogContentProps) {
  return (
    <AlertDialogPortal>
      <AlertDialogOverlay />
      <AlertDialogPrimitive.Popup
        ref={ref}
        data-slot="alert-dialog-content"
        data-size={size}
        className={cn(
          "group/alert-dialog-content fixed top-1/2 left-1/2 z-50 flex w-full max-w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-xl bg-card text-card-foreground duration-100 outline-none data-[size=default]:sm:max-w-[400px] data-[size=sm]:sm:max-w-xs data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
          className
        )}
        {...props}
      />
    </AlertDialogPortal>
  )
}
