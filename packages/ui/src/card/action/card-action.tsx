"use client";

import type { ComponentProps } from "react";

import { cn } from "@superdao/lib/utils";

export interface CardActionProps extends ComponentProps<"div"> {}

/**
 * Renders the card action component.
 */
export function CardAction({ className, ...props }: CardActionProps) {
  return (
    <div
      data-slot="card-action"
      className={cn("col-start-2 row-span-2 row-start-1 self-start justify-self-end", className)}
      {...props}
    />
  );
}
