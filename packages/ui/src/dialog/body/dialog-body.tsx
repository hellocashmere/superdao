"use client";

import type { ComponentProps } from "react";

import { cn } from "@superdao/lib/utils";

export interface DialogBodyProps extends ComponentProps<"div"> {}

/**
 * Renders the dialog body component.
 *
 * @see https://base-ui.com/react/components/dialog
 */
export function DialogBody({ className, ...props }: DialogBodyProps) {
  return (
    <div
      data-slot="dialog-body"
      className={cn("bg-card px-6 pt-4 pb-5", className)}
      {...props}
    />
  );
}
