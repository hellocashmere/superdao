"use client";

import type { ComponentPropsWithRef } from "react";

import { useNumberFormatter } from "@superdao/hooks/use-number-formatter";
import { cn } from "@superdao/lib/utils";
import type { Card } from "@superdao/ui/components/card";
import type { ChartConfig } from "@superdao/ui/components/chart";
import { ChartContainer, ChartPrimitive } from "@superdao/ui/components/chart";

import { ChartCard } from "./chart-card";

export interface BarChartDatum {
	/**
	 * Text displayed on the category axis.
	 */
	label: number | string;

	/**
	 * Raw or preformatted value rendered above the corresponding bar.
	 */
	displayValue: number | string;

	/**
	 * Optional direct color used for this individual bar.
	 */
	fill?: string;

	/**
	 * Numeric value used to determine the bar height.
	 */
	value: number;
}

export interface BarChartCardProps extends ComponentPropsWithRef<typeof Card> {
	/**
	 * Heading displayed above the chart visualization.
	 */
	title: string;

	/**
	 * Supporting context displayed below the chart title.
	 */
	description?: string;

	/**
	 * Chart configuration that maps the value key to its label and color token.
	 */
	config: ChartConfig;

	/**
	 * Data points rendered as vertical bars.
	 */
	data: readonly BarChartDatum[];

	/**
	 * Explanatory text shown from the information control.
	 */
	tooltip?: string;
}

/**
 * Renders a titled vertical bar chart inside the shared chart-card frame.
 */
export function BarChartCard({ ref, className, config, data, ...props }: BarChartCardProps) {
	const { compact } = useNumberFormatter();
	const maxValue = Math.max(...data.map((item) => item.value), 1);
	const color = "var(--color-value)";
	const chartData = data.map((item) => ({
		...item,
		displayValue: typeof item.displayValue === "number" ? compact(item.displayValue) : item.displayValue,
		label: typeof item.label === "number" ? compact(item.label) : item.label,
		fill: item.fill ?? color,
	}));

	return (
		<ChartCard
			ref={ref}
			slot="bar-chart-card"
			className={cn("h-74", className)}
			{...props}
		>
			<ChartContainer
				config={config}
				className="mt-1 aspect-auto min-h-0 w-full flex-1"
			>
				<ChartPrimitive.BarChart
					accessibilityLayer
					data={chartData}
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
						<ChartPrimitive.LabelList
							dataKey="displayValue"
							position="top"
							fill="#ffffff"
							fontSize={13}
						/>
					</ChartPrimitive.Bar>
				</ChartPrimitive.BarChart>
			</ChartContainer>
		</ChartCard>
	);
}
