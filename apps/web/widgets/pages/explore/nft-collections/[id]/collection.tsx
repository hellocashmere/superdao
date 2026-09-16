"use client";

import type { ComponentPropsWithRef } from "react";

import { useNumberFormatter } from "@superdao/hooks/use-number-formatter";
import { WarningIcon } from "@superdao/icons/outline";
import { cn } from "@superdao/lib/utils";
import { Alert, AlertDescription, AlertTitle } from "@superdao/ui/components/alert";
import { Tabs, TabsContent } from "@superdao/ui/components/tabs";

import {
	useGetNftCollection,
	useGetNftCollectionHighlights,
	useGetNftCollectionInsights,
	useGetNftCollectionWallets,
} from "@/entities/nft-collection";
import { throwResourceError } from "@/shared/api";
import { Container } from "@/shared/ui/container";
import { PageBody } from "@/shared/ui/page-layout";

import { CollectionIDHeader } from "./components/header";
import { CollectionDetailsSkeleton } from "./components/skeleton";
import { CollectionInsightsTab } from "./insights/insights";
import { CollectionWalletsTab } from "./wallets/wallets";

export interface ExploreNftCollectionDetailsPageProps extends ComponentPropsWithRef<"div"> {
	collectionID: number;
	tab: "insights" | "wallets";
}

/**
 * Renders the wallet directory for a selected NFT collection.
 */
export function ExploreNftCollectionDetailsPage({
	ref,
	className,
	collectionID,
	tab,
	...props
}: ExploreNftCollectionDetailsPageProps) {
	const { compact } = useNumberFormatter();
	const collectionQuery = useGetNftCollection(collectionID);
	const walletsQueryOptions = { enabled: tab === "wallets" };
	const insightsQueryOptions = { enabled: tab === "insights" };
	const highlightsQuery = useGetNftCollectionHighlights(collectionID, walletsQueryOptions);
	const insightsQuery = useGetNftCollectionInsights(collectionID, insightsQueryOptions);
	const walletsQuery = useGetNftCollectionWallets(collectionID, walletsQueryOptions);
	const isTabPending =
		tab === "wallets" ? highlightsQuery.isPending || walletsQuery.isPending : insightsQuery.isPending;
	if (collectionQuery.error) throwResourceError(collectionQuery.error);

	if (collectionQuery.isPending || isTabPending) {
		return (
			<CollectionDetailsSkeleton
				ref={ref}
				className={className}
				tab={tab}
				{...props}
			/>
		);
	}

	return (
		<Container
			ref={ref}
			className={cn("flex min-h-0 flex-1 flex-col", className)}
			{...props}
		>
			<Tabs
				value={tab}
				className="gap-0"
			>
				<CollectionIDHeader
					collectionID={collectionID}
					title={collectionQuery.data.title}
					avatar={collectionQuery.data.avatar}
					count={compact(collectionQuery.data.walletCount)}
				/>
				<Alert
					className="mb-5"
					variant="warning"
				>
					<WarningIcon aria-hidden="true" />
					<AlertTitle>Recent NFT transfers may not appear yet</AlertTitle>
					<AlertDescription>
						Ownership snapshots are rebuilt daily, so fresh transfers can remain pending for up to 24 hours.
					</AlertDescription>
				</Alert>
				<PageBody className="pb-16">
					<TabsContent value="wallets">
						{tab === "wallets" ? <CollectionWalletsTab collectionID={collectionID} /> : null}
					</TabsContent>
					<TabsContent value="insights">
						{tab === "insights" ? <CollectionInsightsTab collectionID={collectionID} /> : null}
					</TabsContent>
				</PageBody>
			</Tabs>
		</Container>
	);
}
