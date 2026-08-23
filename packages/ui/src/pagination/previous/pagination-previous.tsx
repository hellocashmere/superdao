import * as React from "react"

import { cn } from "@superdao/ui/lib/utils"

import { ChevronLeftIcon } from "lucide-react"

import { PaginationLink } from "../link/pagination-link"

export interface PaginationPreviousProps extends React.ComponentProps<
  typeof PaginationLink
> {
  text?: string
}

/**
 * Renders the pagination previous component.
 *
 * @see https://react.dev/reference/react/Component
 */
export function PaginationPrevious({
  className,
  text = "Previous",
  ...props
}: PaginationPreviousProps) {
  return (
    <PaginationLink
      aria-label="Go to previous page"
      size="default"
      className={cn("pl-1.5!", className)}
      {...props}
    >
      <ChevronLeftIcon data-icon="inline-start" />
      <span className="hidden sm:block">{text}</span>
    </PaginationLink>
  )
}
