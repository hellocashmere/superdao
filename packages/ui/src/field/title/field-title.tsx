"use client";

import type { ComponentProps } from "react";

import { cn } from "@superdao/lib/utils";

export interface FieldTitleProps extends ComponentProps<"div"> {}

/**
 * Renders the field title component.
 */
export function FieldTitle({ className, ...props }: FieldTitleProps) {
  return (
    <div
      data-slot="field-label"
      className={cn(
        "flex w-fit items-center gap-2 text-sm font-medium group-data-[disabled=true]/field:opacity-50",
        className
      )}
      {...props}
    />
  );
}
