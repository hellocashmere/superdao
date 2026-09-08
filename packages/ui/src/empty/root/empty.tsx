import type { ComponentProps } from "react";

import { cn } from "@superdao/lib/utils";

export interface EmptyProps extends ComponentProps<"div"> {}

/**
 * Renders the empty component.
 *
 * Composition:
 * ```text
 * Empty
 * ├── EmptyHeader
 * ├── EmptyTitle
 * ├── EmptyDescription
 * ├── EmptyContent
 * └── EmptyMedia
 * ```
 */
export function Empty({ className, ...props }: EmptyProps) {
	return (
		<div
			data-slot="empty"
			className={cn(
				"flex w-full min-w-0 flex-1 flex-col items-center justify-center gap-4 rounded-xl p-6 text-center text-balance",
				className
			)}
			{...props}
		/>
	);
}
