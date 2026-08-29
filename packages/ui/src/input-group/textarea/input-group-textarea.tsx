"use client";

import type { ComponentProps } from "react";

import { cn } from "@superdao/lib/utils";
import { Textarea } from "@superdao/ui/components/textarea";

export interface InputGroupTextareaProps extends ComponentProps<"textarea"> {}

/**
 * Renders the input group textarea component.
 */
export function InputGroupTextarea({ className, ...props }: InputGroupTextareaProps) {
  return (
    <Textarea
      data-slot="input-group-control"
      className={cn(
        "flex-1 resize-none rounded-none bg-transparent py-2 shadow-none ring-0 hover:not-focus-visible:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 disabled:bg-transparent aria-invalid:bg-transparent aria-invalid:ring-0",
        className
      )}
      {...props}
    />
  );
}
