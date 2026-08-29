"use client";

import type { ComponentProps } from "react";

import { cn } from "@superdao/lib/utils";

export interface CardContentProps extends ComponentProps<"div"> {}

/**
 * Renders the card content component.
 */
export function CardContent({ className, ...props }: CardContentProps) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-(--card-spacing)", className)}
      {...props}
    />
  );
}
