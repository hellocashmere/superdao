"use client";

import type { ComponentPropsWithRef } from "react";

import { Card } from "@superdao/ui/components/card";
import { ChartContainer, ChartTooltip } from "@superdao/ui/components/chart";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

import { conversionData } from "../model/reporting-data";

const chartConfig = {
  pageView: { label: "PAGE_VIEW › WALLET_CONNECT", color: "#398fe5" },
  walletConnect: {
    label: "WALLET_CONNECT › TARGET_ACTION_MINT",
    color: "#fc7900",
  },
  mint: { label: "PAGE_VIEW › TARGET_ACTION_MINT", color: "#32d74b" },
};

export interface ConversionChartProps extends ComponentPropsWithRef<typeof Card> {}

interface ConversionTooltipPayload {
  color?: string;
  dataKey?: string;
  value?: number;
}

interface ConversionTooltipProps {
  active?: boolean;
  label?: string;
  payload?: readonly ConversionTooltipPayload[];
}

/**
 * Renders the conversion percentage history and its interactive tooltip.
 */
export function ConversionChart({ className, ref, ...props }: ConversionChartProps) {
  return (
    <Card
      {...props}
      ref={ref}
      data-slot="conversion-chart"
      className={className}
    >
      <h2 className="px-5 pt-3 text-sm/5 font-semibold text-[#a2a8b4]">Conversion % by step over time</h2>
      <div className="flex flex-wrap gap-x-6 gap-y-2 px-5 py-2 text-[11px]/[18px] text-[#f2f3f5]">
        {Object.entries(chartConfig).map(([key, item]) => (
          <div
            key={key}
            className="flex items-center gap-2"
          >
            <span
              className="size-1.5 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            <span>{item.label}</span>
          </div>
        ))}
      </div>
      <ChartContainer
        config={chartConfig}
        initialDimension={{ width: 1040, height: 230 }}
        className="aspect-auto h-[230px] w-full px-2 pb-2"
      >
        <LineChart
          data={conversionData}
          margin={{ top: 6, right: 14, bottom: 0, left: -12 }}
        >
          <CartesianGrid
            vertical={false}
            stroke="#343a46"
          />
          <XAxis
            dataKey="date"
            axisLine={false}
            tickLine={false}
            tickMargin={9}
            minTickGap={42}
            tick={{ fill: "#a2a8b4", fontSize: 11 }}
          />
          <YAxis
            domain={[0, 45]}
            ticks={[0, 10, 20, 30, 40]}
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#a2a8b4", fontSize: 11 }}
          />
          <ChartTooltip
            cursor={{ stroke: "#343a46" }}
            content={<ConversionTooltipContent />}
          />
          <Line
            type="linear"
            dataKey="pageView"
            stroke="var(--color-pageView)"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4, strokeWidth: 0 }}
          />
          <Line
            type="linear"
            dataKey="walletConnect"
            stroke="var(--color-walletConnect)"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4, strokeWidth: 0 }}
          />
          <Line
            type="linear"
            dataKey="mint"
            stroke="var(--color-mint)"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4, strokeWidth: 0 }}
          />
        </LineChart>
      </ChartContainer>
    </Card>
  );
}

/**
 * Renders the Figma-matched conversion chart hover card.
 */
export function ConversionTooltipContent({ active, label, payload }: ConversionTooltipProps) {
  if (!active || !payload?.length) return null;

  return (
    <div className="min-w-[378px] rounded-lg bg-[#343a46] px-4 py-3 shadow-2xl">
      <p className="mb-2 text-[10px]/3 font-bold text-[#a2a8b4] uppercase">{label}</p>
      <div className="space-y-1">
        {payload.map((item) => {
          const config = chartConfig[item.dataKey as keyof typeof chartConfig];
          return (
            <div
              key={item.dataKey}
              className="flex items-center gap-3 text-[13px]/[18px]"
            >
              <span
                className="font-semibold tabular-nums"
                style={{ color: item.color }}
              >
                {item.value}%
              </span>
              <span>{config?.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
