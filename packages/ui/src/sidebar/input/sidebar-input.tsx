"use client"

import * as React from "react"

import { cn } from "@superdao/ui/lib/utils"

import { Input } from "@superdao/ui/components/input"

export interface SidebarInputProps extends React.ComponentProps<typeof Input> {}

/**
 * Renders the sidebar input component.
 *
 * @see https://react.dev/reference/react/Component
 */
export function SidebarInput({ className, ...props }: SidebarInputProps) {
  return (
    <Input
      data-slot="sidebar-input"
      data-sidebar="input"
      className={cn(
        "h-9 w-full border-0 bg-field shadow-none hover:bg-sidebar-accent focus-visible:bg-sidebar-accent",
        className
      )}
      {...props}
    />
  )
}
