"use client";

import { Menu as MenuPrimitive } from "@base-ui/react/menu";

export interface DropdownMenuProps extends MenuPrimitive.Root.Props {}

/**
 * Renders the dropdown menu component.
 *
 * Composition:
 * ```text
 * DropdownMenu
 * ├── DropdownMenuPortal
 * ├── DropdownMenuTrigger
 * ├── DropdownMenuContent
 * ├── DropdownMenuGroup
 * ├── DropdownMenuLabel
 * ├── DropdownMenuItem
 * ├── DropdownMenuCheckboxItem
 * ├── DropdownMenuRadioGroup
 * ├── DropdownMenuRadioItem
 * ├── DropdownMenuShortcut
 * ├── DropdownMenuSub
 * ├── DropdownMenuSubTrigger
 * └── DropdownMenuSubContent
 * ```
 *
 * @see https://base-ui.com/react/components/menu
 */
export function DropdownMenu({ ...props }: DropdownMenuProps) {
  return (
    <MenuPrimitive.Root
      data-slot="dropdown-menu"
      {...props}
    />
  );
}
