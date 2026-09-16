"use client";

import type { ComponentPropsWithRef } from "react";

import { cn } from "@superdao/lib/utils";

import { useGetLabelInsights } from "@/entities/label";
import { InsightsSkeleton } from "@/shared/ui/insights-skeleton";

import { AudienceOverlap } from "./components/audience-overlap";
import { AudienceBalanceAndTransactions } from "./components/balance-and-transactions";
import { AudienceContactsInsights } from "./components/contacts";
import { AudienceWalletProfileInsights } from "./components/wallet-profile";

export interface AudienceInsightsTabProps extends ComponentPropsWithRef<"div"> {
	sourceLabelID: number;
}

/**
 * Composes the audience Insights tab content.
 */
export function AudienceInsightsTab({ ref, className, sourceLabelID, ...props }: AudienceInsightsTabProps) {
	const insightsQuery = useGetLabelInsights(sourceLabelID);

	if (insightsQuery.error) throw insightsQuery.error;

	if (insightsQuery.isPending) {
		return (
			<div
				ref={ref}
				data-slot="audience-insights"
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
			data-slot="audience-insights"
			data-state="ready"
			className={cn("space-y-6", className)}
			{...props}
		>
			<AudienceBalanceAndTransactions
				metrics={insights.balanceMetrics}
				nftAllocation={insights.nftAllocation}
				transactionStats={insights.transactionStats}
				walletBalance={insights.walletBalance}
			/>
			<AudienceContactsInsights
				influencers={insights.influencers}
				metrics={insights.contactMetrics}
			/>
			<AudienceWalletProfileInsights
				interests={insights.interests}
				personas={insights.personas}
				superrank={insights.superrank}
			/>
			<AudienceOverlap overlap={insights.overlap} />
		</div>
	);
}
