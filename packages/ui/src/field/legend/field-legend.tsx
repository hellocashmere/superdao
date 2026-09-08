import type { ComponentProps } from "react";

import { cn } from "@superdao/lib/utils";

export interface FieldLegendProps extends ComponentProps<"legend"> {
	/**
	 * Selects styling for a fieldset legend or a field label.
	 */
	variant?: "legend" | "label";
}

/**
 * Renders the field legend component.
 */
export function FieldLegend({ className, variant = "legend", ...props }: FieldLegendProps) {
	return (
		<legend
			data-slot="field-legend"
			data-variant={variant}
			className={cn("mb-1.5 font-medium data-[variant=label]:text-sm data-[variant=legend]:text-base", className)}
			{...props}
		/>
	);
}
