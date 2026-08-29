"use client";

import type { ComponentProps } from "react";

import { cn } from "@superdao/lib/utils";

export interface InputGroupTextProps extends ComponentProps<"span"> {}

/**
 * Renders the input group text component.
 */
export function InputGroupText({ className, ...props }: InputGroupTextProps) {
  return (
    <span
      className={cn(
        "flex items-center gap-2 text-[15px] leading-6 text-muted-foreground [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    />
  );
}
