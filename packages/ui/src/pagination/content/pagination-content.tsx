import * as React from "react"

import { cn } from "@superdao/ui/lib/utils"

export interface PaginationContentProps extends React.ComponentProps<"ul"> {}

/**
 * Renders the pagination content component.
 *
 * @see https://react.dev/reference/react/Component
 */
export function PaginationContent({
  className,
  ...props
}: PaginationContentProps) {
  return (
    <ul
      data-slot="pagination-content"
      className={cn("flex items-center gap-0.5", className)}
      {...props}
    />
  )
}
