"use client"

import { Popover as PopoverPrimitive } from "@base-ui/react/popover"

export interface PopoverTriggerProps extends PopoverPrimitive.Trigger.Props {}

/**
 * Renders the popover trigger component.
 *
 * @see https://base-ui.com/react/components/popover
 */
export function PopoverTrigger({ ...props }: PopoverTriggerProps) {
  return (
    <PopoverPrimitive.Trigger
      data-slot="popover-trigger"
      {...props}
    />
  )
}
