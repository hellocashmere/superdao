import * as React from "react"

export interface PaginationItemProps extends React.ComponentProps<"li"> {}

/**
 * Renders the pagination item component.
 *
 * @see https://react.dev/reference/react/Component
 */
export function PaginationItem({ ...props }: PaginationItemProps) {
  return (
    <li
      data-slot="pagination-item"
      {...props}
    />
  )
}
