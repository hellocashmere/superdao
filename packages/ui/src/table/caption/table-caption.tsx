"use client";

import type { ComponentProps } from "react";

import { cn } from "@superdao/lib/utils";

export interface TableCaptionProps extends ComponentProps<"caption"> {}

/**
 * Renders the table caption component.
 */
export function TableCaption({ className, ...props }: TableCaptionProps) {
  return (
    <caption
      data-slot="table-caption"
      className={cn("mt-4 text-sm text-muted-foreground", className)}
      {...props}
    />
  );
}
