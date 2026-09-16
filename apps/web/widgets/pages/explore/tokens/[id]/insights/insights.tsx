"use client";

import type { ComponentPropsWithRef } from "react";

import { cn } from "@superdao/lib/utils";

import { useGetTokenInsights } from "@/entities/token";
import { InsightsSkeleton } from "@/shared/ui/insights-skeleton";

import { TokenAudienceOverlap } from "./components/audience-overlap";
import { TokenBalanceAndTransactions } from "./components/balance-and-transactions";
import { TokenContactsInsights } from "./components/contacts";
import { TokenWalletProfileInsights } from "./components/wallet-profile";

export interface TokenInsightsTabProps extends ComponentPropsWithRef<"div"> {
	tokenID: number;
}

/**
 * Composes the token Insights tab content.
 */
export function TokenInsightsTab({ ref, className, tokenID, ...props }: TokenInsightsTabProps) {
	const insightsQuery = useGetTokenInsights(tokenID);

	if (insightsQuery.error) throw insightsQuery.error;

	if (insightsQuery.isPending) {
		return (
			<div
				ref={ref}
				data-slot="token-insights"
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
			data-slot="token-insights"
			data-state="ready"
			className={cn("space-y-6", className)}
			{...props}
		>
			<TokenBalanceAndTransactions
				metrics={insights.balanceMetrics}
				nftAllocation={insights.nftAllocation}
				transactionStats={insights.transactionStats}
				walletBalance={insights.walletBalance}
			/>
			<TokenContactsInsights
				influencers={insights.influencers}
				metrics={insights.contactMetrics}
			/>
			<TokenWalletProfileInsights
				interests={insights.interests}
				personas={insights.personas}
				superrank={insights.superrank}
			/>
			<TokenAudienceOverlap overlap={insights.overlap} />
		</div>
	);
}
