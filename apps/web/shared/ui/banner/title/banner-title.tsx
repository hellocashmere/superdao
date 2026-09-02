"use client";

import type { ComponentPropsWithRef } from "react";

import { cn } from "@superdao/lib/utils";

export interface BannerTitleProps extends ComponentPropsWithRef<"div"> {}

/**
 * Renders the banner title and contains its optional description.
 */
export function BannerTitle({ className, ref, ...props }: BannerTitleProps) {
  return (
    <div
      ref={ref}
      data-slot="banner-title"
      className={cn("min-w-0 flex-1 text-[15px]/6 font-semibold text-foreground", className)}
      {...props}
    />
  );
}
