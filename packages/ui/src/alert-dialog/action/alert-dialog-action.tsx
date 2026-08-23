import { cn } from "@superdao/ui/lib/utils"

import type { ButtonProps } from "../../button/button/button"
import { Button } from "../../button/button/button"

export interface AlertDialogActionProps extends ButtonProps {}

/**
 * Performs the confirmed alert-dialog action.
 *
 * @see https://base-ui.com/react/components/alert-dialog
 */
export function AlertDialogAction({
  className,
  ref,
  ...props
}: AlertDialogActionProps) {
  return (
    <Button
      ref={ref}
      data-slot="alert-dialog-action"
      className={cn(className)}
      {...props}
    />
  )
}
