"use client";

import { Radio as RadioPrimitive } from "@base-ui/react/radio";
import { cn } from "@superdao/lib/utils";

export interface RadioGroupItemProps extends RadioPrimitive.Root.Props {}

/**
 * Renders the radio group item component.
 *
 * @see https://base-ui.com/react/components/radio-group
 */
export function RadioGroupItem({ ref, className, ...props }: RadioGroupItemProps) {
	return (
		<RadioPrimitive.Root
			ref={ref}
			data-slot="radio-group-item"
			className={cn(
				"group/radio-group-item peer not-data-disabled:data-unchecked:hover:bg-control-subtle not-data-disabled:data-checked:hover:bg-control-checked-hover not-data-disabled:data-checked:active:bg-control-checked-active relative flex aspect-square size-4 shrink-0 rounded-full bg-transparent transition-colors outline-none group-has-[:focus-visible]/field-label:ring-0 after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:ring-3 focus-visible:ring-ring/50 aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 data-checked:bg-primary data-checked:text-primary-foreground data-unchecked:border data-unchecked:border-[#D0DCF566] data-disabled:cursor-not-allowed data-disabled:opacity-100 data-disabled:data-checked:bg-[#D0DCF514] data-disabled:data-unchecked:bg-[#D0DCF514]",
				className
			)}
			{...props}
		>
			<RadioPrimitive.Indicator
				data-slot="radio-group-indicator"
				className="flex size-4 items-center justify-center"
			>
				<span className="absolute top-1/2 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-foreground" />
			</RadioPrimitive.Indicator>
		</RadioPrimitive.Root>
	);
}
