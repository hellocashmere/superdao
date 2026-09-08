"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cn } from "@superdao/lib/utils";

export interface ButtonGroupTextProps extends useRender.ComponentProps<"div"> {}

/**
 * Renders the button group text component.
 */
export function ButtonGroupText({ className, render, ...props }: ButtonGroupTextProps) {
	return useRender({
		defaultTagName: "div",
		props: mergeProps<"div">(
			{
				className: cn(
					"flex items-center gap-2 rounded-lg bg-muted px-2.5 text-sm font-medium [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4",
					className
				),
			},
			props
		),
		render: render,
		state: {
			slot: "button-group-text",
		},
	});
}
