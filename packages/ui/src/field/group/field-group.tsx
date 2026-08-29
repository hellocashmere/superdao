"use client";

import type { ComponentProps } from "react";

import { cn } from "@superdao/lib/utils";

export interface FieldGroupProps extends ComponentProps<"div"> {}

/**
 * Renders the field group component.
 */
export function FieldGroup({ className, ...props }: FieldGroupProps) {
  return (
    <div
      data-slot="field-group"
      className={cn(
        "group/field-group @container/field-group flex w-full flex-col gap-5 data-[slot=checkbox-group]:gap-3 *:data-[slot=field-group]:gap-4",
        className
      )}
      {...props}
    />
  );
}
