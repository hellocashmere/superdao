/**
 * A wallet contact provider returned by reporting endpoints.
 */
export type ReportingContactDTO = "link" | "mirror" | "opensea" | "twitter";

/**
 * A tracked reporting action returned by reporting endpoints.
 */
export type ReportingActionDTO = "WALLET_CONNECT" | "PAGE_VIEW" | "TARGET_ACTION_MINT";

/**
 * A reporting account shown in the application sidebar.
 */
export interface SidebarReportDTO {
	/**
	 * Unique reporting account ID.
	 */
	id: number;
	/**
	 * Reporting account title shown in navigation.
	 */
	title: string;
}

/**
 * A wallet activity row returned with a reporting account.
 */
export interface ReportingWalletDTO {
	/**
	 * Unique entity ID.
	 */
	id: number;
	/**
	 * Wallet address.
	 */
	wallet: string;
	/**
	 * Avatar URL.
	 */
	avatar: string;
	/**
	 * Timestamp when the reporting event occurred.
	 */
	occurred_at: string;
	/**
	 * Wallet rank at the time of the reporting event.
	 */
	rank: number;
	/**
	 * Tracked action represented by the reporting event.
	 */
	target: ReportingActionDTO;
	/**
	 * Traffic source attributed to the reporting event.
	 */
	source: string;
	/**
	 * Classification labels assigned to the wallet.
	 */
	labels: readonly string[];
	/**
	 * Wallet balance at the time of the event.
	 */
	balance: number;
	/**
	 * Number of NFTs held by the wallet.
	 */
	nfts: number;
	/**
	 * Contact methods available for the wallet.
	 */
	contacts: readonly ReportingContactDTO[];
}

/**
 * A source distribution row returned with reporting analytics.
 */
export interface ReportingSourceRowDTO {
	/**
	 * Traffic source attributed to the reporting event.
	 */
	source: string;
	/**
	 * Number of events attributed to the source.
	 */
	count: number;
	/**
	 * Percentage of events attributed to the source.
	 */
	percent: number;
	/**
	 * Relative chart width for the source.
	 */
	width: number;
}

/**
 * A source distribution summary returned with reporting analytics.
 */
export interface ReportingSourceSummaryDTO {
	/**
	 * Display title.
	 */
	title: string;
	/**
	 * Source rows included in the summary.
	 */
	rows: readonly ReportingSourceRowDTO[];
}

/**
 * A conversion measurement returned with reporting analytics.
 */
export interface ReportingConversionDatumDTO {
	/**
	 * Date associated with the record.
	 */
	date: string;
	/**
	 * Number of page-view conversions.
	 */
	page_view: number;
	/**
	 * Number of wallet-connect conversions.
	 */
	wallet_connect: number;
	/**
	 * Number of mint conversions.
	 */
	mint: number;
}

/**
 * A complete reporting account response.
 *
 * Endpoint: `GET /reports/:id`.
 */
export interface ReportingDTO {
	/**
	 * Unique entity ID.
	 */
	id: number;
	/**
	 * Display title.
	 */
	title: string;
	/**
	 * Number of wallets.
	 */
	wallet_count: number;
	/**
	 * Wallet activity rows in the reporting account.
	 */
	wallets: readonly ReportingWalletDTO[];
	/**
	 * Source-distribution summaries for the reporting account.
	 */
	source_summaries: readonly ReportingSourceSummaryDTO[];
	/**
	 * Time-series conversion measurements.
	 */
	conversion_data: readonly ReportingConversionDatumDTO[];
}
