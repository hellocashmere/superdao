import type { ComponentPropsWithRef } from "react";

import { cn } from "@superdao/lib/utils";

export interface FieldLabelProps extends ComponentPropsWithRef<"label"> {}

/**
 * Renders the field label component.
 */
export function FieldLabel({ ref, className, ...props }: FieldLabelProps) {
	return (
		<label
			ref={ref}
			data-slot="field-label"
			className={cn(
				"group/field-label peer/field-label flex w-fit items-center gap-2 text-sm leading-snug font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 group-data-[disabled=true]/field:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50 has-data-checked:bg-primary/5 has-[>[data-slot=field]]:rounded-lg has-[>[data-slot=field]]:not-has-[:disabled,[data-disabled]]:hover:bg-muted/50 has-[>[data-slot=field]]:has-[:focus-visible]:ring-3 has-[>[data-slot=field]]:has-[:focus-visible]:ring-ring/50 *:data-[slot=field]:p-2.5 dark:has-data-checked:bg-primary/10",
				"has-[>[data-slot=field]]:w-full has-[>[data-slot=field]]:flex-col",
				className
			)}
			{...props}
		/>
	);
}
