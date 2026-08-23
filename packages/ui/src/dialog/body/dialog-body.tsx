"use client"

import * as React from "react"

import { cn } from "@superdao/ui/lib/utils"

export interface DialogBodyProps extends React.ComponentProps<"div"> {}

/**
 * Renders the dialog body component.
 *
 * @see https://base-ui.com/react/components/dialog
 */
export function DialogBody({ className, ...props }: DialogBodyProps) {
  return (
    <div
      data-slot="dialog-body"
      className={cn("bg-card px-6 pt-4 pb-5", className)}
      {...props}
    />
  )
}
