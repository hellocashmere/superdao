"use client";

import { Menu as MenuPrimitive } from "@base-ui/react/menu";
import { cn } from "@superdao/lib/utils";

export interface DropdownMenuItemProps extends MenuPrimitive.Item.Props {
	/**
	 * Adds left inset spacing to align the item with labeled menu content.
	 */
	inset?: boolean;

	/**
	 * Selects the item's visual tone.
	 */
	variant?: "default" | "destructive";
}

/**
 * Renders the dropdown menu item component.
 *
 * @see https://base-ui.com/react/components/menu
 */
export function DropdownMenuItem({ className, inset, variant = "default", ...props }: DropdownMenuItemProps) {
	return (
		<MenuPrimitive.Item
			data-slot="dropdown-menu-item"
			data-inset={inset}
			data-variant={variant}
			className={cn(
				"group/dropdown-menu-item relative flex cursor-default items-center gap-1.5 px-4 py-2 text-sm outline-hidden select-none data-highlighted:bg-accent data-highlighted:text-accent-foreground not-data-[variant=destructive]:data-highlighted:**:text-accent-foreground data-inset:pl-7 data-[variant=destructive]:text-destructive data-[variant=destructive]:data-highlighted:bg-destructive/10 data-[variant=destructive]:data-highlighted:text-destructive dark:data-[variant=destructive]:data-highlighted:bg-destructive/20 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 data-[variant=destructive]:*:[svg]:text-destructive",
				className
			)}
			{...props}
		/>
	);
}
