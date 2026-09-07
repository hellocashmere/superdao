import type { ComponentProps } from "react";

import { cn } from "@superdao/lib/utils";

export interface SidebarMenuSubItemProps extends ComponentProps<"li"> {}

/**
 * Renders the sidebar menu sub item component.
 */
export function SidebarMenuSubItem({ className, ...props }: SidebarMenuSubItemProps) {
  return (
    <li
      data-slot="sidebar-menu-sub-item"
      data-sidebar="menu-sub-item"
      className={cn("group/menu-sub-item relative", className)}
      {...props}
    />
  );
}
