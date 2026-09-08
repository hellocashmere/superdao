import type { ComponentPropsWithRef } from "react";

import { cn } from "@superdao/lib/utils";

export interface CardDescriptionProps extends ComponentPropsWithRef<"div"> {}

/**
 * Renders the card description component.
 */
export function CardDescription({ ref, className, ...props }: CardDescriptionProps) {
	return (
		<div
			{...props}
			ref={ref}
			data-slot="card-description"
			className={cn("text-[13px]/[18px] text-muted-foreground", className)}
		/>
	);
}
