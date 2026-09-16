import type { ComponentPropsWithRef } from "react";

import { useNumberFormatter } from "@superdao/hooks/use-number-formatter";
import { MailBoldIcon, Twitter2BoldIcon } from "@superdao/icons/bold";
import { cn } from "@superdao/lib/utils";
import { Card, CardContent } from "@superdao/ui/components/card";
import type { ChartConfig } from "@superdao/ui/components/chart";
import { Skeleton } from "@superdao/ui/components/skeleton";

import { useGetTokenHighlights } from "@/entities/token";
import { BarChartCard } from "@/shared/ui/charts";
import { MetricCard } from "@/shared/ui/metric-card";

const walletBalanceChartConfig = { value: { label: "Wallets", color: "var(--chart-1)" } } satisfies ChartConfig;

export interface TokenHighlightsProps extends ComponentPropsWithRef<"section"> {
	tokenID: number;
}

/**
 * Renders audience highlights for the selected token.
 */
export function TokenHighlights({ ref, className, tokenID, ...props }: TokenHighlightsProps) {
	const { compact, currency, number, percentValue } = useNumberFormatter();
	const highlightsQuery = useGetTokenHighlights(tokenID);

	if (highlightsQuery.error) throw highlightsQuery.error;
	if (highlightsQuery.isPending) {
		return (
			<WalletHighlightsSkeleton
				ref={ref}
				className={className}
			/>
		);
	}

	return (
		<section
			ref={ref}
			aria-label="Token audience highlights"
			data-slot="token-highlights"
			className={cn("grid gap-5 md:grid-cols-2 xl:grid-cols-4 xl:grid-rows-[136px_136px]", className)}
			{...props}
		>
			{highlightsQuery.data.metrics.map((metric) => (
				<MetricCard
					key={metric.id}
					title={metric.title}
					value={
						metric.id === "balance"
							? currency(metric.value, "USD", { currencyDisplay: "narrowSymbol", notation: "compact" })
							: compact(metric.value)
					}
					description={metric.description}
					footerValue={
						metric.id === "balance"
							? currency(metric.footerValue, "USD", { currencyDisplay: "narrowSymbol", notation: "compact" })
							: metric.footerLabel.includes("percent")
								? percentValue(metric.footerValue)
								: number(metric.footerValue, { maximumFractionDigits: 2 })
					}
					footerLabel={metric.footerLabel}
					tooltip={metric.info}
					icon={
						metric.id === "email" ? (
							<MailBoldIcon size={20} />
						) : metric.id === "twitter" ? (
							<Twitter2BoldIcon size={20} />
						) : undefined
					}
				/>
			))}
			<BarChartCard
				className="h-auto min-h-73 md:col-span-2 xl:col-span-1 xl:col-start-4 xl:row-span-2 xl:row-start-1"
				title="Wallet balance, USD"
				data={highlightsQuery.data.balanceDistribution}
				config={walletBalanceChartConfig}
			/>
		</section>
	);
}

/**
 * Renders the loading layout for wallet highlights.
 */
function WalletHighlightsSkeleton({ ref, className }: ComponentPropsWithRef<"section">) {
	return (
		<section
			ref={ref}
			data-slot="token-highlights"
			className={cn("grid gap-5 md:grid-cols-2 xl:grid-cols-4 xl:grid-rows-[136px_136px]", className)}
		>
			{Array.from({ length: 6 }, (_, index) => (
				<Card key={index}>
					<CardContent className="space-y-4 py-5">
						<Skeleton className="h-5 w-24" />
						<Skeleton className="h-7 w-32" />
						<Skeleton className="h-5 w-40" />
					</CardContent>
				</Card>
			))}
			<Card className="min-h-73 md:col-span-2 xl:col-span-1 xl:col-start-4 xl:row-span-2 xl:row-start-1">
				<CardContent className="space-y-5 py-5">
					<Skeleton className="h-5 w-40" />
					<Skeleton className="h-52 w-full" />
				</CardContent>
			</Card>
		</section>
	);
}
