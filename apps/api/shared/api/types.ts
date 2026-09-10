/**
 * Kinds of summary metrics displayed for an Explore resource audience.
 */
export type MetricKind = "activity" | "balance" | "email" | "influencers" | "nfts" | "twitter";

/**
 * Summary metric displayed above a resource wallet table.
 */
export interface HighlightMetric {
	title: string;
	value: string;
	description: string;
	footer_value: string;
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
	display_value: string;
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
	value: string;
	description: string;
	footer: string;
	info?: string;
}

/**
 * Aggregate transaction metric displayed in an insights section.
 */
export interface TransactionStat {
	label: string;
	value: string;
	tone: "default" | "negative" | "positive";
}

/**
 * Influencer identity displayed in an Explore insights section.
 */
export interface Influencer {
	name: string;
	username: string;
	followers: string;
	nfts: string;
	balance: string;
	avatar: string;
}

/**
 * Collection overlap displayed in an Explore insights section.
 */
export interface AudienceOverlap {
	name: string;
	avatar: string;
	owners_in_audience: string;
	share_in_audience: string;
	owners: string;
	items_in_audience: string;
	items: string;
	floor_price: string;
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
	owners: string;
	active_wallets: string;
	supply: string;
	price: string;
	chain: "ethereum" | "polygon";
	wallet_count: string;
}
