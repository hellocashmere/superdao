"use client";

import { AlertDialog as AlertDialogPrimitive } from "@base-ui/react/alert-dialog";

export interface AlertDialogTriggerProps extends AlertDialogPrimitive.Trigger.Props {}

/**
 * Opens its associated alert dialog.
 *
 * @see https://base-ui.com/react/components/alert-dialog
 */
export function AlertDialogTrigger({ ref, ...props }: AlertDialogTriggerProps) {
	return (
		<AlertDialogPrimitive.Trigger
			ref={ref}
			data-slot="alert-dialog-trigger"
			{...props}
		/>
	);
}
