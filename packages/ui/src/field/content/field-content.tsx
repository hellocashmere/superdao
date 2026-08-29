"use client";

import type { ComponentProps } from "react";

import { cn } from "@superdao/lib/utils";

export interface FieldContentProps extends ComponentProps<"div"> {}

/**
 * Renders the field content component.
 */
export function FieldContent({ className, ...props }: FieldContentProps) {
  return (
    <div
      data-slot="field-content"
      className={cn("group/field-content flex flex-1 flex-col gap-0.5 leading-snug", className)}
      {...props}
    />
  );
}
