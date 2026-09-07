import type { ButtonProps } from "../../button";
import { Button } from "../../button";

export interface AlertDialogActionProps extends ButtonProps {}

/**
 * Performs the confirmed alert-dialog action.
 *
 * @see https://base-ui.com/react/components/alert-dialog
 */
export function AlertDialogAction({ ref, ...props }: AlertDialogActionProps) {
  return (
    <Button
      ref={ref}
      data-slot="alert-dialog-action"
      {...props}
    />
  );
}
