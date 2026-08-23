"use client"

import { cn } from "@superdao/ui/lib/utils"

export interface FieldTitleProps extends React.ComponentProps<"div"> {}

/**
 * Renders the field title component.
 *
 * @see https://react.dev/reference/react/Component
 */
export function FieldTitle({ className, ...props }: FieldTitleProps) {
  return (
    <div
      data-slot="field-label"
      className={cn(
        "flex w-fit items-center gap-2 text-sm font-medium group-data-[disabled=true]/field:opacity-50",
        className
      )}
      {...props}
    />
  )
}
