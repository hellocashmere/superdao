import * as React from "react"

import { cn } from "@superdao/ui/lib/utils"

export interface CardTitleProps extends React.ComponentProps<"div"> {}

/**
 * Renders the card title component.
 *
 * @see https://react.dev/reference/react/Component
 */
export function CardTitle({ className, ...props }: CardTitleProps) {
  return (
    <div
      data-slot="card-title"
      className={cn(
        "font-heading text-base leading-snug font-medium group-data-[size=sm]/card:text-sm",
        className
      )}
      {...props}
    />
  )
}
