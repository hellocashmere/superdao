"use client"

import { RadioGroup as RadioGroupPrimitive } from "@base-ui/react/radio-group"

import { cn } from "@superdao/ui/lib/utils"

export interface RadioGroupProps extends RadioGroupPrimitive.Props {}

/**
 * Renders the radio group component.
 *
 * Composition:
 * ```text
 * RadioGroup
 * └── RadioGroupItem
 * ```
 *
 * @see https://base-ui.com/react/components/radio-group
 */
export function RadioGroup({ className, ...props }: RadioGroupProps) {
  return (
    <RadioGroupPrimitive
      data-slot="radio-group"
      className={cn("grid w-full gap-2", className)}
      {...props}
    />
  )
}
