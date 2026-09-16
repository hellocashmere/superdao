import type { ComponentPropsWithRef } from "react";

import { useNumberFormatter } from "@superdao/hooks/use-number-formatter";
import { InfoSmallIcon } from "@superdao/icons/outline";
import { Card, CardContent } from "@superdao/ui/components/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "@superdao/ui/components/tooltip";

import type { LabelTransactionStatView } from "@/entities/label";

export interface LabelTransactionStatsProps extends ComponentPropsWithRef<typeof Card> {
	stats: readonly LabelTransactionStatView[];
}

/**
 * Renders aggregate transaction statistics for the last 30 days.
 */
export function LabelTransactionStats({ ref, className, stats, ...props }: LabelTransactionStatsProps) {
	const { compact, currency } = useNumberFormatter();

	return (
		<Card
			ref={ref}
			data-slot="label-transaction-stats"
			className={className}
			{...props}
		>
			<CardContent className="py-3">
				<div className="flex items-center gap-2 text-sm/5 font-semibold text-tabs-foreground">
					<span>Last 30d transactions</span>
					<Tooltip>
						<TooltipTrigger
							render={
								<button
									type="button"
									className="inline-flex size-4 cursor-help items-center justify-center rounded-sm text-[#717a8c] outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
									aria-label="About last 30 day transactions"
								/>
							}
						>
							<InfoSmallIcon size={16} />
						</TooltipTrigger>
						<TooltipContent
							side="right"
							sideOffset={8}
							className="max-w-64 font-normal"
						>
							Aggregated onchain transactions completed by audience wallets during the last 30 days.
						</TooltipContent>
					</Tooltip>
				</div>
				<div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
					{stats.map((stat) => (
						<div key={stat.label}>
							<p
								data-variant={stat.variant}
								className="text-xl/6 font-bold data-[variant=negative]:text-[#ff5471] data-[variant=positive]:text-[#32d74b]"
							>
								{stat.label === "Count"
									? compact(stat.value)
									: currency(stat.value, "USD", { currencyDisplay: "narrowSymbol", notation: "compact" })}
							</p>
							<p className="mt-1 text-[15px]/6 font-semibold text-tabs-foreground">{stat.label}</p>
						</div>
					))}
				</div>
			</CardContent>
		</Card>
	);
}
