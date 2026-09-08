"use client";

import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import { cn } from "@superdao/lib/utils";
import { Button } from "@superdao/ui/components/button";
import { XIcon } from "lucide-react";

import { DialogOverlay } from "../overlay/dialog-overlay";
import { DialogPortal } from "../portal/dialog-portal";

export interface DialogContentProps extends DialogPrimitive.Popup.Props {
	/**
	 * Displays a close button in the dialog content.
	 */
	showCloseButton?: boolean;
}

/**
 * Renders the dialog content component.
 *
 * @see https://base-ui.com/react/components/dialog
 */
export function DialogContent({ className, children, showCloseButton = false, ...props }: DialogContentProps) {
	return (
		<DialogPortal>
			<DialogOverlay />
			<DialogPrimitive.Popup
				data-slot="dialog-content"
				className={cn(
					"fixed top-1/2 left-1/2 z-50 flex w-full max-w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-xl bg-card text-card-foreground duration-100 outline-none sm:max-w-[400px] data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
					className
				)}
				{...props}
			>
				{children}
				{showCloseButton && (
					<DialogPrimitive.Close
						data-slot="dialog-close"
						render={
							<Button
								variant="ghost"
								className="absolute top-2 right-2"
								size="icon-sm"
							/>
						}
					>
						<XIcon />
						<span className="sr-only">Close</span>
					</DialogPrimitive.Close>
				)}
			</DialogPrimitive.Popup>
		</DialogPortal>
	);
}
