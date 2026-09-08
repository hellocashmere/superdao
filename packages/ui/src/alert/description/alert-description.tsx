import type { ComponentPropsWithRef } from "react";

import { cn } from "@superdao/lib/utils";

export interface AlertDescriptionProps extends ComponentPropsWithRef<"div"> {}

/**
 * Renders supporting alert details.
 */
export function AlertDescription({ ref, className, ...props }: AlertDescriptionProps) {
	return (
		<div
			ref={ref}
			data-slot="alert-description"
			className={cn(
				"text-sm text-balance text-current/80 md:text-pretty [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground [&_p:not(:last-child)]:mb-4",
				className
			)}
			{...props}
		/>
	);
}
