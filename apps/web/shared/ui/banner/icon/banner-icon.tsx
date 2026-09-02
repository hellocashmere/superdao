"use client";

import type { ComponentPropsWithRef } from "react";

import { cn } from "@superdao/lib/utils";

export interface BannerIconProps extends ComponentPropsWithRef<"div"> {}

/**
 * Renders the banner's leading visual in a fixed-size container.
 */
export function BannerIcon({ className, ref, ...props }: BannerIconProps) {
  return (
    <div
      ref={ref}
      aria-hidden="true"
      data-slot="banner-icon"
      className={cn("flex size-10 shrink-0 items-center justify-center overflow-hidden", className)}
      {...props}
    />
  );
}
