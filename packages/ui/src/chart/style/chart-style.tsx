import type { ComponentPropsWithRef } from "react";

import { THEMES } from "../config";
import type { ChartConfig } from "../context";

export interface ChartStyleProps extends ComponentPropsWithRef<"style"> {
	/**
	 * Stable chart identifier used by generated CSS selectors.
	 */
	id: string;

	/**
	 * Series configuration converted into CSS custom properties.
	 */
	config: ChartConfig;
}

/**
 * Renders theme-aware CSS variables for a chart.
 *
 * @see https://recharts.github.io/en-US/guide
 */
export function ChartStyle({ ref, id, config, ...props }: ChartStyleProps) {
	const colorConfig = Object.entries(config).filter(([, itemConfig]) => itemConfig.theme ?? itemConfig.color);

	if (!colorConfig.length) return null;

	return (
		<style
			ref={ref}
			dangerouslySetInnerHTML={{
				__html: Object.entries(THEMES)
					.map(
						([theme, prefix]) => `
${prefix} [data-chart=${id}] {
${colorConfig
	.map(([key, itemConfig]) => {
		const color = itemConfig.theme?.[theme as keyof typeof itemConfig.theme] ?? itemConfig.color;
		return color ? `  --color-${key}: ${color};` : null;
	})
	.join("\n")}
}
`
					)
					.join("\n"),
			}}
			{...props}
		/>
	);
}
