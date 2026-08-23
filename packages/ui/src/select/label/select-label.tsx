"use client"

import { Select as SelectPrimitive } from "@base-ui/react/select"

import { cn } from "@superdao/ui/lib/utils"

export interface SelectLabelProps extends SelectPrimitive.GroupLabel.Props {}

/**
 * Renders the select label component.
 *
 * @see https://base-ui.com/react/components/select
 */
export function SelectLabel({ className, ...props }: SelectLabelProps) {
  return (
    <SelectPrimitive.GroupLabel
      data-slot="select-label"
      className={cn("px-1.5 py-1 text-xs text-muted-foreground", className)}
      {...props}
    />
  )
}
