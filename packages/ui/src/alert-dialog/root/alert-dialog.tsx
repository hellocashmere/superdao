"use client";

import { AlertDialog as AlertDialogPrimitive } from "@base-ui/react/alert-dialog";

export interface AlertDialogProps extends AlertDialogPrimitive.Root.Props {}

/**
 * Coordinates an accessible confirmation dialog.
 *
 * Composition:
 * ```text
 * AlertDialog
 * ├── AlertDialogTrigger
 * └── AlertDialogContent
 *     ├── AlertDialogHeader
 *     │   ├── AlertDialogMedia
 *     │   ├── AlertDialogTitle
 *     │   └── AlertDialogDescription
 *     └── AlertDialogFooter
 *         ├── AlertDialogCancel
 *         └── AlertDialogAction
 * ```
 *
 * @see https://base-ui.com/react/components/alert-dialog
 */
export function AlertDialog(props: AlertDialogProps) {
	return (
		<AlertDialogPrimitive.Root
			data-slot="alert-dialog"
			{...props}
		/>
	);
}
