import type { ComponentProps } from "react";

import { cn } from "@superdao/lib/utils";

export interface SidebarHeaderProps extends ComponentProps<"div"> {}

/**
 * Renders the sidebar header component.
 */
export function SidebarHeader({ className, ...props }: SidebarHeaderProps) {
	return (
		<div
			data-slot="sidebar-header"
			data-sidebar="header"
			className={cn("flex shrink-0 flex-col gap-0 p-0", className)}
			{...props}
		/>
	);
}
