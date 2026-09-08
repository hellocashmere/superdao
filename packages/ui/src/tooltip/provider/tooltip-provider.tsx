"use client";

import { Tooltip as TooltipPrimitive } from "@base-ui/react/tooltip";

export interface TooltipProviderProps extends TooltipPrimitive.Provider.Props {}

/**
 * Renders the tooltip provider component.
 *
 * @see https://base-ui.com/react/components/tooltip
 */
export function TooltipProvider({ delay = 0, ...props }: TooltipProviderProps) {
	return (
		<TooltipPrimitive.Provider
			data-slot="tooltip-provider"
			delay={delay}
			{...props}
		/>
	);
}
