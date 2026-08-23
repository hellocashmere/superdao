"use client"

import { Dialog as SheetPrimitive } from "@base-ui/react/dialog"

export interface SheetProps extends SheetPrimitive.Root.Props {}

/**
 * Renders the sheet component.
 *
 * Composition:
 * ```text
 * Sheet
 * ├── SheetTrigger
 * ├── SheetClose
 * ├── SheetContent
 * ├── SheetHeader
 * ├── SheetFooter
 * ├── SheetTitle
 * └── SheetDescription
 * ```
 *
 * @see https://base-ui.com/react/components/dialog
 */
export function Sheet({ ...props }: SheetProps) {
  return (
    <SheetPrimitive.Root
      data-slot="sheet"
      {...props}
    />
  )
}
