"use client";

import { Menu as MenuPrimitive } from "@base-ui/react/menu";
import { cn } from "@superdao/lib/utils";
import { ChevronRightIcon } from "lucide-react";

export interface DropdownMenuSubTriggerProps extends MenuPrimitive.SubmenuTrigger.Props {
	/**
	 * Adds left inset spacing to align the trigger with labeled menu content.
	 */
	inset?: boolean;
}

/**
 * Renders the dropdown menu sub trigger component.
 *
 * @see https://base-ui.com/react/components/menu
 */
export function DropdownMenuSubTrigger({ className, inset, children, ...props }: DropdownMenuSubTriggerProps) {
	return (
		<MenuPrimitive.SubmenuTrigger
			data-slot="dropdown-menu-sub-trigger"
			data-inset={inset}
			className={cn(
				"flex cursor-default items-center gap-1.5 px-4 py-2 text-sm outline-hidden select-none data-highlighted:bg-accent data-highlighted:text-accent-foreground data-highlighted:**:text-accent-foreground data-inset:pl-7 data-popup-open:bg-accent data-popup-open:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
				className
			)}
			{...props}
		>
			{children}
			<ChevronRightIcon className="ml-auto" />
		</MenuPrimitive.SubmenuTrigger>
	);
}
