import type { ComponentProps } from "react";

export interface PaginationItemProps extends ComponentProps<"li"> {}

/**
 * Renders the pagination item component.
 */
export function PaginationItem({ ...props }: PaginationItemProps) {
  return (
    <li
      data-slot="pagination-item"
      {...props}
    />
  );
}
