"use client"

import { Menu as MenuPrimitive } from "@base-ui/react/menu"

import { cn } from "@superdao/ui/lib/utils"

export interface DropdownMenuSeparatorProps
  extends MenuPrimitive.Separator.Props {}

/**
 * Renders the dropdown menu separator component.
 *
 * @see https://base-ui.com/react/components/menu
 */
export function DropdownMenuSeparator({
  className,
  ...props
}: DropdownMenuSeparatorProps) {
  return (
    <MenuPrimitive.Separator
      data-slot="dropdown-menu-separator"
      className={cn("-mx-1 my-1 h-px bg-border", className)}
      {...props}
    />
  )
}
