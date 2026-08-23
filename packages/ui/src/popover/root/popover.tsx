"use client"

import { Popover as PopoverPrimitive } from "@base-ui/react/popover"

export interface PopoverProps extends PopoverPrimitive.Root.Props {}

/**
 * Renders the popover component.
 *
 * Composition:
 * ```text
 * Popover
 * ├── PopoverContent
 * ├── PopoverDescription
 * ├── PopoverHeader
 * ├── PopoverTitle
 * └── PopoverTrigger
 * ```
 *
 * @see https://base-ui.com/react/components/popover
 */
export function Popover({ ...props }: PopoverProps) {
  return (
    <PopoverPrimitive.Root
      data-slot="popover"
      {...props}
    />
  )
}
