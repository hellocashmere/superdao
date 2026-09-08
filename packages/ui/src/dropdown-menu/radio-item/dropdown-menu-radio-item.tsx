"use client";

import { Menu as MenuPrimitive } from "@base-ui/react/menu";
import { cn } from "@superdao/lib/utils";
import { CheckIcon } from "lucide-react";

export interface DropdownMenuRadioItemProps extends MenuPrimitive.RadioItem.Props {
	/**
	 * Adds left inset spacing to align the item with labeled menu content.
	 */
	inset?: boolean;
}

/**
 * Renders the dropdown menu radio item component.
 *
 * @see https://base-ui.com/react/components/menu
 */
export function DropdownMenuRadioItem({ className, children, inset, ...props }: DropdownMenuRadioItemProps) {
	return (
		<MenuPrimitive.RadioItem
			data-slot="dropdown-menu-radio-item"
			data-inset={inset}
			className={cn(
				"relative flex cursor-default items-center gap-1.5 px-4 py-2 text-sm outline-hidden select-none data-highlighted:bg-accent data-highlighted:text-accent-foreground data-highlighted:**:text-accent-foreground data-inset:pl-7 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
				className
			)}
			{...props}
		>
			<span
				className="pointer-events-none absolute right-4 flex items-center justify-center"
				data-slot="dropdown-menu-radio-item-indicator"
			>
				<MenuPrimitive.RadioItemIndicator>
					<CheckIcon />
				</MenuPrimitive.RadioItemIndicator>
			</span>
			{children}
		</MenuPrimitive.RadioItem>
	);
}
