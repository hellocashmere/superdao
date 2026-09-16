"use client";

import type { ComponentPropsWithRef } from "react";

import { InfoIcon } from "@superdao/icons/outline";
import { cn } from "@superdao/lib/utils";
import { Alert, AlertDescription, AlertTitle } from "@superdao/ui/components/alert";
import { Card, CardContent } from "@superdao/ui/components/card";
import { Skeleton } from "@superdao/ui/components/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@superdao/ui/components/table";
import { Tabs, TabsContent } from "@superdao/ui/components/tabs";

import { useGetLabelDetails, useGetLabelHighlights, useGetLabelInsights, useGetLabelWallets } from "@/entities/label";
import { throwResourceError } from "@/shared/api";
import { Container } from "@/shared/ui/container";
import { PageBody, PageHeader } from "@/shared/ui/page-layout";

import { LabelIDHeader } from "./components/header";
import { LabelInsightsTab } from "./insights/insights";
import { LabelWalletsTab } from "./wallets/wallets";

export type LabelTabValue = "insights" | "wallets";

export interface ExploreLabelDetailsPageProps extends ComponentPropsWithRef<"div"> {
	label: number;
	tab: LabelTabValue;
}

/**
 * Renders the wallet directory and insights views for a selected label.
 */
export function ExploreLabelDetailsPage({ ref, className, label, tab, ...props }: ExploreLabelDetailsPageProps) {
	const detailsQuery = useGetLabelDetails(label);
	const walletsQueryOptions = { enabled: tab === "wallets" };
	const insightsQueryOptions = { enabled: tab === "insights" };
	const highlightsQuery = useGetLabelHighlights(label, walletsQueryOptions);
	const insightsQuery = useGetLabelInsights(label, insightsQueryOptions);
	const walletsQuery = useGetLabelWallets(label, walletsQueryOptions);
	const isTabPending =
		tab === "wallets" ? highlightsQuery.isPending || walletsQuery.isPending : insightsQuery.isPending;
	if (detailsQuery.error) throwResourceError(detailsQuery.error);

	if (detailsQuery.isPending || isTabPending) {
		return (
			<div
				ref={ref}
				aria-hidden="true"
				className={cn("absolute inset-0 z-10 flex min-h-0 flex-col bg-background px-5 sm:px-8", className)}
				{...props}
			>
				<PageHeader className="flex min-h-18 items-center justify-between gap-5">
					<div className="flex items-center gap-3">
						<Skeleton className="size-8" />
						<Skeleton className="size-8 rounded-full" />
						<Skeleton className="h-7 w-24" />
						<Skeleton className="h-6 w-16" />
					</div>
					<div className="flex items-center gap-4">
						<Skeleton className="h-8 w-40" />
						<Skeleton className="size-10" />
					</div>
				</PageHeader>

				<PageBody className="pb-16">
					<section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4 xl:grid-rows-[136px_136px]">
						{Array.from({ length: 6 }, (_, index) => (
							<Card
								key={index}
								className="min-h-34 xl:[&:nth-child(1)]:col-start-1 xl:[&:nth-child(2)]:col-start-2 xl:[&:nth-child(3)]:col-start-3 xl:[&:nth-child(4)]:col-start-1 xl:[&:nth-child(4)]:row-start-2 xl:[&:nth-child(5)]:col-start-2 xl:[&:nth-child(5)]:row-start-2 xl:[&:nth-child(6)]:col-start-3 xl:[&:nth-child(6)]:row-start-2"
							>
								<CardContent className="flex flex-1 flex-col py-3">
									<Skeleton className="h-5 w-28" />
									<Skeleton className="mt-2 h-7 w-24" />
									<Skeleton className="mt-1 h-[18px] w-36" />
									<Skeleton className="mt-auto h-[18px] w-20" />
								</CardContent>
							</Card>
						))}
						<Card className="min-h-[292px] md:col-span-2 xl:col-span-1 xl:col-start-4 xl:row-span-2 xl:row-start-1">
							<CardContent className="py-3">
								<Skeleton className="h-5 w-36" />
								<div className="mt-6 flex h-[220px] items-end gap-5 px-3">
									{[72, 50, 34, 18].map((height) => (
										<Skeleton
											key={height}
											className="flex-1"
											style={{ height: `${height}%` }}
										/>
									))}
								</div>
							</CardContent>
						</Card>
					</section>

					<Card className="mt-5 min-h-[794px]">
						<Table className="min-w-[1020px] table-fixed">
							<TableHeader>
								<TableRow className="h-[54px] border-0 hover:bg-transparent">
									{[
										["index", "w-2"],
										["wallet", "w-14"],
										["rank", "w-8"],
										["age", "w-6"],
										["labels", "w-12"],
										["balance", "w-14"],
										["nfts", "w-6"],
										["twitter", "w-9"],
										["activity", "w-10"],
										["contacts", "w-11"],
										["actions", "w-0"],
									].map(([column, width]) => (
										<TableHead
											key={column}
											data-column={column}
											className="px-5 pt-6 pb-3 data-[column=actions]:w-12 data-[column=activity]:w-[90px] data-[column=age]:w-[63px] data-[column=balance]:w-[93px] data-[column=contacts]:w-[132px] data-[column=index]:w-[29px] data-[column=labels]:w-[206px] data-[column=nfts]:w-[59px] data-[column=rank]:w-[75px] data-[column=twitter]:w-[70px] data-[column=wallet]:w-[171px]"
										>
											{column === "actions" ? null : <Skeleton className={cn("h-[18px]", width)} />}
										</TableHead>
									))}
								</TableRow>
							</TableHeader>
							<TableBody>
								{Array.from({ length: 12 }, (_, index) => (
									<TableRow
										key={index}
										className="h-14 border-0 hover:bg-transparent"
									>
										<TableCell className="px-5 py-0">
											<Skeleton className="h-4 w-2" />
										</TableCell>
										<TableCell className="px-5 py-0">
											<div className="flex items-center gap-2">
												<Skeleton className="size-7 shrink-0 rounded-full" />
												<Skeleton className="h-5 w-24" />
											</div>
										</TableCell>
										<TableCell className="px-5 py-0">
											<Skeleton className="h-5 w-7 rounded-md" />
										</TableCell>
										<TableCell className="px-5 py-0">
											<Skeleton className="h-5 w-8" />
										</TableCell>
										<TableCell className="px-5 py-0">
											<Skeleton className="h-4 w-28" />
										</TableCell>
										<TableCell className="px-5 py-0">
											<Skeleton className="ml-auto h-5 w-12" />
										</TableCell>
										<TableCell className="px-5 py-0">
											<Skeleton className="ml-auto h-5 w-7" />
										</TableCell>
										<TableCell className="px-5 py-0">
											<Skeleton className="ml-auto h-5 w-9" />
										</TableCell>
										<TableCell className="px-5 py-0">
											<Skeleton className="h-6 w-16 rounded-full" />
										</TableCell>
										<TableCell className="px-5 py-0">
											<Skeleton className="h-4 w-20" />
										</TableCell>
										<TableCell className="px-5 py-0">
											<Skeleton className="size-5 rounded-full" />
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>

						<div className="flex min-h-17 items-center justify-end gap-6 px-6 py-3">
							<div className="hidden items-center gap-2 lg:flex">
								<Skeleton className="h-[18px] w-20" />
								<Skeleton className="h-8 w-20" />
							</div>
							<Skeleton className="h-[18px] w-20" />
							<div className="flex gap-2">
								{Array.from({ length: 4 }, (_, index) => (
									<Skeleton
										key={index}
										className="size-8"
									/>
								))}
							</div>
						</div>
					</Card>
				</PageBody>
			</div>
		);
	}

	const details = detailsQuery.data;

	return (
		<Container
			ref={ref}
			className={cn("relative flex min-h-0 flex-1 flex-col", className)}
			{...props}
		>
			<Tabs
				value={tab}
				className="gap-0"
			>
				<LabelIDHeader
					labelID={details.id}
					labelSlug={details.slug}
					title={details.title}
					walletCount={details.walletCount}
					color={details.color}
				/>
				<Alert
					className="mb-5"
					variant="info"
				>
					<InfoIcon aria-hidden="true" />
					<AlertTitle>Audience membership refreshes daily</AlertTitle>
					<AlertDescription>Newly classified wallets can take up to 24 hours to appear in this label.</AlertDescription>
				</Alert>
				<PageBody className="pb-16">
					<TabsContent value="wallets">{tab === "wallets" ? <LabelWalletsTab label={label} /> : null}</TabsContent>
					<TabsContent value="insights">{tab === "insights" ? <LabelInsightsTab label={label} /> : null}</TabsContent>
				</PageBody>
			</Tabs>
		</Container>
	);
}
