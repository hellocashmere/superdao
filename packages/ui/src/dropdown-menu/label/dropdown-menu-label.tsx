"use client";

import { Menu as MenuPrimitive } from "@base-ui/react/menu";
import { cn } from "@superdao/lib/utils";

export interface DropdownMenuLabelProps extends MenuPrimitive.GroupLabel.Props {
  /**
   * Adds left inset spacing to align the label with menu items.
   */
  inset?: boolean;
}

/**
 * Renders the dropdown menu label component.
 *
 * @see https://base-ui.com/react/components/menu
 */
export function DropdownMenuLabel({ className, inset, ...props }: DropdownMenuLabelProps) {
  return (
    <MenuPrimitive.GroupLabel
      data-slot="dropdown-menu-label"
      data-inset={inset}
      className={cn("px-4 py-1 text-xs font-medium text-muted-foreground data-inset:pl-7", className)}
      {...props}
    />
  );
}
