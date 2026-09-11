/**
 * Kinds of summary metrics displayed for an Explore resource audience.
 */
export type MetricKind = "activity" | "balance" | "email" | "influencers" | "nfts" | "twitter";

/**
 * Summary metric displayed above a resource wallet table.
 */
export interface HighlightMetric {
	title: string;
	value: number;
	description: string;
	footer_value: number;
	footer_label: string;
	kind: MetricKind;
	info?: string;
}

/**
 * Datum displayed in an Explore chart.
 */
export interface ChartDatum {
	label: string;
	value: number;
	fill?: string;
}

/**
 * Numeric balance bucket displayed in an audience distribution chart.
 */
export interface BalanceDistributionDatum {
	label: number;
	value: number;
}

/**
 * Metric displayed in an Explore insights section.
 */
export interface InsightMetric {
	title: string;
	value: number;
	description: string;
	footer_value: number;
	footer_label: string;
	info?: string;
}

/**
 * Aggregate transaction metric displayed in an insights section.
 */
export interface TransactionStat {
	label: string;
	value: number;
	tone: "default" | "negative" | "positive";
}

/**
 * Influencer identity displayed in an Explore insights section.
 */
export interface Influencer {
	name: string;
	username: string;
	followers: number;
	nfts: number;
	balance: number;
	avatar: string;
}

/**
 * Collection overlap displayed in an Explore insights section.
 */
export interface AudienceOverlap {
	name: string;
	avatar: string;
	owners_in_audience: number;
	share_in_audience: number;
	owners: number;
	items_in_audience: number;
	items: number;
	floor_price: number;
	chain: "ethereum" | "polygon";
}

/**
 * Tag assigned to a wallet in an Explore audience.
 */
export interface AudienceWalletTag {
	name: string;
	tone: "blue" | "green" | "orange" | "pink" | "purple" | "yellow";
}

/**
 * Activity identity displayed in an Explore audience wallet row.
 */
export interface AudienceWalletActivity {
	avatar: string;
	name: string;
}

/**
 * Contact providers supported by an Explore audience wallet row.
 */
export type AudienceWalletContact = "email" | "link" | "mirror" | "opensea" | "twitter";

/**
 * Common Explore resource directory fields.
 */
export interface ExploreResource {
	id: number;
	slug: string;
	name: string;
	avatar: string;
	owners: number;
	active_wallets: number;
	supply: number;
	price: number;
	chain: "ethereum" | "polygon";
	wallet_count: number;
}
