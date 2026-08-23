import * as React from "react"

import { cn } from "@superdao/ui/lib/utils"

export interface CardDescriptionProps extends React.ComponentProps<"div"> {}

/**
 * Renders the card description component.
 *
 * @see https://react.dev/reference/react/Component
 */
export function CardDescription({ className, ...props }: CardDescriptionProps) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}
