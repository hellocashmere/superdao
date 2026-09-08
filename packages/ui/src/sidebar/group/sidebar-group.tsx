import type { ComponentProps } from "react";

import { cn } from "@superdao/lib/utils";

export interface SidebarGroupProps extends ComponentProps<"div"> {}

/**
 * Renders the sidebar group component.
 */
export function SidebarGroup({ className, ...props }: SidebarGroupProps) {
	return (
		<div
			data-slot="sidebar-group"
			data-sidebar="group"
			className={cn("relative flex w-full min-w-0 flex-col p-0", className)}
			{...props}
		/>
	);
}
