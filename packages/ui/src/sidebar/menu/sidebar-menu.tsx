import type { ComponentProps } from "react";

import { cn } from "@superdao/lib/utils";

export interface SidebarMenuProps extends ComponentProps<"ul"> {}

/**
 * Renders the sidebar menu component.
 */
export function SidebarMenu({ className, ...props }: SidebarMenuProps) {
	return (
		<ul
			data-slot="sidebar-menu"
			data-sidebar="menu"
			className={cn("flex w-full min-w-0 flex-col", className)}
			{...props}
		/>
	);
}
