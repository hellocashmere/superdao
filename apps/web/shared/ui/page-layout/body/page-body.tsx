import type { ComponentPropsWithRef } from "react";

import { cn } from "@superdao/lib/utils";

export interface PageBodyProps extends ComponentPropsWithRef<"section"> {}

/**
 * Renders the primary page content section.
 */
export function PageBody({ ref, className, ...props }: PageBodyProps) {
	return (
		<section
			ref={ref}
			data-slot="page-body"
			className={cn("min-h-0 flex-1", className)}
			{...props}
		/>
	);
}
