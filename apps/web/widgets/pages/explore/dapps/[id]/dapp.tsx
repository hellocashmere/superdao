"use client";

import type { ComponentPropsWithRef } from "react";

import { useNumberFormatter } from "@superdao/hooks/use-number-formatter";
import { WarningIcon } from "@superdao/icons/outline";
import { cn } from "@superdao/lib/utils";
import { Alert, AlertDescription, AlertTitle } from "@superdao/ui/components/alert";
import { Tabs, TabsContent } from "@superdao/ui/components/tabs";

import { useGetDapp, useGetDappHighlights, useGetDappInsights, useGetDappWallets } from "@/entities/dapp";
import { throwResourceError } from "@/shared/api";
import { Container } from "@/shared/ui/container";
import { PageBody } from "@/shared/ui/page-layout";

import { DappIDHeader } from "./components/header";
import { DappDetailsSkeleton } from "./components/skeleton";
import { DappInsightsTab } from "./insights/insights";
import { DappWalletsTab } from "./wallets/wallets";

export interface ExploreDappDetailsPageProps extends ComponentPropsWithRef<"div"> {
	/**
	 * Backend-provided ID of the dapp to display.
	 */
	dappID: number;

	/**
	 * Detail tab selected by the current route.
	 */
	tab: "insights" | "wallets";
}

/**
 * Renders the wallet directory for a selected dapp.
 */
export function ExploreDappDetailsPage({ ref, className, dappID, tab, ...props }: ExploreDappDetailsPageProps) {
	const { compact } = useNumberFormatter();
	const dappQuery = useGetDapp(dappID);
	const walletsQueryOptions = { enabled: tab === "wallets" };
	const insightsQueryOptions = { enabled: tab === "insights" };
	const highlightsQuery = useGetDappHighlights(dappID, walletsQueryOptions);
	const insightsQuery = useGetDappInsights(dappID, insightsQueryOptions);
	const walletsQuery = useGetDappWallets(dappID, walletsQueryOptions);
	const isTabPending =
		tab === "wallets" ? highlightsQuery.isPending || walletsQuery.isPending : insightsQuery.isPending;
	if (dappQuery.error) throwResourceError(dappQuery.error);

	if (dappQuery.isPending || isTabPending) {
		return (
			<DappDetailsSkeleton
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
				<DappIDHeader
					dappID={dappID}
					title={dappQuery.data.title}
					avatar={dappQuery.data.avatar}
					count={compact(dappQuery.data.walletCount)}
				/>
				<Alert
					className="mb-5"
					variant="destructive"
				>
					<WarningIcon aria-hidden="true" />
					<AlertTitle>Dapp activity is not real time</AlertTitle>
					<AlertDescription>
						New interactions can take up to 24 hours to reach wallet activity and ranking metrics.
					</AlertDescription>
				</Alert>
				<PageBody className="pb-16">
					<TabsContent value="wallets">{tab === "wallets" ? <DappWalletsTab dappID={dappID} /> : null}</TabsContent>
					<TabsContent value="insights">{tab === "insights" ? <DappInsightsTab dappID={dappID} /> : null}</TabsContent>
				</PageBody>
			</Tabs>
		</Container>
	);
}
