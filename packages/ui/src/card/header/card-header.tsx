import * as React from "react"

import { cn } from "@superdao/ui/lib/utils"

export interface CardHeaderProps extends React.ComponentProps<"div"> {}

/**
 * Renders the card header component.
 *
 * @see https://react.dev/reference/react/Component
 */
export function CardHeader({ className, ...props }: CardHeaderProps) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "group/card-header @container/card-header grid auto-rows-min items-start gap-1 rounded-t-xl px-(--card-spacing) has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto] [.border-b]:pb-(--card-spacing)",
        className
      )}
      {...props}
    />
  )
}
