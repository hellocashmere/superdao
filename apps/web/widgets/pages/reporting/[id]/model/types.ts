/**
 * A reporting period selected in the wallet table.
 */
export type ReportingPeriod = "All time" | "Custom period" | "Today" | "Last 7 days" | "Last 30 days";

/**
 * A custom reporting date range selected in the wallet table.
 */
export interface ReportingDateRange {
	from: Date | undefined;
	to?: Date;
}
