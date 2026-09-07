import type { ComponentProps } from "react";

import { cn } from "@superdao/lib/utils";

export interface SheetHeaderProps extends ComponentProps<"div"> {}

/**
 * Renders the sheet header component.
 *
 * @see https://base-ui.com/react/components/dialog
 */
export function SheetHeader({ className, ...props }: SheetHeaderProps) {
  return (
    <div
      data-slot="sheet-header"
      className={cn("flex flex-col gap-0.5 p-4", className)}
      {...props}
    />
  );
}
