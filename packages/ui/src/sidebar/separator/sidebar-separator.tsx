"use client"

import * as React from "react"

import { cn } from "@superdao/ui/lib/utils"

import { Separator } from "@superdao/ui/components/separator"

export interface SidebarSeparatorProps extends React.ComponentProps<
  typeof Separator
> {}

/**
 * Renders the sidebar separator component.
 *
 * @see https://react.dev/reference/react/Component
 */
export function SidebarSeparator({
  className,
  ...props
}: SidebarSeparatorProps) {
  return (
    <Separator
      data-slot="sidebar-separator"
      data-sidebar="separator"
      className={cn("mx-2 w-auto bg-sidebar-border", className)}
      {...props}
    />
  )
}
