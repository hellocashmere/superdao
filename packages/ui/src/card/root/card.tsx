import * as React from "react"

import { cn } from "@superdao/ui/lib/utils"

export interface CardProps extends React.ComponentProps<"div"> {
  size?: "default" | "sm"
}

/**
 * Renders the card component.
 *
 * Composition:
 * ```text
 * Card
 * ├── CardHeader
 * ├── CardFooter
 * ├── CardTitle
 * ├── CardAction
 * ├── CardDescription
 * └── CardContent
 * ```
 *
 * @see https://react.dev/reference/react/Component
 */
export function Card({ className, size = "default", ...props }: CardProps) {
  return (
    <div
      data-slot="card"
      data-size={size}
      className={cn(
        "group/card flex flex-col gap-(--card-spacing) overflow-hidden rounded-xl bg-card py-(--card-spacing) text-sm text-card-foreground ring-1 ring-foreground/10 [--card-spacing:--spacing(4)] has-data-[slot=card-footer]:pb-0 has-[>img:first-child]:pt-0 data-[size=sm]:[--card-spacing:--spacing(3)] data-[size=sm]:has-data-[slot=card-footer]:pb-0 *:[img:first-child]:rounded-t-xl *:[img:last-child]:rounded-b-xl",
        className
      )}
      {...props}
    />
  )
}
