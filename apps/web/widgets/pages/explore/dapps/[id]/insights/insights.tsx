"use client";

import type { ComponentPropsWithRef } from "react";

import { cn } from "@superdao/lib/utils";

import { useGetDappInsights } from "@/entities/dapp";
import { InsightsSkeleton } from "@/shared/ui/insights-skeleton";

import { DappAudienceOverlap } from "./components/audience-overlap";
import { DappBalanceAndTransactions } from "./components/balance-and-transactions";
import { DappContactsInsights } from "./components/contacts";
import { DappWalletProfileInsights } from "./components/wallet-profile";

export interface DappInsightsTabProps extends ComponentPropsWithRef<"div"> {
	dappID: number;
}

/**
 * Composes the dapp Insights tab content.
 */
export function DappInsightsTab({ ref, className, dappID, ...props }: DappInsightsTabProps) {
	const insightsQuery = useGetDappInsights(dappID);

	if (insightsQuery.error) throw insightsQuery.error;

	if (insightsQuery.isPending) {
		return (
			<div
				ref={ref}
				data-slot="dapp-insights"
				data-state="loading"
				className={className}
				{...props}
			>
				<InsightsSkeleton />
			</div>
		);
	}

	const insights = insightsQuery.data;

	return (
		<div
			ref={ref}
			data-slot="dapp-insights"
			data-state="ready"
			className={cn("space-y-6", className)}
			{...props}
		>
			<DappBalanceAndTransactions
				metrics={insights.balanceMetrics}
				nftAllocation={insights.nftAllocation}
				transactionStats={insights.transactionStats}
				walletBalance={insights.walletBalance}
			/>
			<DappContactsInsights
				influencers={insights.influencers}
				metrics={insights.contactMetrics}
			/>
			<DappWalletProfileInsights
				interests={insights.interests}
				personas={insights.personas}
				superrank={insights.superrank}
			/>
			<DappAudienceOverlap overlap={insights.overlap} />
		</div>
	);
}
