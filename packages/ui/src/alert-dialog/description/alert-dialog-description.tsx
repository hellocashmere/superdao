"use client";

import { AlertDialog as AlertDialogPrimitive } from "@base-ui/react/alert-dialog";
import { cn } from "@superdao/lib/utils";

export interface AlertDialogDescriptionProps extends AlertDialogPrimitive.Description.Props {}

/**
 * Describes the consequences of the alert-dialog action.
 *
 * @see https://base-ui.com/react/components/alert-dialog
 */
export function AlertDialogDescription({ ref, className, ...props }: AlertDialogDescriptionProps) {
	return (
		<AlertDialogPrimitive.Description
			ref={ref}
			data-slot="alert-dialog-description"
			className={cn(
				"w-full text-[15px] leading-6 font-normal text-foreground *:[a]:underline *:[a]:underline-offset-3",
				className
			)}
			{...props}
		/>
	);
}
