"use client";

import { Menu as MenuPrimitive } from "@base-ui/react/menu";

export interface DropdownMenuTriggerProps extends MenuPrimitive.Trigger.Props {}

/**
 * Renders the dropdown menu trigger component.
 *
 * @see https://base-ui.com/react/components/menu
 */
export function DropdownMenuTrigger({ ...props }: DropdownMenuTriggerProps) {
	return (
		<MenuPrimitive.Trigger
			data-slot="dropdown-menu-trigger"
			{...props}
		/>
	);
}
