"use client"

import * as React from "react"

import { cn } from "@superdao/ui/lib/utils"

export interface TableProps extends React.ComponentProps<"table"> {}

/**
 * Renders the table component.
 *
 * Composition:
 * ```text
 * Table
 * ├── TableHeader
 * ├── TableBody
 * ├── TableFooter
 * ├── TableHead
 * ├── TableRow
 * ├── TableCell
 * └── TableCaption
 * ```
 *
 * @see https://react.dev/reference/react/Component
 */
export function Table({ className, ...props }: TableProps) {
  return (
    <div
      data-slot="table-container"
      className="relative w-full overflow-x-auto"
    >
      <table
        data-slot="table"
        className={cn("w-full caption-bottom text-sm", className)}
        {...props}
      />
    </div>
  )
}
