"use client";

import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";

export interface DialogCloseProps extends DialogPrimitive.Close.Props {}

/**
 * Renders the dialog close component.
 *
 * @see https://base-ui.com/react/components/dialog
 */
export function DialogClose({ ...props }: DialogCloseProps) {
	return (
		<DialogPrimitive.Close
			data-slot="dialog-close"
			{...props}
		/>
	);
}
