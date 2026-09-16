"use client";

import type { ComponentPropsWithRef } from "react";

import { cn } from "@superdao/lib/utils";

import { useGetNftCollectionInsights } from "@/entities/nft-collection";
import { InsightsSkeleton } from "@/shared/ui/insights-skeleton";

import { CollectionAudienceOverlap } from "./components/audience-overlap";
import { CollectionBalanceAndTransactions } from "./components/balance-and-transactions";
import { CollectionContactsInsights } from "./components/contacts";
import { CollectionWalletProfileInsights } from "./components/wallet-profile";

export interface CollectionInsightsTabProps extends ComponentPropsWithRef<"div"> {
	collectionID: number;
}

/**
 * Composes the collection Insights tab content.
 */
export function CollectionInsightsTab({ ref, className, collectionID, ...props }: CollectionInsightsTabProps) {
	const insightsQuery = useGetNftCollectionInsights(collectionID);

	if (insightsQuery.error) throw insightsQuery.error;

	if (insightsQuery.isPending) {
		return (
			<div
				ref={ref}
				data-slot="collection-insights"
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
			data-slot="collection-insights"
			data-state="ready"
			className={cn("space-y-6", className)}
			{...props}
		>
			<CollectionBalanceAndTransactions
				metrics={insights.balanceMetrics}
				nftAllocation={insights.nftAllocation}
				transactionStats={insights.transactionStats}
				walletBalance={insights.walletBalance}
			/>
			<CollectionContactsInsights
				influencers={insights.influencers}
				metrics={insights.contactMetrics}
			/>
			<CollectionWalletProfileInsights
				interests={insights.interests}
				personas={insights.personas}
				superrank={insights.superrank}
			/>
			<CollectionAudienceOverlap overlap={insights.overlap} />
		</div>
	);
}
