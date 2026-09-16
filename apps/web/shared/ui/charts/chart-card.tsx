import type { ComponentPropsWithRef, ReactNode } from "react";

import { InfoIcon } from "@superdao/icons/outline";
import { cn } from "@superdao/lib/utils";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@superdao/ui/components/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "@superdao/ui/components/tooltip";

export interface ChartCardProps extends ComponentPropsWithRef<typeof Card> {
	/**
	 * Chart visualization rendered beneath the card heading.
	 */
	children: ReactNode;

	/**
	 * Supporting context displayed below the chart title.
	 */
	description?: string;

	/**
	 * Stable slot name used by a specialized chart-card composition.
	 */
	slot?: string;

	/**
	 * Heading displayed above the chart visualization.
	 */
	title: string;

	/**
	 * Explanatory text shown from the information control.
	 */
	tooltip?: string;
}

/**
 * Renders a shared card frame with a chart title, optional context, and visualization.
 */
export function ChartCard({
	ref,
	className,
	children,
	description,
	slot = "chart-card",
	title,
	tooltip,
	...props
}: ChartCardProps) {
	return (
		<Card
			ref={ref}
			data-slot={slot}
			className={cn("flex min-h-0 flex-col", className)}
			{...props}
		>
			<CardHeader>
				<CardTitle>{title}</CardTitle>
				{description ? <CardDescription>{description}</CardDescription> : null}
				{tooltip ? (
					<CardAction>
						<Tooltip>
							<TooltipTrigger
								render={
									<button
										type="button"
										className="inline-flex size-4 cursor-help items-center justify-center rounded-sm text-icon outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
										aria-label={`About ${title}`}
									/>
								}
							>
								<InfoIcon size={16} />
							</TooltipTrigger>
							<TooltipContent side="right">{tooltip}</TooltipContent>
						</Tooltip>
					</CardAction>
				) : null}
			</CardHeader>
			<CardContent className="flex min-h-0 flex-1">{children}</CardContent>
		</Card>
	);
}
