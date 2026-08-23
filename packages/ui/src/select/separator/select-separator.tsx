"use client"

import { Select as SelectPrimitive } from "@base-ui/react/select"

import { cn } from "@superdao/ui/lib/utils"

export interface SelectSeparatorProps extends SelectPrimitive.Separator.Props {}

/**
 * Renders the select separator component.
 *
 * @see https://base-ui.com/react/components/select
 */
export function SelectSeparator({ className, ...props }: SelectSeparatorProps) {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={cn("pointer-events-none -mx-1 my-1 h-px bg-border", className)}
      {...props}
    />
  )
}
