"use client";

import type { ComponentPropsWithRef } from "react";

import { WarningIcon } from "@superdao/icons/outline";
import { cn } from "@superdao/lib/utils";
import { Alert, AlertDescription, AlertTitle } from "@superdao/ui/components/alert";
import { Tabs, TabsContent } from "@superdao/ui/components/tabs";

import { useGetAudienceByID } from "@/entities/audience";
import { useGetLabelBySlug, useGetLabelHighlights, useGetLabelInsights, useGetLabelWallets } from "@/entities/label";
import { Container } from "@/shared/ui/container";
import { PageBody } from "@/shared/ui/page-layout";

import { AudienceIDHeader } from "./components/header";
import { AudienceDetailsSkeleton } from "./components/skeleton";
import { AudienceInsightsTab } from "./insights/insights";
import { AudienceWalletsTab } from "./wallets/wallets";

export interface AudienceDetailsPageProps extends ComponentPropsWithRef<"div"> {
	audienceID: string;
	tab: "insights" | "wallets";
}

/**
 * Renders wallets and insights for a selected audience.
 */
export function AudienceDetailsPage({ ref, audienceID, className, tab, ...props }: AudienceDetailsPageProps) {
	const numericAudienceID = Number(audienceID);
	const audienceQuery = useGetAudienceByID(numericAudienceID);
	const sourceLabelQuery = useGetLabelBySlug("music");
	const audience = audienceQuery.data;
	const audienceTitle = audience?.title ?? `Audience ${audienceID}`;
	const sourceLabel = sourceLabelQuery.data;
	const sourceLabelID = sourceLabel?.id ?? 0;
	const walletsQueryOptions = { enabled: sourceLabel !== undefined && tab === "wallets" };
	const insightsQueryOptions = { enabled: sourceLabel !== undefined && tab === "insights" };
	const highlightsQuery = useGetLabelHighlights(sourceLabelID, walletsQueryOptions);
	const insightsQuery = useGetLabelInsights(sourceLabelID, insightsQueryOptions);
	const walletsQuery = useGetLabelWallets(sourceLabelID, walletsQueryOptions);
	const isTabPending =
		sourceLabel !== undefined &&
		(tab === "wallets" ? highlightsQuery.isPending || walletsQuery.isPending : insightsQuery.isPending);

	if (audienceQuery.error) throw audienceQuery.error;
	if (sourceLabelQuery.error) throw sourceLabelQuery.error;

	if (audienceQuery.isPending || sourceLabelQuery.isPending || isTabPending) {
		return (
			<AudienceDetailsSkeleton
				ref={ref}
				className={className}
				{...props}
			/>
		);
	}

	if (!sourceLabel) throw new Error("Audience demo data source was not found.");

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
				<AudienceIDHeader
					audienceID={audienceID}
					title={audienceTitle}
					count={(audience?.walletCount ?? 0).toLocaleString("ru-RU")}
				/>

				<Alert
					className="mb-5"
					variant="warning"
				>
					<WarningIcon aria-hidden="true" />
					<AlertTitle>Wallet data is updated daily</AlertTitle>
					<AlertDescription>Metrics may take up to 24 hours to reflect the latest on-chain activity.</AlertDescription>
				</Alert>

				<PageBody className="pb-16">
					<TabsContent value="wallets">
						{tab === "wallets" ? <AudienceWalletsTab sourceLabelID={sourceLabel.id} /> : null}
					</TabsContent>
					<TabsContent value="insights">
						{tab === "insights" ? <AudienceInsightsTab sourceLabelID={sourceLabel.id} /> : null}
					</TabsContent>
				</PageBody>
			</Tabs>
		</Container>
	);
}
