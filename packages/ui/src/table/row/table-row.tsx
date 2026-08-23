"use client"

import * as React from "react"

import { cn } from "@superdao/ui/lib/utils"

export interface TableRowProps extends React.ComponentProps<"tr"> {}

/**
 * Renders the table row component.
 *
 * @see https://react.dev/reference/react/Component
 */
export function TableRow({ className, ...props }: TableRowProps) {
  return (
    <tr
      data-slot="table-row"
      className={cn(
        "border-b transition-colors hover:bg-muted/50 has-aria-expanded:bg-muted/50 data-[state=selected]:bg-muted",
        className
      )}
      {...props}
    />
  )
}
