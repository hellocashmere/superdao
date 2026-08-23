"use client"

import * as React from "react"

import { cn } from "@superdao/ui/lib/utils"

export interface SidebarGroupContentProps extends React.ComponentProps<"div"> {}

/**
 * Renders the sidebar group content component.
 *
 * @see https://react.dev/reference/react/Component
 */
export function SidebarGroupContent({
  className,
  ...props
}: SidebarGroupContentProps) {
  return (
    <div
      data-slot="sidebar-group-content"
      data-sidebar="group-content"
      className={cn("w-full text-sm", className)}
      {...props}
    />
  )
}
