"use client"

import { cn } from "@superdao/ui/lib/utils"

export interface FieldContentProps extends React.ComponentProps<"div"> {}

/**
 * Renders the field content component.
 *
 * @see https://react.dev/reference/react/Component
 */
export function FieldContent({ className, ...props }: FieldContentProps) {
  return (
    <div
      data-slot="field-content"
      className={cn(
        "group/field-content flex flex-1 flex-col gap-0.5 leading-snug",
        className
      )}
      {...props}
    />
  )
}
