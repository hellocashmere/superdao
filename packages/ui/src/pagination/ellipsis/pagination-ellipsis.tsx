import * as React from "react"

import { cn } from "@superdao/ui/lib/utils"

import { MoreHorizontalIcon } from "lucide-react"

export interface PaginationEllipsisProps extends React.ComponentProps<"span"> {}

/**
 * Renders the pagination ellipsis component.
 *
 * @see https://react.dev/reference/react/Component
 */
export function PaginationEllipsis({
  className,
  ...props
}: PaginationEllipsisProps) {
  return (
    <span
      aria-hidden
      data-slot="pagination-ellipsis"
      className={cn(
        "flex size-8 items-center justify-center [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      <MoreHorizontalIcon />
      <span className="sr-only">More pages</span>
    </span>
  )
}
