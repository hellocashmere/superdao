"use client";

import type { ComponentPropsWithRef } from "react";

import { InfoIcon } from "@superdao/icons/outline";
import { cn } from "@superdao/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@superdao/ui/components/card";
import type { ChartConfig } from "@superdao/ui/components/chart";
import { ChartContainer, ChartPrimitive } from "@superdao/ui/components/chart";

import type { DappChartDatumView } from "@/entities/dapp";

const chartConfig = {
  wallets: { label: "Wallets", color: "#32d74b" },
} satisfies ChartConfig;

export interface DappBalanceChartProps extends ComponentPropsWithRef<typeof Card> {
  data: readonly DappChartDatumView[];
}

/**
 * Renders the wallet balance distribution for a dapp audience.
 */
export function DappBalanceChart({ className, data, ref, ...props }: DappBalanceChartProps) {
  return (
    <Card
      {...props}
      ref={ref}
      data-slot="dapp-balance-chart"
      className={cn("min-h-73 md:col-span-2 xl:col-span-1 xl:col-start-4 xl:row-span-2 xl:row-start-1", className)}
    >
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Wallet balance, USD
          <InfoIcon
            size={16}
            className="text-icon"
          />
        </CardTitle>
      </CardHeader>
      <CardContent className="pb-2">
        <ChartContainer
          config={chartConfig}
          className="mt-1 h-63 w-full"
        >
          <ChartPrimitive.BarChart
            data={data}
            margin={{ top: 24, right: 0, bottom: 0, left: 0 }}
          >
            <ChartPrimitive.XAxis
              dataKey="label"
              tickLine={false}
              axisLine={false}
              tick={{ fill: "#a2a8b4", fontSize: 11 }}
            />
            <ChartPrimitive.YAxis
              hide
              domain={[0, 11000]}
            />
            <ChartPrimitive.Bar
              dataKey="value"
              fill="var(--color-wallets)"
              radius={[4, 4, 4, 4]}
            >
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
