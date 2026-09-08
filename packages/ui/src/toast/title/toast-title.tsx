"use client";

import { Toast as ToastPrimitive } from "@base-ui/react/toast";
import { cn } from "@superdao/lib/utils";

export interface ToastTitleProps extends ToastPrimitive.Title.Props {}

/**
 * Renders the toast title component.
 *
 * @see https://base-ui.com/react/components/toast
 */
export function ToastTitle({ className, ...props }: ToastTitleProps) {
	return (
		<ToastPrimitive.Title
			data-slot="toast-title"
			className={cn("text-[15px] leading-6 font-semibold", className)}
			{...props}
		/>
	);
}
