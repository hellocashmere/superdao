"use client"

import { Popover as PopoverPrimitive } from "@base-ui/react/popover"

import { cn } from "@superdao/ui/lib/utils"

export interface PopoverTitleProps extends PopoverPrimitive.Title.Props {}

/**
 * Renders the popover title component.
 *
 * @see https://base-ui.com/react/components/popover
 */
export function PopoverTitle({ className, ...props }: PopoverTitleProps) {
  return (
    <PopoverPrimitive.Title
      data-slot="popover-title"
      className={cn("font-medium", className)}
      {...props}
    />
  )
}
