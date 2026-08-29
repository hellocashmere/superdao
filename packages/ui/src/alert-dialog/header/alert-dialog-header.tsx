"use client";

import type { ComponentPropsWithRef } from "react";

import { cn } from "@superdao/lib/utils";

export interface AlertDialogHeaderProps extends ComponentPropsWithRef<"div"> {}

/**
 * Groups the alert-dialog media, title, and description.
 *
 * @see https://base-ui.com/react/components/alert-dialog
 */
export function AlertDialogHeader({ className, ref, ...props }: AlertDialogHeaderProps) {
  return (
    <div
      ref={ref}
      data-slot="alert-dialog-header"
      className={cn(
        "flex flex-col items-start gap-2 rounded-t-xl bg-card px-6 pt-5 pb-4 text-left text-foreground",
        className
      )}
      {...props}
    />
  );
}
