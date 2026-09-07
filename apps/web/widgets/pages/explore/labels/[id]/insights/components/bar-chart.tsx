"use client";

import type { ComponentPropsWithRef } from "react";

import { cn } from "@superdao/lib/utils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@superdao/ui/components/card";
import type { ChartConfig } from "@superdao/ui/components/chart";
import { ChartContainer, ChartPrimitive } from "@superdao/ui/components/chart";

import { useGetLabelInsights } from "@/entities/label";

const insightChartConfig = {
  value: {
    label: "Wallets",
    color: "#32d74b",
  },
} satisfies ChartConfig;

const WALLET_BALANCE_COLOR = "#32D74B";
const DEFAULT_CHART_COLOR = "#36BED9";

export type LabelInsightChartDataKey = "interests" | "nftAllocation" | "personas" | "superrank" | "walletBalance";

export interface LabelInsightBarChartProps extends ComponentPropsWithRef<typeof Card> {
  dataKey: LabelInsightChartDataKey;
  description?: string;
  label: number;
  title: string;
  tone?: "cyan" | "green" | "multi";
}

/**
 * Renders a responsive vertical distribution chart for label analytics.
 */
export function LabelInsightBarChart({
  className,
  dataKey,
  description,
  label,
  ref,
  title,
  tone = "green",
  ...props
}: LabelInsightBarChartProps) {
  const insightsQuery = useGetLabelInsights(label);

  if (insightsQuery.error) throw insightsQuery.error;
  if (insightsQuery.isPending) return null;

  const data = insightsQuery.data[dataKey];
  const maxValue = Math.max(...data.map(({ value }) => value), 1);
  const chartColor = tone === "green" ? WALLET_BALANCE_COLOR : DEFAULT_CHART_COLOR;

  return (
    <Card
      {...props}
      ref={ref}
      data-slot="label-insight-bar-chart"
      data-tone={tone}
      className={cn("h-74", className)}
    >
      <CardHeader>
        <CardTitle
          role="heading"
          aria-level={3}
        >
          {title}
        </CardTitle>
        {description ? <CardDescription>{description}</CardDescription> : null}
      </CardHeader>
      <CardContent className="flex min-h-0 flex-1 pb-3">
        <ChartContainer
          config={insightChartConfig}
          className="mt-1 aspect-auto min-h-0 w-full flex-1"
        >
          <ChartPrimitive.BarChart
            data={data}
            margin={{ top: 24, right: 0, bottom: 0, left: 0 }}
            barCategoryGap={13}
          >
            <ChartPrimitive.XAxis
              dataKey="label"
              tickLine={false}
              axisLine={false}
              interval={0}
              tick={{ fill: "#a2a8b4", fontSize: 11 }}
            />
            <ChartPrimitive.YAxis
              hide
              domain={[0, maxValue]}
            />
            <ChartPrimitive.Bar
              dataKey="value"
              radius={[4, 4, 4, 4]}
            >
              {data.map((item) => (
                <ChartPrimitive.Cell
                  key={item.label}
                  fill={tone === "multi" ? (item.fill ?? chartColor) : chartColor}
                />
              ))}
              <ChartPrimitive.LabelList
                dataKey="displayValue"
                position="top"
                fill="#ffffff"
                fontSize={13}
              />
            </ChartPrimitive.Bar>
          </ChartPrimitive.BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
