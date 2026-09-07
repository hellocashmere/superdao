import type { ComponentProps } from "react";

import { cn } from "@superdao/lib/utils";

export interface TableHeadProps extends ComponentProps<"th"> {}

/**
 * Renders the table head component.
 */
export function TableHead({ className, ...props }: TableHeadProps) {
  return (
    <th
      data-slot="table-head"
      className={cn(
        "h-10 px-2 text-left align-middle font-medium whitespace-nowrap text-foreground [&:has([role=checkbox])]:pr-0",
        className
      )}
      {...props}
    />
  );
}
