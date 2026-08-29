"use client";

import { AlertDialog as AlertDialogPrimitive } from "@base-ui/react/alert-dialog";

export interface AlertDialogPortalProps extends AlertDialogPrimitive.Portal.Props {}

/**
 * Portals an alert-dialog layer outside its parent stacking context.
 *
 * @see https://base-ui.com/react/components/alert-dialog
 */
export function AlertDialogPortal(props: AlertDialogPortalProps) {
  return (
    <AlertDialogPrimitive.Portal
      data-slot="alert-dialog-portal"
      {...props}
    />
  );
}
