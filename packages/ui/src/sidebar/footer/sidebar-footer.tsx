"use client"

import * as React from "react"

import { cn } from "@superdao/ui/lib/utils"

export interface SidebarFooterProps extends React.ComponentProps<"div"> {}

/**
 * Renders the sidebar footer component.
 *
 * @see https://react.dev/reference/react/Component
 */
export function SidebarFooter({ className, ...props }: SidebarFooterProps) {
  return (
    <div
      data-slot="sidebar-footer"
      data-sidebar="footer"
      className={cn("flex shrink-0 flex-col gap-0 p-0", className)}
      {...props}
    />
  )
}
