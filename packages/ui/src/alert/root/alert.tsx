"use client";

import type { ComponentPropsWithRef } from "react";

import { cn } from "@superdao/lib/utils";

export type AlertVariant = "constructive" | "destructive" | "info" | "warning";

export interface AlertProps extends ComponentPropsWithRef<"div"> {
  /**
   * Sets the semantic tone of the alert.
   */
  variant?: AlertVariant;
}

/**
 * Renders a semantic status message with optional icon and action content.
 */
export function Alert({ className, ref, variant = "info", ...props }: AlertProps) {
  return (
    <div
      ref={ref}
      data-slot="alert"
      data-variant={variant}
      role="alert"
      className={cn(
        "group/alert relative grid w-full gap-0.5 rounded-lg px-2.5 py-2 text-left text-sm has-data-[slot=alert-action]:pr-18 has-[>svg]:grid-cols-[auto_1fr] has-[>svg]:gap-x-2 *:[svg]:row-span-2 *:[svg]:translate-y-0.5 *:[svg]:text-current *:[svg:not([class*='size-'])]:size-4",
        "data-[variant=info]:bg-info/15 data-[variant=info]:text-info",
        "data-[variant=destructive]:bg-destructive/15 data-[variant=destructive]:text-destructive",
        "data-[variant=constructive]:bg-constructive/15 data-[variant=constructive]:text-constructive",
        "data-[variant=warning]:bg-warning/15 data-[variant=warning]:text-warning",
        className
      )}
      {...props}
    />
  );
}
