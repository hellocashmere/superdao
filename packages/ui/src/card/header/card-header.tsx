import type { ComponentPropsWithRef } from "react";

import { cn } from "@superdao/lib/utils";

export interface CardHeaderProps extends ComponentPropsWithRef<"div"> {}

/**
 * Renders the card header component.
 */
export function CardHeader({ ref, className, ...props }: CardHeaderProps) {
	return (
		<div
			{...props}
			ref={ref}
			data-slot="card-header"
			className={cn(
				"group/card-header @container/card-header grid auto-rows-min items-start gap-1 rounded-t-lg px-(--card-padding-inline) pt-3 has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto]",
				className
			)}
		/>
	);
}
