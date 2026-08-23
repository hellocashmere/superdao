import * as React from "react"

import { cn } from "@superdao/ui/lib/utils"

export interface CardActionProps extends React.ComponentProps<"div"> {}

/**
 * Renders the card action component.
 *
 * @see https://react.dev/reference/react/Component
 */
export function CardAction({ className, ...props }: CardActionProps) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props}
    />
  )
}
