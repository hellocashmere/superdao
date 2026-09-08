import type { ComponentProps } from "react";

import { cn } from "@superdao/lib/utils";

export interface SidebarMenuSubProps extends ComponentProps<"ul"> {}

/**
 * Renders the sidebar menu sub component.
 */
export function SidebarMenuSub({ className, ...props }: SidebarMenuSubProps) {
	return (
		<ul
			data-slot="sidebar-menu-sub"
			data-sidebar="menu-sub"
			className={cn("flex min-w-0 flex-col pb-2 group-data-[collapsible=icon]:hidden", className)}
			{...props}
		/>
	);
}
