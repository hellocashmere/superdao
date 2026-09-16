"use client";

import type { ComponentPropsWithRef } from "react";

import { useNumberFormatter } from "@superdao/hooks/use-number-formatter";
import { RefreshIcon } from "@superdao/icons/outline";
import { cn } from "@superdao/lib/utils";
import { Alert, AlertDescription, AlertTitle } from "@superdao/ui/components/alert";
import { Tabs, TabsContent } from "@superdao/ui/components/tabs";

import { useGetToken, useGetTokenHighlights, useGetTokenInsights, useGetTokenWallets } from "@/entities/token";
import { throwResourceError } from "@/shared/api";
import { Container } from "@/shared/ui/container";
import { PageBody } from "@/shared/ui/page-layout";

import { TokenIDHeader } from "./components/header";
import { TokenDetailsSkeleton } from "./components/skeleton";
import { TokenInsightsTab } from "./insights/insights";
import { TokenWalletsTab } from "./wallets/wallets";

export interface ExploreTokenDetailsPageProps extends ComponentPropsWithRef<"div"> {
	/**
	 * Backend-provided ID of the token to display.
	 */
	tokenID: number;
	tab: "insights" | "wallets";
}

/**
 * Renders the wallet directory for a selected token.
 */
export function ExploreTokenDetailsPage({ ref, className, tab, tokenID, ...props }: ExploreTokenDetailsPageProps) {
	const { compact } = useNumberFormatter();
	const tokenQuery = useGetToken(tokenID);
	const walletsQueryOptions = { enabled: tab === "wallets" };
	const insightsQueryOptions = { enabled: tab === "insights" };
	const highlightsQuery = useGetTokenHighlights(tokenID, walletsQueryOptions);
	const insightsQuery = useGetTokenInsights(tokenID, insightsQueryOptions);
	const walletsQuery = useGetTokenWallets(tokenID, walletsQueryOptions);
	const isTabPending =
		tab === "wallets" ? highlightsQuery.isPending || walletsQuery.isPending : insightsQuery.isPending;
	if (tokenQuery.error) throwResourceError(tokenQuery.error);

	if (tokenQuery.isPending || isTabPending) {
		return (
			<TokenDetailsSkeleton
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
				<TokenIDHeader
					tokenID={tokenID}
					title={tokenQuery.data.title}
					avatar={tokenQuery.data.avatar}
					count={compact(tokenQuery.data.walletCount)}
				/>
				<Alert
					className="mb-5"
					variant="constructive"
				>
					<RefreshIcon aria-hidden="true" />
					<AlertTitle>Token balances are reconciled every day</AlertTitle>
					<AlertDescription>
						Each refresh folds in the latest indexed transfers and recalculates wallet rankings.
					</AlertDescription>
				</Alert>
				<PageBody className="pb-16">
					<TabsContent value="wallets">{tab === "wallets" ? <TokenWalletsTab tokenID={tokenID} /> : null}</TabsContent>
					<TabsContent value="insights">
						{tab === "insights" ? <TokenInsightsTab tokenID={tokenID} /> : null}
					</TabsContent>
				</PageBody>
			</Tabs>
		</Container>
	);
}
