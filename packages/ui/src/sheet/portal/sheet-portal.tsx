"use client";

import { Dialog as SheetPrimitive } from "@base-ui/react/dialog";

export interface SheetPortalProps extends SheetPrimitive.Portal.Props {}

/**
 * Renders the portal container for sheet content.
 */
export function SheetPortal({ ...props }: SheetPortalProps) {
	return (
		<SheetPrimitive.Portal
			data-slot="sheet-portal"
			{...props}
		/>
	);
}
