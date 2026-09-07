import type { ComponentProps } from "react";

import { cn } from "@superdao/lib/utils";

export interface TableProps extends ComponentProps<"table"> {}

/**
 * Renders the table component.
 *
 * Composition:
 * ```text
 * Table
 * ├── TableHeader
 * ├── TableBody
 * ├── TableFooter
 * ├── TableHead
 * ├── TableRow
 * ├── TableCell
 * └── TableCaption
 * ```
 */
export function Table({ className, ...props }: TableProps) {
  return (
    <div
      data-slot="table-container"
      className="relative w-full overflow-x-auto"
    >
      <table
        data-slot="table"
        className={cn("w-full caption-bottom text-sm", className)}
        {...props}
      />
    </div>
  );
}
