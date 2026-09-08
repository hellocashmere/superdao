"use client";

import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";

export interface DialogTriggerProps extends DialogPrimitive.Trigger.Props {}

/**
 * Renders the dialog trigger component.
 *
 * @see https://base-ui.com/react/components/dialog
 */
export function DialogTrigger({ ...props }: DialogTriggerProps) {
	return (
		<DialogPrimitive.Trigger
			data-slot="dialog-trigger"
			{...props}
		/>
	);
}
