"use client"

import * as RechartsPrimitive from "recharts"

import type { ComponentPropsWithRef } from "react"

export interface ChartTooltipProps extends ComponentPropsWithRef<
  typeof RechartsPrimitive.Tooltip
> {}

/**
 * Renders the chart tooltip component.
 *
 * @see https://recharts.github.io/en-US/guide
 */
export function ChartTooltip(props: ChartTooltipProps) {
  return <RechartsPrimitive.Tooltip {...props} />
}
