"use client"

import { Dialog as DialogPrimitive } from "@base-ui/react/dialog"

export interface DialogPortalProps extends DialogPrimitive.Portal.Props {}

/**
 * Renders the dialog portal component.
 *
 * @see https://base-ui.com/react/components/dialog
 */
export function DialogPortal({ ...props }: DialogPortalProps) {
  return (
    <DialogPrimitive.Portal
      data-slot="dialog-portal"
      {...props}
    />
  )
}
