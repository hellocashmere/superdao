"use client";

import type { ComponentProps } from "react";
import { useId } from "react";

import { cn } from "@superdao/lib/utils";
import * as RechartsPrimitive from "recharts";

import type { ChartConfig } from "../context";
import { ChartContext } from "../context";
import { ChartStyle } from "../style/chart-style";

const INITIAL_DIMENSION = { width: 320, height: 200 } as const;

export interface ChartContainerProps extends ComponentProps<"div"> {
  /**
   * Maps chart data keys to their labels, icons, and colors.
   */
  config: ChartConfig;

  /**
   * Provides the Recharts elements rendered within the responsive chart container.
   */
  children: ComponentProps<typeof RechartsPrimitive.ResponsiveContainer>["children"];

  /**
   * Sets fallback dimensions used before the responsive container measures its layout.
   */
  initialDimension?: {
    width: number;
    height: number;
  };
}

/**
 * Renders the chart container component.
 *
 * Composition:
 * ```text
 * ChartContainer
 * ├── ChartTooltip
 * ├── ChartTooltipContent
 * ├── ChartLegend
 * ├── ChartLegendContent
 * └── ChartStyle
 * ```
 *
 * @see https://recharts.github.io/en-US/guide
 */
export function ChartContainer({
  id,
  className,
  children,
  config,
  initialDimension = INITIAL_DIMENSION,
  ...props
}: ChartContainerProps) {
  const uniqueID = useId();
  const chartID = `chart-${id ?? uniqueID.replace(/:/g, "")}`;

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        data-slot="chart"
        data-chart={chartID}
        className={cn(
          "flex aspect-video justify-center text-xs [&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-hidden [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border [&_.recharts-sector]:outline-hidden [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-surface]:outline-hidden",
          className
        )}
        {...props}
      >
        <ChartStyle
          id={chartID}
          config={config}
        />
        <RechartsPrimitive.ResponsiveContainer initialDimension={initialDimension}>
          {children}
        </RechartsPrimitive.ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  );
}
