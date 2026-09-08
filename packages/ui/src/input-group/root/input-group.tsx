import type { ComponentProps } from "react";

import { cn } from "@superdao/lib/utils";

export type InputGroupVariant = "default" | "sidebar-search-field" | "sidebar-search-trigger";

export interface InputGroupProps extends ComponentProps<"div"> {
	/**
	 * Selects the input group's visual treatment.
	 */
	variant?: InputGroupVariant;
}

/**
 * Renders the input group component.
 *
 * Composition:
 * ```text
 * InputGroup
 * ├── InputGroupAddon
 * ├── InputGroupButton
 * ├── InputGroupText
 * ├── InputGroupInput
 * └── InputGroupTextarea
 * ```
 */
export function InputGroup({ className, variant = "default", ...props }: InputGroupProps) {
	return (
		<div
			data-slot="input-group"
			data-variant={variant}
			role="group"
			className={cn(
				"group/input-group relative flex h-10 w-full min-w-0 items-center rounded-lg bg-field text-foreground transition-[background-color,color,box-shadow] duration-150 outline-none focus-within:bg-field hover:not-focus-within:bg-field-hover in-data-[slot=combobox-content]:focus-within:ring-0 has-disabled:bg-field-hover has-disabled:text-field-disabled-foreground has-[[data-slot=input-group-control]:focus-visible]:ring-2 has-[[data-slot=input-group-control]:focus-visible]:ring-ring/40 has-[[data-slot][aria-invalid=true]]:bg-field has-[>[data-align=block-end]]:h-auto has-[>[data-align=block-end]]:flex-col has-[>[data-align=block-start]]:h-auto has-[>[data-align=block-start]]:flex-col has-[>textarea]:h-auto data-[variant=sidebar-search-field]:h-9 data-[variant=sidebar-search-field]:bg-secondary data-[variant=sidebar-search-field]:focus-within:bg-secondary-hover data-[variant=sidebar-search-field]:hover:not-focus-within:bg-secondary-hover data-[variant=sidebar-search-field]:has-[[data-slot=input-group-control]:focus-visible]:ring-0 data-[variant=sidebar-search-trigger]:h-9 data-[variant=sidebar-search-trigger]:bg-field data-[variant=sidebar-search-trigger]:focus-within:bg-field-hover data-[variant=sidebar-search-trigger]:hover:not-focus-within:bg-field-hover data-[variant=sidebar-search-trigger]:has-[[data-slot=input-group-control]:focus-visible]:ring-0 data-[variant^=sidebar-search]:[&_[data-slot=button]:hover]:text-foreground data-[variant^=sidebar-search]:[&>[data-align=inline-start]]:pl-3 data-[variant^=sidebar-search]:[&>[data-slot=input-group-addon]]:text-muted-foreground data-[variant^=sidebar-search]:focus-within:[&>[data-slot=input-group-addon]]:text-muted-foreground data-[variant^=sidebar-search]:hover:[&>[data-slot=input-group-addon]]:text-muted-foreground data-[variant^=sidebar-search]:[&>[data-slot=input-group-control]]:h-full data-[variant^=sidebar-search]:[&>[data-slot=input-group-control]]:text-sm/5 has-[>[data-align=block-end]]:[&>input]:pt-3 has-[>[data-align=block-start]]:[&>input]:pb-3 has-[>[data-align=inline-end]]:[&>input]:pr-2 has-[>[data-align=inline-start]]:[&>input]:pl-2 data-[variant^=sidebar-search]:[&>input::-webkit-search-cancel-button]:appearance-none",
				className
			)}
			{...props}
		/>
	);
}
