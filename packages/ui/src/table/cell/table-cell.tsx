"use client"

import * as React from "react"

import { cn } from "@superdao/ui/lib/utils"

export interface TableCellProps extends React.ComponentProps<"td"> {}

/**
 * Renders the table cell component.
 *
 * @see https://react.dev/reference/react/Component
 */
export function TableCell({ className, ...props }: TableCellProps) {
  return (
    <td
      data-slot="table-cell"
      className={cn(
        "p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0",
        className
      )}
      {...props}
    />
  )
}
