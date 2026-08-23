"use client"

import * as React from "react"

import { cn } from "@superdao/ui/lib/utils"

export interface DialogHeaderProps extends React.ComponentProps<"div"> {}

/**
 * Renders the dialog header component.
 *
 * @see https://base-ui.com/react/components/dialog
 */
export function DialogHeader({ className, ...props }: DialogHeaderProps) {
  return (
    <div
      data-slot="dialog-header"
      className={cn(
        "flex flex-col items-start gap-2 rounded-t-xl bg-card px-6 pt-5 pb-4 text-foreground",
        className
      )}
      {...props}
    />
  )
}
