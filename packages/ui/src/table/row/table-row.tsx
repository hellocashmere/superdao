"use client";

import type { ComponentProps } from "react";

import { cn } from "@superdao/lib/utils";

export interface TableRowProps extends ComponentProps<"tr"> {}

/**
 * Renders the table row component.
 */
export function TableRow({ className, ...props }: TableRowProps) {
  return (
    <tr
      data-slot="table-row"
      className={cn(
        "transition-colors hover:bg-muted/50 has-aria-expanded:bg-muted/50 data-[state=selected]:bg-muted",
        className
      )}
      {...props}
    />
  );
}
