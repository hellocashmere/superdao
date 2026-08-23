"use client"

import * as React from "react"

import { cn } from "@superdao/ui/lib/utils"

export interface SidebarHeaderProps extends React.ComponentProps<"div"> {}

/**
 * Renders the sidebar header component.
 *
 * @see https://react.dev/reference/react/Component
 */
export function SidebarHeader({ className, ...props }: SidebarHeaderProps) {
  return (
    <div
      data-slot="sidebar-header"
      data-sidebar="header"
      className={cn("flex shrink-0 flex-col gap-0 p-0", className)}
      {...props}
    />
  )
}
