"use client";

import type { ComponentProps } from "react";

import { cn } from "@superdao/lib/utils";

export interface SkeletonProps extends ComponentProps<"div"> {}

/**
 * Renders the skeleton component.
 */
export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      data-slot="skeleton"
      className={cn("rounded-md bg-skeleton", className)}
      {...props}
    />
  );
}
