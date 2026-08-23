"use client"

import * as React from "react"

import { cn } from "@superdao/ui/lib/utils"

export interface TableFooterProps extends React.ComponentProps<"tfoot"> {}

/**
 * Renders the table footer component.
 *
 * @see https://react.dev/reference/react/Component
 */
export function TableFooter({ className, ...props }: TableFooterProps) {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn(
        "border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",
        className
      )}
      {...props}
    />
  )
}
