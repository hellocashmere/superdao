"use client"

import * as React from "react"

import { cn } from "@superdao/ui/lib/utils"

export interface SidebarMenuSubItemProps extends React.ComponentProps<"li"> {}

/**
 * Renders the sidebar menu sub item component.
 *
 * @see https://react.dev/reference/react/Component
 */
export function SidebarMenuSubItem({
  className,
  ...props
}: SidebarMenuSubItemProps) {
  return (
    <li
      data-slot="sidebar-menu-sub-item"
      data-sidebar="menu-sub-item"
      className={cn("group/menu-sub-item relative", className)}
      {...props}
    />
  )
}
