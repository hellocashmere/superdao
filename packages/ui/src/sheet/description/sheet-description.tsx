"use client";

import { Dialog as SheetPrimitive } from "@base-ui/react/dialog";
import { cn } from "@superdao/lib/utils";

export interface SheetDescriptionProps extends SheetPrimitive.Description.Props {}

/**
 * Renders the sheet description component.
 *
 * @see https://base-ui.com/react/components/dialog
 */
export function SheetDescription({ className, ...props }: SheetDescriptionProps) {
  return (
    <SheetPrimitive.Description
      data-slot="sheet-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
}
