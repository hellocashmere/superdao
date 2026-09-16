import type { ComponentPropsWithRef } from "react";

import { useNumberFormatter } from "@superdao/hooks/use-number-formatter";
import type { ChartConfig } from "@superdao/ui/components/chart";

import type { DappChartDatumView, DappInsightMetricView, DappTransactionStatView } from "@/entities/dapp";
import { BarChartCard } from "@/shared/ui/charts";
import { MetricCard } from "@/shared/ui/metric-card";

import { DappTransactionStats } from "./transaction-stats";

const walletBalanceChartConfig = { value: { label: "Wallets", color: "var(--chart-1)" } } satisfies ChartConfig;
const nftAllocationChartConfig = { value: { label: "Wallets", color: "var(--chart-2)" } } satisfies ChartConfig;

export interface DappBalanceAndTransactionsProps extends ComponentPropsWithRef<"section"> {
	/**
	 * Summary metrics for wallet balances and transaction activity.
	 */
	metrics: readonly DappInsightMetricView[];

	/**
	 * Distribution of wallets by NFT holdings.
	 */
	nftAllocation: readonly DappChartDatumView[];

	/**
	 * Aggregated transaction values grouped by period.
	 */
	transactionStats: readonly DappTransactionStatView[];

	/**
	 * Distribution of wallets by balance range.
	 */
	walletBalance: readonly DappChartDatumView[];
}

/**
 * Renders balance distributions and recent transaction metrics.
 */
export function DappBalanceAndTransactions({
	ref,
	className,
	metrics,
	nftAllocation,
	transactionStats,
	walletBalance,
	...props
}: DappBalanceAndTransactionsProps) {
	const { compact, currency, percentValue } = useNumberFormatter();

	return (
		<section
			ref={ref}
			data-slot="dapp-balance-and-transactions"
			className={className}
			{...props}
		>
			<h2 className="flex h-14 items-center text-xl/6 font-bold">Balances and transactions</h2>
			<div className="grid gap-5 xl:grid-cols-4">
				<div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-1">
					{metrics.map((metric) => (
						<MetricCard
							key={metric.title}
							title={metric.title}
							value={
								metric.title.toLowerCase().includes("balance") ? currency(metric.value, "USD") : compact(metric.value)
							}
							description={metric.description}
							footerValue={`${metric.footerLabel.includes("percent") ? percentValue(metric.footerValue) : compact(metric.footerValue)} ${metric.footerLabel}`}
						/>
					))}
				</div>
				<BarChartCard
					title="Wallet balance, USD"
					description="Based on ETH, USDT, USDC, DAI"
					data={walletBalance}
					config={walletBalanceChartConfig}
				/>
				<BarChartCard
					className="xl:col-span-2"
					title="NFT allocation"
					description="NFTs per wallet"
					data={nftAllocation}
					config={nftAllocationChartConfig}
				/>
			</div>
			<DappTransactionStats
				className="mt-5 min-h-29"
				stats={transactionStats}
			/>
		</section>
	);
}
