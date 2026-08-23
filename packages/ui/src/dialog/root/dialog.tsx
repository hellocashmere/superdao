"use client"

import { Dialog as DialogPrimitive } from "@base-ui/react/dialog"

export interface DialogProps extends DialogPrimitive.Root.Props {}

/**
 * Renders the dialog component.
 *
 * Composition:
 * ```text
 * Dialog
 * ├── DialogClose
 * ├── DialogBody
 * ├── DialogContent
 * ├── DialogDescription
 * ├── DialogFooter
 * ├── DialogHeader
 * ├── DialogOverlay
 * ├── DialogPortal
 * ├── DialogTitle
 * └── DialogTrigger
 * ```
 *
 * @see https://base-ui.com/react/components/dialog
 */
export function Dialog({ ...props }: DialogProps) {
  return (
    <DialogPrimitive.Root
      data-slot="dialog"
      {...props}
    />
  )
}
