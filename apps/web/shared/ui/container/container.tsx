import type { ComponentPropsWithRef } from "react";

import { cn } from "@superdao/lib/utils";

export interface ContainerProps extends ComponentPropsWithRef<"div"> {}

/**
 * Provides a full-width content area with responsive horizontal gutters.
 */
export function Container({ ref, className, ...props }: ContainerProps) {
	return (
		<div
			ref={ref}
			data-slot="container"
			className={cn("w-full min-w-0 px-5 sm:px-8", className)}
			{...props}
		/>
	);
}
