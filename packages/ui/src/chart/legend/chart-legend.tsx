"use client";

import type { ComponentPropsWithRef } from "react";

import * as RechartsPrimitive from "recharts";

export interface ChartLegendProps extends ComponentPropsWithRef<typeof RechartsPrimitive.Legend> {}

/**
 * Renders the chart legend component.
 *
 * @see https://recharts.github.io/en-US/guide
 */
export function ChartLegend(props: ChartLegendProps) {
  return <RechartsPrimitive.Legend {...props} />;
}
