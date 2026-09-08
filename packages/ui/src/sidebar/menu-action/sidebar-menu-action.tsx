"use client";

import type { ComponentProps } from "react";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cn } from "@superdao/lib/utils";

export interface SidebarMenuActionProps extends useRender.ComponentProps<"button">, ComponentProps<"button"> {
	showOnHover?: boolean;
}

/**
 * Renders the sidebar menu action component.
 */
export function SidebarMenuAction({ className, render, showOnHover = false, ...props }: SidebarMenuActionProps) {
	return useRender({
		defaultTagName: "button",
		props: mergeProps<"button">(
			{
				className: cn(
					"absolute top-3 right-5 flex size-4 items-center justify-center p-0 text-sidebar-foreground outline-hidden transition-transform !duration-0 group-data-[collapsible=icon]:hidden peer-hover/menu-button:text-sidebar-accent-foreground after:absolute after:-inset-2 hover:text-sidebar-accent-foreground focus-visible:ring-2 focus-visible:ring-ring/40 md:after:hidden [&>svg]:size-4 [&>svg]:shrink-0",
					showOnHover &&
						"group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 peer-data-active/menu-button:text-sidebar-accent-foreground aria-expanded:opacity-100 md:opacity-0",
					className
				),
			},
			props
		),
		render,
		state: {
			slot: "sidebar-menu-action",
			sidebar: "menu-action",
		},
	});
}
