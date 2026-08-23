"use client"

import { Popover as PopoverPrimitive } from "@base-ui/react/popover"

import { cn } from "@superdao/ui/lib/utils"

export interface PopoverDescriptionProps
  extends PopoverPrimitive.Description.Props {}

/**
 * Renders the popover description component.
 *
 * @see https://base-ui.com/react/components/popover
 */
export function PopoverDescription({
  className,
  ...props
}: PopoverDescriptionProps) {
  return (
    <PopoverPrimitive.Description
      data-slot="popover-description"
      className={cn("text-muted-foreground", className)}
      {...props}
    />
  )
}
