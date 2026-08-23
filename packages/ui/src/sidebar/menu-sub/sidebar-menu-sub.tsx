"use client"

import * as React from "react"

import { cn } from "@superdao/ui/lib/utils"

export interface SidebarMenuSubProps extends React.ComponentProps<"ul"> {}

/**
 * Renders the sidebar menu sub component.
 *
 * @see https://react.dev/reference/react/Component
 */
export function SidebarMenuSub({ className, ...props }: SidebarMenuSubProps) {
  return (
    <ul
      data-slot="sidebar-menu-sub"
      data-sidebar="menu-sub"
      className={cn(
        "flex min-w-0 flex-col pb-2 group-data-[collapsible=icon]:hidden",
        className
      )}
      {...props}
    />
  )
}
