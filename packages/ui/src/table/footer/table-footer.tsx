import type { ComponentProps } from "react";

import { cn } from "@superdao/lib/utils";

export interface TableFooterProps extends ComponentProps<"tfoot"> {}

/**
 * Renders the table footer component.
 */
export function TableFooter({ className, ...props }: TableFooterProps) {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn("bg-muted/50 font-medium", className)}
      {...props}
    />
  );
}
