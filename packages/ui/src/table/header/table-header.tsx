"use client";

import type { ComponentProps } from "react";

import { cn } from "@superdao/lib/utils";

export interface TableHeaderProps extends ComponentProps<"thead"> {}

/**
 * Renders the table header component.
 */
export function TableHeader({ className, ...props }: TableHeaderProps) {
  return (
    <thead
      data-slot="table-header"
      className={cn(className)}
      {...props}
    />
  );
}
