"use client";

import type { ComponentProps } from "react";

import { Select as SelectPrimitive } from "@base-ui/react/select";
import { cn } from "@superdao/lib/utils";
import { ChevronUpIcon } from "lucide-react";

export interface SelectScrollUpButtonProps extends ComponentProps<typeof SelectPrimitive.ScrollUpArrow> {}

/**
 * Renders the select scroll up button component.
 *
 * @see https://base-ui.com/react/components/select
 */
export function SelectScrollUpButton({ className, ...props }: SelectScrollUpButtonProps) {
	return (
		<SelectPrimitive.ScrollUpArrow
			data-slot="select-scroll-up-button"
			className={cn(
				"top-0 z-10 flex w-full cursor-default items-center justify-center bg-popover py-1 [&_svg:not([class*='size-'])]:size-4",
				className
			)}
			{...props}
		>
			<ChevronUpIcon />
		</SelectPrimitive.ScrollUpArrow>
	);
}
