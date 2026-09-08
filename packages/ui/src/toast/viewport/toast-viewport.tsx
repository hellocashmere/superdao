"use client";

import { Toast as ToastPrimitive } from "@base-ui/react/toast";
import { cn } from "@superdao/lib/utils";

export interface ToastViewportProps extends ToastPrimitive.Viewport.Props {}

/**
 * Renders the toast viewport component.
 *
 * @see https://base-ui.com/react/components/toast
 */
export function ToastViewport({ className, ...props }: ToastViewportProps) {
	return (
		<ToastPrimitive.Viewport
			data-slot="toast-viewport"
			className={cn(
				"pointer-events-none fixed inset-x-4 bottom-4 z-50 mx-auto w-auto max-w-sm outline-none sm:right-4 sm:left-auto sm:mx-0 sm:w-full",
				className
			)}
			{...props}
		/>
	);
}
