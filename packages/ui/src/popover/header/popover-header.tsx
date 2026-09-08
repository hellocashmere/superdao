import type { ComponentProps } from "react";

import { cn } from "@superdao/lib/utils";

export interface PopoverHeaderProps extends ComponentProps<"div"> {}

/**
 * Renders the popover header component.
 *
 * @see https://base-ui.com/react/components/popover
 */
export function PopoverHeader({ className, ...props }: PopoverHeaderProps) {
	return (
		<div
			data-slot="popover-header"
			className={cn("flex flex-col gap-0.5 text-sm", className)}
			{...props}
		/>
	);
}
