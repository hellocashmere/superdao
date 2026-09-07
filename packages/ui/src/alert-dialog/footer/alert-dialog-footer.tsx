import type { ComponentPropsWithRef } from "react";

import { cn } from "@superdao/lib/utils";

export interface AlertDialogFooterProps extends ComponentPropsWithRef<"div"> {}

/**
 * Groups the cancel and confirmation actions.
 *
 * @see https://base-ui.com/react/components/alert-dialog
 */
export function AlertDialogFooter({ className, ref, ...props }: AlertDialogFooterProps) {
  return (
    <div
      ref={ref}
      data-slot="alert-dialog-footer"
      className={cn("flex items-center justify-end gap-5 rounded-b-xl bg-popover px-6 py-4", className)}
      {...props}
    />
  );
}
