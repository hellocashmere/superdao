"use client"

import { cn } from "@superdao/ui/lib/utils"

export interface FieldLegendProps extends React.ComponentProps<"legend"> {
  variant?: "legend" | "label"
}

/**
 * Renders the field legend component.
 *
 * @see https://react.dev/reference/react/Component
 */
export function FieldLegend({
  className,
  variant = "legend",
  ...props
}: FieldLegendProps) {
  return (
    <legend
      data-slot="field-legend"
      data-variant={variant}
      className={cn(
        "mb-1.5 font-medium data-[variant=label]:text-sm data-[variant=legend]:text-base",
        className
      )}
      {...props}
    />
  )
}
