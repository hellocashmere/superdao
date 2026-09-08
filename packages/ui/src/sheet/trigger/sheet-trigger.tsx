"use client";

import { Dialog as SheetPrimitive } from "@base-ui/react/dialog";

export interface SheetTriggerProps extends SheetPrimitive.Trigger.Props {}

/**
 * Renders the sheet trigger component.
 *
 * @see https://base-ui.com/react/components/dialog
 */
export function SheetTrigger({ ...props }: SheetTriggerProps) {
	return (
		<SheetPrimitive.Trigger
			data-slot="sheet-trigger"
			{...props}
		/>
	);
}
