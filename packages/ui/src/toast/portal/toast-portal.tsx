"use client";

import { Toast as ToastPrimitive } from "@base-ui/react/toast";

export interface ToastPortalProps extends ToastPrimitive.Portal.Props {}

/**
 * Renders the toast portal component.
 *
 * @see https://base-ui.com/react/components/toast
 */
export function ToastPortal({ ...props }: ToastPortalProps) {
	return (
		<ToastPrimitive.Portal
			data-slot="toast-portal"
			{...props}
		/>
	);
}
