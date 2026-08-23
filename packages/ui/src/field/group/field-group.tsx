"use client"

import { cn } from "@superdao/ui/lib/utils"

export interface FieldGroupProps extends React.ComponentProps<"div"> {}

/**
 * Renders the field group component.
 *
 * @see https://react.dev/reference/react/Component
 */
export function FieldGroup({ className, ...props }: FieldGroupProps) {
  return (
    <div
      data-slot="field-group"
      className={cn(
        "group/field-group @container/field-group flex w-full flex-col gap-5 data-[slot=checkbox-group]:gap-3 *:data-[slot=field-group]:gap-4",
        className
      )}
      {...props}
    />
  )
}
