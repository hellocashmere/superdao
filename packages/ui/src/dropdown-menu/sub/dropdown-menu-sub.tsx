"use client";

import { Menu as MenuPrimitive } from "@base-ui/react/menu";

export interface DropdownMenuSubProps extends MenuPrimitive.SubmenuRoot.Props {}

/**
 * Renders the dropdown menu sub component.
 *
 * @see https://base-ui.com/react/components/menu
 */
export function DropdownMenuSub({ ...props }: DropdownMenuSubProps) {
  return (
    <MenuPrimitive.SubmenuRoot
      data-slot="dropdown-menu-sub"
      {...props}
    />
  );
}
