"use client"

import { Select as SelectPrimitive } from "@base-ui/react/select"

import { cn } from "@superdao/ui/lib/utils"

export interface SelectValueProps extends SelectPrimitive.Value.Props {}

/**
 * Renders the select value component.
 *
 * @see https://base-ui.com/react/components/select
 */
export function SelectValue({ className, ...props }: SelectValueProps) {
  return (
    <SelectPrimitive.Value
      data-slot="select-value"
      className={cn("flex flex-1 text-left", className)}
      {...props}
    />
  )
}
