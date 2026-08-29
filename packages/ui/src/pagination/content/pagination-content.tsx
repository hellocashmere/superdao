"use client";

import type { ComponentProps } from "react";

import { cn } from "@superdao/lib/utils";

export interface PaginationContentProps extends ComponentProps<"ul"> {}

/**
 * Renders the pagination content component.
 */
export function PaginationContent({ className, ...props }: PaginationContentProps) {
  return (
    <ul
      data-slot="pagination-content"
      className={cn("flex items-center gap-0.5", className)}
      {...props}
    />
  );
}
