"use client"

import { Select as SelectPrimitive } from "@base-ui/react/select"

import { cn } from "@superdao/ui/lib/utils"

export interface SelectGroupProps extends SelectPrimitive.Group.Props {}

/**
 * Renders the select group component.
 *
 * @see https://base-ui.com/react/components/select
 */
export function SelectGroup({ className, ...props }: SelectGroupProps) {
  return (
    <SelectPrimitive.Group
      data-slot="select-group"
      className={cn("scroll-my-1 py-1", className)}
      {...props}
    />
  )
}
