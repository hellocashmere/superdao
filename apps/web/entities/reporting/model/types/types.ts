/**
 * A wallet contact provider displayed in reporting.
 */
export type ReportingContact = "link" | "mirror" | "opensea" | "twitter";

/**
 * A tracked action displayed in reporting.
 */
export type ReportingAction = "WALLET_CONNECT" | "PAGE_VIEW" | "TARGET_ACTION_MINT";

/**
 * A wallet activity row displayed in reporting.
 */
export interface ReportingWalletView {
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
	occurredAt: string;
	/**
	 * Wallet rank at the time of the reporting event.
	 */
	rank: number;
	/**
	 * Tracked action represented by the reporting event.
	 */
	target: ReportingAction;
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
	contacts: readonly ReportingContact[];
}

/**
 * A source distribution row displayed in reporting.
 */
export interface ReportingSourceRowView {
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
 * A source distribution summary displayed in reporting.
 */
export interface ReportingSourceSummaryView {
	/**
	 * Display title.
	 */
	title: string;
	/**
	 * Source rows included in the summary.
	 */
	rows: readonly ReportingSourceRowView[];
}

/**
 * A conversion measurement displayed in the reporting chart.
 */
export interface ReportingConversionDatumView {
	/**
	 * Date associated with the record.
	 */
	date: string;
	/**
	 * Number of page-view conversions.
	 */
	pageView: number;
	/**
	 * Number of wallet-connect conversions.
	 */
	walletConnect: number;
	/**
	 * Number of mint conversions.
	 */
	mint: number;
}

/**
 * A complete reporting account view.
 */
export interface ReportingView {
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
	walletCount: number;
	/**
	 * Wallet activity rows in the reporting account.
	 */
	wallets: readonly ReportingWalletView[];
	/**
	 * Source-distribution summaries for the reporting account.
	 */
	sourceSummaries: readonly ReportingSourceSummaryView[];
	/**
	 * Time-series conversion measurements.
	 */
	conversionData: readonly ReportingConversionDatumView[];
}
