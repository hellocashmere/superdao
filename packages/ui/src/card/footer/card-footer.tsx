import * as React from "react"

import { cn } from "@superdao/ui/lib/utils"

export interface CardFooterProps extends React.ComponentProps<"div"> {}

/**
 * Renders the card footer component.
 *
 * @see https://react.dev/reference/react/Component
 */
export function CardFooter({ className, ...props }: CardFooterProps) {
  return (
    <div
      data-slot="card-footer"
      className={cn(
        "flex items-center rounded-b-xl border-t bg-muted/50 p-(--card-spacing)",
        className
      )}
      {...props}
    />
  )
}
