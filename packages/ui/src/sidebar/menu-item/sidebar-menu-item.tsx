"use client";

import type { ComponentProps } from "react";

import { cn } from "@superdao/lib/utils";

export interface SidebarMenuItemProps extends ComponentProps<"li"> {}

/**
 * Renders the sidebar menu item component.
 */
export function SidebarMenuItem({ className, ...props }: SidebarMenuItemProps) {
  return (
    <li
      data-slot="sidebar-menu-item"
      data-sidebar="menu-item"
      className={cn("group/menu-item relative", className)}
      {...props}
    />
  );
}
