"use client";

import { Menu as MenuPrimitive } from "@base-ui/react/menu";

export interface DropdownMenuPortalProps extends MenuPrimitive.Portal.Props {}

/**
 * Renders the dropdown menu portal component.
 *
 * @see https://base-ui.com/react/components/menu
 */
export function DropdownMenuPortal({ ...props }: DropdownMenuPortalProps) {
  return (
    <MenuPrimitive.Portal
      data-slot="dropdown-menu-portal"
      {...props}
    />
  );
}
