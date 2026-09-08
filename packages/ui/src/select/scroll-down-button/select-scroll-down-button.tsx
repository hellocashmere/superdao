"use client";

import type { ComponentProps } from "react";

import { Select as SelectPrimitive } from "@base-ui/react/select";
import { cn } from "@superdao/lib/utils";
import { ChevronDownIcon } from "lucide-react";

export interface SelectScrollDownButtonProps extends ComponentProps<typeof SelectPrimitive.ScrollDownArrow> {}

/**
 * Renders the select scroll down button component.
 *
 * @see https://base-ui.com/react/components/select
 */
export function SelectScrollDownButton({ className, ...props }: SelectScrollDownButtonProps) {
	return (
		<SelectPrimitive.ScrollDownArrow
			data-slot="select-scroll-down-button"
			className={cn(
				"bottom-0 z-10 flex w-full cursor-default items-center justify-center bg-popover py-1 [&_svg:not([class*='size-'])]:size-4",
				className
			)}
			{...props}
		>
			<ChevronDownIcon />
		</SelectPrimitive.ScrollDownArrow>
	);
}
