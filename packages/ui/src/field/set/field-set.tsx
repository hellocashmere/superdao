"use client"

import { cn } from "@superdao/ui/lib/utils"

export interface FieldSetProps extends React.ComponentProps<"fieldset"> {}

/**
 * Renders the field set component.
 *
 * @see https://react.dev/reference/react/Component
 */
export function FieldSet({ className, ...props }: FieldSetProps) {
  return (
    <fieldset
      data-slot="field-set"
      className={cn(
        "flex flex-col gap-4 has-[>[data-slot=checkbox-group]]:gap-3 has-[>[data-slot=radio-group]]:gap-3",
        className
      )}
      {...props}
    />
  )
}
