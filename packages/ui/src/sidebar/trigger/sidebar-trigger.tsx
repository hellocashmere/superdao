"use client";

import type { ComponentProps } from "react";

import { cn } from "@superdao/lib/utils";
import { Button } from "@superdao/ui/components/button";
import { PanelLeftIcon } from "lucide-react";

import { useSidebar } from "../context";

export interface SidebarTriggerProps extends ComponentProps<typeof Button> {}

/**
 * Renders the sidebar trigger component.
 */
export function SidebarTrigger({ className, onClick, ...props }: SidebarTriggerProps) {
	const { toggleSidebar } = useSidebar();

	return (
		<Button
			data-sidebar="trigger"
			data-slot="sidebar-trigger"
			variant="ghost"
			size="icon-sm"
			className={cn(className)}
			onClick={(event) => {
				onClick?.(event);
				toggleSidebar();
			}}
			{...props}
		>
			<PanelLeftIcon />
			<span className="sr-only">Toggle Sidebar</span>
		</Button>
	);
}
