"use client";

import type { ComponentProps } from "react";

import { cn } from "@superdao/lib/utils";

export interface CardProps extends ComponentProps<"div"> {
  /**
   * Controls the card's spacing scale.
   */
  size?: "default" | "sm";
}

/**
 * Renders the card component.
 *
 * Composition:
 * ```text
 * Card
 * ├── CardHeader
 * ├── CardFooter
 * ├── CardTitle
 * ├── CardAction
 * ├── CardDescription
 * └── CardContent
 * ```
 */
export function Card({ className, size = "default", ...props }: CardProps) {
  return (
    <div
      data-slot="card"
      data-size={size}
      className={cn(
        "group/card flex flex-col gap-(--card-spacing) overflow-hidden rounded-xl bg-card py-(--card-spacing) text-sm text-card-foreground [--card-spacing:--spacing(4)] has-data-[slot=card-footer]:pb-0 has-[>img:first-child]:pt-0 data-[size=sm]:[--card-spacing:--spacing(3)] data-[size=sm]:has-data-[slot=card-footer]:pb-0 *:[img:first-child]:rounded-t-xl *:[img:last-child]:rounded-b-xl",
        className
      )}
      {...props}
    />
  );
}
