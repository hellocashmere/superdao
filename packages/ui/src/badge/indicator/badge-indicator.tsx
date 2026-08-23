import type { ComponentPropsWithRef } from "react"

import { cn } from "@superdao/ui/lib/utils"

export type BadgeIndicatorTone =
  | "pink"
  | "orange"
  | "lime"
  | "red"
  | "purple"
  | "yellow"

export interface BadgeIndicatorProps extends ComponentPropsWithRef<"span"> {
  tone?: BadgeIndicatorTone
}

/**
 * Renders the 4px colored status indicator within a badge.
 *
 * @see https://react.dev/reference/react/Component
 */
export function BadgeIndicator({
  className,
  ref,
  tone = "pink",
  ...props
}: BadgeIndicatorProps) {
  return (
    <span
      ref={ref}
      data-slot="badge-indicator"
      data-tone={tone}
      className={cn(
        "size-1 shrink-0 rounded-full data-[tone=lime]:bg-badge-indicator-lime data-[tone=orange]:bg-badge-indicator-orange data-[tone=pink]:bg-badge-indicator-pink data-[tone=purple]:bg-badge-indicator-purple data-[tone=red]:bg-badge-indicator-red data-[tone=yellow]:bg-badge-indicator-yellow",
        className
      )}
      {...props}
    />
  )
}
