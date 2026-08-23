"use client"

import * as React from "react"

import { cn } from "@superdao/ui/lib/utils"

export interface DropdownMenuShortcutProps extends React.ComponentProps<"span"> {}

/**
 * Renders the dropdown menu shortcut component.
 *
 * @see https://base-ui.com/react/components/menu
 */
export function DropdownMenuShortcut({
  className,
  ...props
}: DropdownMenuShortcutProps) {
  return (
    <span
      data-slot="dropdown-menu-shortcut"
      className={cn(
        "ml-auto text-xs tracking-widest text-muted-foreground group-focus/dropdown-menu-item:text-accent-foreground",
        className
      )}
      {...props}
    />
  )
}
