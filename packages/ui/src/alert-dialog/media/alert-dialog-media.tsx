import type { ComponentPropsWithRef } from "react";

import { cn } from "@superdao/lib/utils";

export interface AlertDialogMediaProps extends ComponentPropsWithRef<"div"> {}

/**
 * Displays supporting media above the alert-dialog title.
 *
 * @see https://base-ui.com/react/components/alert-dialog
 */
export function AlertDialogMedia({ ref, className, ...props }: AlertDialogMediaProps) {
	return (
		<div
			ref={ref}
			data-slot="alert-dialog-media"
			className={cn(
				"mb-2 inline-flex size-10 items-center justify-center rounded-md bg-muted *:[svg:not([class*='size-'])]:size-6",
				className
			)}
			{...props}
		/>
	);
}
