"use client";

import type { ComponentProps } from "react";

import { cn } from "@superdao/lib/utils";

export interface CardFooterProps extends ComponentProps<"div"> {}

/**
 * Renders the card footer component.
 */
export function CardFooter({ className, ...props }: CardFooterProps) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center rounded-b-xl bg-muted/50 p-(--card-spacing)", className)}
      {...props}
    />
  );
}
