"use client";

import type { ComponentProps } from "react";

import { cn } from "@superdao/lib/utils";

export interface TableBodyProps extends ComponentProps<"tbody"> {}

/**
 * Renders the table body component.
 */
export function TableBody({ className, ...props }: TableBodyProps) {
  return (
    <tbody
      data-slot="table-body"
      className={cn(className)}
      {...props}
    />
  );
}
