"use client";

import type { ComponentPropsWithRef } from "react";

import { cn } from "@superdao/lib/utils";

export interface BannerDescriptionProps extends ComponentPropsWithRef<"div"> {}

/**
 * Renders optional supporting copy below the banner title.
 */
export function BannerDescription({ className, ref, ...props }: BannerDescriptionProps) {
  return (
    <div
      ref={ref}
      data-slot="banner-description"
      className={cn("text-sm/5 font-normal text-muted-foreground", className)}
      {...props}
    />
  );
}
