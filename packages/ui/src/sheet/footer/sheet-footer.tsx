import type { ComponentProps } from "react";

import { cn } from "@superdao/lib/utils";

export interface SheetFooterProps extends ComponentProps<"div"> {}

/**
 * Renders the sheet footer component.
 *
 * @see https://base-ui.com/react/components/dialog
 */
export function SheetFooter({ className, ...props }: SheetFooterProps) {
	return (
		<div
			data-slot="sheet-footer"
			className={cn("mt-auto flex flex-col gap-2 p-4", className)}
			{...props}
		/>
	);
}
