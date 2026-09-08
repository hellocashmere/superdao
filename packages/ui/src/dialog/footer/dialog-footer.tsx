"use client";

import type { ComponentProps } from "react";

import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import { cn } from "@superdao/lib/utils";
import { Button } from "@superdao/ui/components/button";

export interface DialogFooterProps extends ComponentProps<"div"> {
	/**
	 * Displays a close button alongside the footer actions.
	 */
	showCloseButton?: boolean;
}

/**
 * Renders the dialog footer component.
 *
 * @see https://base-ui.com/react/components/dialog
 */
export function DialogFooter({ className, showCloseButton = false, children, ...props }: DialogFooterProps) {
	return (
		<div
			data-slot="dialog-footer"
			className={cn("flex items-center justify-end gap-5 rounded-b-xl bg-popover px-6 py-4", className)}
			{...props}
		>
			{showCloseButton && <DialogPrimitive.Close render={<Button variant="ghost" />}>Close</DialogPrimitive.Close>}
			{children}
		</div>
	);
}
