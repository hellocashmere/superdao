"use client";

import type { ComponentProps } from "react";

import { cn } from "@superdao/lib/utils";

export interface CardTitleProps extends ComponentProps<"div"> {}

/**
 * Renders the card title component.
 */
export function CardTitle({ className, ...props }: CardTitleProps) {
  return (
    <div
      data-slot="card-title"
      className={cn("font-heading text-base leading-snug font-medium group-data-[size=sm]/card:text-sm", className)}
      {...props}
    />
  );
}
