"use client";

import { Menu as MenuPrimitive } from "@base-ui/react/menu";
import { cn } from "@superdao/lib/utils";

export interface DropdownMenuGroupProps extends MenuPrimitive.Group.Props {}

/**
 * Renders the dropdown menu group component.
 *
 * @see https://base-ui.com/react/components/menu
 */
export function DropdownMenuGroup({ className, ...props }: DropdownMenuGroupProps) {
  return (
    <MenuPrimitive.Group
      data-slot="dropdown-menu-group"
      className={cn("scroll-my-1", className)}
      {...props}
    />
  );
}
