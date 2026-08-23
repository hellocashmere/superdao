"use client"

import * as React from "react"

import { cn } from "@superdao/ui/lib/utils"

export interface TableCaptionProps extends React.ComponentProps<"caption"> {}

/**
 * Renders the table caption component.
 *
 * @see https://react.dev/reference/react/Component
 */
export function TableCaption({ className, ...props }: TableCaptionProps) {
  return (
    <caption
      data-slot="table-caption"
      className={cn("mt-4 text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}
