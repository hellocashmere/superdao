import * as React from "react"

import { cn } from "@superdao/ui/lib/utils"

export interface PaginationProps extends React.ComponentProps<"nav"> {}

/**
 * Renders the pagination component.
 *
 * Composition:
 * ```text
 * Pagination
 * ├── PaginationContent
 * ├── PaginationEllipsis
 * ├── PaginationItem
 * ├── PaginationLink
 * ├── PaginationNext
 * └── PaginationPrevious
 * ```
 *
 * @see https://react.dev/reference/react/Component
 */
export function Pagination({ className, ...props }: PaginationProps) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      data-slot="pagination"
      className={cn("mx-auto flex w-full justify-center", className)}
      {...props}
    />
  )
}
