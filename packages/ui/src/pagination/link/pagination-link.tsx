import * as React from "react"

import { cn } from "@superdao/ui/lib/utils"

import { Button } from "@superdao/ui/components/button"

export interface PaginationLinkProps
  extends
    Pick<React.ComponentProps<typeof Button>, "size">,
    React.ComponentProps<"a"> {
  isActive?: boolean
}

/**
 * Renders the pagination link component.
 *
 * @see https://react.dev/reference/react/Component
 */
export function PaginationLink({
  className,
  isActive,
  size = "icon",
  ...props
}: PaginationLinkProps) {
  return (
    <Button
      variant={isActive ? "secondary" : "ghost"}
      size={size}
      className={cn(className)}
      nativeButton={false}
      render={
        <a
          aria-current={isActive ? "page" : undefined}
          data-slot="pagination-link"
          data-active={isActive}
          {...props}
        />
      }
    />
  )
}
