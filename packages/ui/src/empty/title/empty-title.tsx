import type { ComponentProps } from "react";

import { cn } from "@superdao/lib/utils";

export interface EmptyTitleProps extends ComponentProps<"div"> {}

/**
 * Renders the empty title component.
 */
export function EmptyTitle({ className, ...props }: EmptyTitleProps) {
	return (
		<div
			data-slot="empty-title"
			className={cn("font-heading text-2xl font-semibold", className)}
			{...props}
		/>
	);
}
