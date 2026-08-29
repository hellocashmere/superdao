"use client";

import type { ComponentProps } from "react";

import { cn } from "@superdao/lib/utils";

export interface CardDescriptionProps extends ComponentProps<"div"> {}

/**
 * Renders the card description component.
 */
export function CardDescription({ className, ...props }: CardDescriptionProps) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
}
