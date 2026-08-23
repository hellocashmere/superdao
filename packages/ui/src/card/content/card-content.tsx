import * as React from "react"

import { cn } from "@superdao/ui/lib/utils"

export interface CardContentProps extends React.ComponentProps<"div"> {}

/**
 * Renders the card content component.
 *
 * @see https://react.dev/reference/react/Component
 */
export function CardContent({ className, ...props }: CardContentProps) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-(--card-spacing)", className)}
      {...props}
    />
  )
}
