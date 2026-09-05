"use client";

import type { ComponentPropsWithRef } from "react";

import { cn } from "@superdao/lib/utils";

export interface CardActionProps extends ComponentPropsWithRef<"div"> {}

/**
 * Renders the card action component.
 */
export function CardAction({ className, ref, ...props }: CardActionProps) {
  return (
    <div
      {...props}
      ref={ref}
      data-slot="card-action"
      className={cn("col-start-2 row-span-2 row-start-1 self-start justify-self-end", className)}
    />
  );
}
