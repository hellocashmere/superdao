"use client";

import type { ComponentPropsWithRef } from "react";

import { useNumberFormatter } from "@superdao/hooks/use-number-formatter";
import { cn } from "@superdao/lib/utils";
import { Spinner } from "@superdao/ui/components/spinner";

import { useGetReporting } from "@/entities/reporting";
import { Container } from "@/shared/ui/container";
import { PageBody, PageHeaderID } from "@/shared/ui/page-layout";

import { ConversionChart } from "./components/conversion-chart";
import { SourceSummaryGrid } from "./components/source-summary-grid";
import { ReportingTable } from "./components/wallet-table/table";

export interface ReportingPageProps extends ComponentPropsWithRef<typeof Container> {
	accountID: number;
}

/**
 * Loads and renders the reporting dashboard for an account.
 */
export function ReportingPage({ ref, accountID, className, ...props }: ReportingPageProps) {
	const reportingQuery = useGetReporting(accountID);
	const { compact } = useNumberFormatter();

	if (reportingQuery.error) throw reportingQuery.error;

	return (
		<Container
			ref={ref}
			data-slot="reporting-page"
			className={cn("flex min-h-0 flex-1 flex-col lg:px-8", className)}
			{...props}
		>
			{reportingQuery.data ? (
				<>
					<PageHeaderID
						data-slot="reporting-id-header"
						title={reportingQuery.data.title}
						count={compact(reportingQuery.data.walletCount)}
					/>
					<PageBody className="space-y-5 pb-14">
						<ConversionChart data={reportingQuery.data.conversionData} />
						<SourceSummaryGrid summaries={reportingQuery.data.sourceSummaries} />
						<ReportingTable wallets={reportingQuery.data.wallets} />
					</PageBody>
				</>
			) : (
				<div className="flex min-h-96 flex-1 items-center justify-center">
					<Spinner
						size="large"
						variant="subdued"
					/>
					<span className="sr-only">Loading reporting</span>
				</div>
			)}
		</Container>
	);
}
