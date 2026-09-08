"use client";

import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox";
import { cn } from "@superdao/lib/utils";
import { CheckIcon } from "lucide-react";

export interface CheckboxProps extends CheckboxPrimitive.Root.Props {}

/**
 * Renders the checkbox component.
 *
 * @see https://base-ui.com/react/components/checkbox
 */
export function Checkbox({ ref, className, ...props }: CheckboxProps) {
	return (
		<CheckboxPrimitive.Root
			ref={ref}
			data-slot="checkbox"
			className={cn(
				"peer not-data-disabled:data-unchecked:hover:bg-control-subtle not-data-disabled:data-checked:hover:bg-control-checked-hover not-data-disabled:data-checked:active:bg-control-checked-active relative flex size-4 shrink-0 items-center justify-center rounded-[4px] bg-transparent transition-colors outline-none group-has-[:focus-visible]/field-label:ring-0 after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:ring-3 focus-visible:ring-ring/50 aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 data-checked:bg-primary data-checked:text-primary-foreground data-unchecked:border data-unchecked:border-[#D0DCF566] data-disabled:cursor-not-allowed data-disabled:opacity-100 data-disabled:data-checked:bg-[#D0DCF514] data-disabled:data-unchecked:bg-[#D0DCF514]",
				className
			)}
			{...props}
		>
			<CheckboxPrimitive.Indicator
				data-slot="checkbox-indicator"
				className="grid place-content-center text-current transition-none [&>svg]:size-3.5"
			>
				<CheckIcon />
			</CheckboxPrimitive.Indicator>
		</CheckboxPrimitive.Root>
	);
}
