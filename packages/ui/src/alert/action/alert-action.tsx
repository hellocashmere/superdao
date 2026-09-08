import type { ComponentPropsWithRef } from "react";

import { cn } from "@superdao/lib/utils";

export interface AlertActionProps extends ComponentPropsWithRef<"div"> {}

/**
 * Positions contextual actions within an alert.
 */
export function AlertAction({ ref, className, ...props }: AlertActionProps) {
	return (
		<div
			ref={ref}
			data-slot="alert-action"
			className={cn("absolute top-2 right-2", className)}
			{...props}
		/>
	);
}
