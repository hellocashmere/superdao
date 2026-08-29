"use client";

import { Menu as MenuPrimitive } from "@base-ui/react/menu";

export interface DropdownMenuRadioGroupProps extends MenuPrimitive.RadioGroup.Props {}

/**
 * Renders the dropdown menu radio group component.
 *
 * @see https://base-ui.com/react/components/menu
 */
export function DropdownMenuRadioGroup({ ...props }: DropdownMenuRadioGroupProps) {
  return (
    <MenuPrimitive.RadioGroup
      data-slot="dropdown-menu-radio-group"
      {...props}
    />
  );
}
