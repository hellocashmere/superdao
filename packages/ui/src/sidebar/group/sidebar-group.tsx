"use client"

import * as React from "react"

import { cn } from "@superdao/ui/lib/utils"

export interface SidebarGroupProps extends React.ComponentProps<"div"> {}

/**
 * Renders the sidebar group component.
 *
 * @see https://react.dev/reference/react/Component
 */
export function SidebarGroup({ className, ...props }: SidebarGroupProps) {
  return (
    <div
      data-slot="sidebar-group"
      data-sidebar="group"
      className={cn("relative flex w-full min-w-0 flex-col p-0", className)}
      {...props}
    />
  )
}
