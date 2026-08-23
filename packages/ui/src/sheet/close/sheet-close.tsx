"use client"

import { Dialog as SheetPrimitive } from "@base-ui/react/dialog"

export interface SheetCloseProps extends SheetPrimitive.Close.Props {}

/**
 * Renders the sheet close component.
 *
 * @see https://base-ui.com/react/components/dialog
 */
export function SheetClose({ ...props }: SheetCloseProps) {
  return (
    <SheetPrimitive.Close
      data-slot="sheet-close"
      {...props}
    />
  )
}
