"use client";

import type { ComponentProps } from "react";

import { cn } from "@superdao/lib/utils";

export interface TableCellProps extends ComponentProps<"td"> {}

/**
 * Renders the table cell component.
 */
export function TableCell({ className, ...props }: TableCellProps) {
  return (
    <td
      data-slot="table-cell"
      className={cn("p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0", className)}
      {...props}
    />
  );
}
