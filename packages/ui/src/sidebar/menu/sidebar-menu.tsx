"use client"

import * as React from "react"

import { cn } from "@superdao/ui/lib/utils"

export interface SidebarMenuProps extends React.ComponentProps<"ul"> {}

/**
 * Renders the sidebar menu component.
 *
 * @see https://react.dev/reference/react/Component
 */
export function SidebarMenu({ className, ...props }: SidebarMenuProps) {
  return (
    <ul
      data-slot="sidebar-menu"
      data-sidebar="menu"
      className={cn("flex w-full min-w-0 flex-col", className)}
      {...props}
    />
  )
}
