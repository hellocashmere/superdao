"use client";

import type { ComponentProps } from "react";

import { cn } from "@superdao/lib/utils";

export interface EmptyDescriptionProps extends ComponentProps<"p"> {}

/**
 * Renders the empty description component.
 */
export function EmptyDescription({ className, ...props }: EmptyDescriptionProps) {
  return (
    <div
      data-slot="empty-description"
      className={cn(
        "text-sm/relaxed text-muted-foreground [&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:text-primary",
        className
      )}
      {...props}
    />
  );
}
