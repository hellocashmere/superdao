"use client";

import { Tooltip as TooltipPrimitive } from "@base-ui/react/tooltip";

export interface TooltipProps extends TooltipPrimitive.Root.Props {}

/**
 * Renders the tooltip component.
 *
 * Composition:
 * ```text
 * Tooltip
 * ├── TooltipTrigger
 * ├── TooltipContent
 * └── TooltipProvider
 * ```
 *
 * @see https://base-ui.com/react/components/tooltip
 */
export function Tooltip({ ...props }: TooltipProps) {
	return (
		<TooltipPrimitive.Root
			data-slot="tooltip"
			{...props}
		/>
	);
}
