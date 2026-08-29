"use client";

import { Dialog as SheetPrimitive } from "@base-ui/react/dialog";
import { cn } from "@superdao/lib/utils";

export interface SheetTitleProps extends SheetPrimitive.Title.Props {}

/**
 * Renders the sheet title component.
 *
 * @see https://base-ui.com/react/components/dialog
 */
export function SheetTitle({ className, ...props }: SheetTitleProps) {
  return (
    <SheetPrimitive.Title
      data-slot="sheet-title"
      className={cn("font-heading text-base font-medium text-foreground", className)}
      {...props}
    />
  );
}
