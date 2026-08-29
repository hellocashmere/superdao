"use client";

import type { ComponentProps } from "react";

import { cn } from "@superdao/lib/utils";

export interface CardHeaderProps extends ComponentProps<"div"> {}

/**
 * Renders the card header component.
 */
export function CardHeader({ className, ...props }: CardHeaderProps) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "group/card-header @container/card-header grid auto-rows-min items-start gap-1 rounded-t-xl px-(--card-spacing) has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto]",
        className
      )}
      {...props}
    />
  );
}
