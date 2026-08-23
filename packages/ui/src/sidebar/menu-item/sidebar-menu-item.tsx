"use client"

import * as React from "react"

import { cn } from "@superdao/ui/lib/utils"

export interface SidebarMenuItemProps extends React.ComponentProps<"li"> {}

/**
 * Renders the sidebar menu item component.
 *
 * @see https://react.dev/reference/react/Component
 */
export function SidebarMenuItem({ className, ...props }: SidebarMenuItemProps) {
  return (
    <li
      data-slot="sidebar-menu-item"
      data-sidebar="menu-item"
      className={cn("group/menu-item relative", className)}
      {...props}
    />
  )
}
