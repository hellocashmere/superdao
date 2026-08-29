"use client";

import { AlertDialog as AlertDialogPrimitive } from "@base-ui/react/alert-dialog";

import type { ButtonProps } from "../../button/button/button";
import { Button } from "../../button/button/button";

export interface AlertDialogCancelProps extends AlertDialogPrimitive.Close.Props {
  /**
   * Visual treatment inherited from Button.
   */
  variant?: ButtonProps["variant"];

  /**
   * Size inherited from Button.
   */
  size?: ButtonProps["size"];
}

/**
 * Closes the alert dialog without confirming its action.
 *
 * @see https://base-ui.com/react/components/alert-dialog
 */
export function AlertDialogCancel({ ref, variant = "ghost", size = "default", ...props }: AlertDialogCancelProps) {
  return (
    <AlertDialogPrimitive.Close
      ref={ref}
      data-slot="alert-dialog-cancel"
      render={
        <Button
          variant={variant}
          size={size}
        />
      }
      {...props}
    />
  );
}
