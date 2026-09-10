import type { ComponentPropsWithRef } from "react";

import { cn } from "@superdao/lib/utils";

export interface CardProps extends ComponentPropsWithRef<"div"> {
	/**
	 * Controls the horizontal inset used by the card sections.
	 */
	size?: "default" | "sm";
}

/**
 * Renders the card component.
 *
 * Composition:
 * ```text
 * Card
 * ├── CardHeader
 * │   ├── CardTitle
 * │   ├── CardDescription
 * │   └── CardAction
 * ├── CardContent
 * └── CardFooter
 * ```
 */
export function Card({ ref, className, size = "default", ...props }: CardProps) {
	return (
		<div
			ref={ref}
			data-slot="card"
			data-size={size}
			className={cn(
				"group/card flex min-w-0 flex-col overflow-hidden rounded-lg bg-card text-sm text-card-foreground [--card-padding-inline:--spacing(5)] data-[size=sm]:[--card-padding-inline:--spacing(4)] *:[img:first-child]:rounded-t-lg *:[img:last-child]:rounded-b-lg",
				className
			)}
			{...props}
		/>
	);
}
