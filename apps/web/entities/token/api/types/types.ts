/**
 * A token returned by the Explore directory and details endpoints.
 *
 * Endpoints: `GET /tokens`, `GET /tokens/:id`.
 */
export interface TokenDTO {
	/**
	 * Unique token ID.
	 */
	id: number;
	/**
	 * URL-safe token ID.
	 */
	slug: string;
	/**
	 * Token title.
	 */
	title: string;
	/**
	 * Token avatar URL.
	 */
	avatar: string;
	/**
	 * Number of token owners.
	 */
	owners: number;
	/**
	 * Number of active wallets.
	 */
	active_wallets: number;
	/**
	 * Total token supply.
	 */
	supply: number;
	/**
	 * Current token price.
	 */
	price: number;
	/**
	 * Blockchain hosting the token.
	 */
	chain: "ethereum" | "polygon";
	/**
	 * Number of wallets in the token audience.
	 */
	wallet_count: number;
}

/**
 * A summary metric displayed above the token wallet table.
 */
export interface TokenMetricDTO {
	/**
	 * Stable metric ID.
	 */
	id: "activity" | "balance" | "email" | "influencers" | "nfts" | "twitter";
	/**
	 * Human-readable metric title.
	 */
	title: string;
	/**
	 * Numeric metric value.
	 */
	value: number;
	/**
	 * Explanation of the metric value.
	 */
	description: string;
	/**
	 * Numeric value displayed in the metric footer.
	 */
	footer_value: number;
	/**
	 * Label describing the footer value.
	 */
	footer_label: string;
	/**
	 * Optional tooltip information.
	 */
	info?: string;
}

/**
 * A bar in a token distribution chart.
 */
export interface TokenChartDatumDTO {
	/**
	 * Label displayed for the chart bucket.
	 */
	label: string | number;
	/**
	 * Numeric value represented by the chart bucket.
	 */
	value: number;
	/**
	 * Optional chart color override.
	 */
	fill?: string;
}

/**
 * Highlights displayed above the token wallet table.
 *
 * Endpoint: `GET /tokens/:id/highlights`.
 */
export interface TokenHighlightsDTO {
	/**
	 * Stable highlights response ID.
	 */
	id: string;
	/**
	 * ID of the token these highlights describe.
	 */
	token_id: number;
	/**
	 * Summary metrics shown above the wallet table.
	 */
	metrics: readonly TokenMetricDTO[];
	/**
	 * Balance distribution chart data.
	 */
	balance_distribution: readonly TokenChartDatumDTO[];
}

/**
 * A classification assigned to a token wallet.
 */
export interface TokenWalletTagDTO {
	/**
	 * Wallet label title.
	 */
	title: string;
	/**
	 * Visual variant used to render the wallet label.
	 */
	variant: "blue" | "green" | "orange" | "pink" | "purple" | "yellow";
}

/**
 * An activity identity associated with a token wallet.
 */
export interface TokenWalletActivityDTO {
	/**
	 * Activity avatar URL.
	 */
	avatar: string;
	/**
	 * Activity title.
	 */
	title: string;
}

/**
 * A wallet returned for a token audience.
 *
 * Endpoint: `GET /tokens/:id/wallets`.
 */
export interface TokenWalletDTO {
	/**
	 * Unique wallet ID.
	 */
	id: number;
	/**
	 * ID of the token that owns this wallet row.
	 */
	token_id: number;
	/**
	 * Wallet title.
	 */
	title: string;
	/**
	 * Wallet avatar URL.
	 */
	avatar: string;
	/**
	 * Wallet rank within the token audience.
	 */
	rank: number;
	/**
	 * Human-readable wallet age.
	 */
	age: string;
	/**
	 * Detailed wallet age when available.
	 */
	age_details?: string;
	/**
	 * Labels assigned to the wallet.
	 */
	labels: readonly TokenWalletTagDTO[];
	/**
	 * Wallet balance.
	 */
	balance: number;
	/**
	 * Number of NFTs owned by the wallet.
	 */
	nfts: number;
	/**
	 * Twitter follower count when available.
	 */
	twitter: number | null;
	/**
	 * Recent activity identities.
	 */
	activity: readonly TokenWalletActivityDTO[];
	/**
	 * Contact methods available for the wallet.
	 */
	contacts: readonly ("email" | "link" | "mirror" | "opensea" | "twitter")[];
}

/**
 * A metric card displayed in token analytics.
 */
export interface TokenInsightMetricDTO {
	/**
	 * Insight metric title.
	 */
	title: string;
	/**
	 * Numeric insight metric value.
	 */
	value: number;
	/**
	 * Explanation of the insight metric.
	 */
	description: string;
	/**
	 * Numeric value displayed in the metric footer.
	 */
	footer_value: number;
	/**
	 * Label describing the metric footer value.
	 */
	footer_label: string;
	/**
	 * Optional tooltip information.
	 */
	info?: string;
}

/**
 * A transaction aggregate displayed in token analytics.
 */
export interface TokenTransactionStatDTO {
	/**
	 * Transaction aggregate label.
	 */
	label: string;
	/**
	 * Numeric transaction aggregate value.
	 */
	value: number;
	/**
	 * Visual variant for the transaction aggregate.
	 */
	variant: "default" | "negative" | "positive";
}

/**
 * A Twitter profile found in a token audience.
 */
export interface TokenInfluencerDTO {
	/**
	 * Influencer title.
	 */
	title: string;
	/**
	 * Influencer social-media handle.
	 */
	username: string;
	/**
	 * Influencer follower count.
	 */
	followers: number;
	/**
	 * Number of NFTs owned by the influencer.
	 */
	nfts: number;
	/**
	 * Influencer wallet balance.
	 */
	balance: number;
	/**
	 * Influencer avatar URL.
	 */
	avatar: string;
}

/**
 * An NFT collection that overlaps with a token audience.
 */
export interface TokenOverlapDTO {
	/**
	 * Overlapping collection title.
	 */
	title: string;
	/**
	 * Overlapping collection avatar URL.
	 */
	avatar: string;
	/**
	 * Number of collection owners in the token audience.
	 */
	owners_in_audience: number;
	/**
	 * Percentage of the token audience owning the collection.
	 */
	share_in_audience: number;
	/**
	 * Total number of collection owners.
	 */
	owners: number;
	/**
	 * Number of collection items owned by the token audience.
	 */
	items_in_audience: number;
	/**
	 * Total number of collection items.
	 */
	items: number;
	/**
	 * Collection floor price.
	 */
	floor_price: number;
	/**
	 * Blockchain hosting the collection.
	 */
	chain: "ethereum" | "polygon";
}

/**
 * Analytics displayed in the token Insights tab.
 *
 * Endpoint: `GET /tokens/:id/insights`.
 */
export interface TokenInsightsDTO {
	/**
	 * Stable insights response ID.
	 */
	id: string;
	/**
	 * ID of the token these insights describe.
	 */
	token_id: number;
	/**
	 * Balance-related insight metrics.
	 */
	balance_metrics: readonly TokenInsightMetricDTO[];
	/**
	 * Wallet balance distribution chart data.
	 */
	wallet_balance: readonly TokenChartDatumDTO[];
	/**
	 * NFT allocation chart data.
	 */
	nft_allocation: readonly TokenChartDatumDTO[];
	/**
	 * Aggregated transaction statistics.
	 */
	transaction_stats: readonly TokenTransactionStatDTO[];
	/**
	 * Contact-related insight metrics.
	 */
	contact_metrics: readonly TokenInsightMetricDTO[];
	/**
	 * Influencers found in the token audience.
	 */
	influencers: readonly TokenInfluencerDTO[];
	/**
	 * Superrank distribution chart data.
	 */
	superrank: readonly TokenChartDatumDTO[];
	/**
	 * Interest distribution chart data.
	 */
	interests: readonly TokenChartDatumDTO[];
	/**
	 * Persona distribution chart data.
	 */
	personas: readonly TokenChartDatumDTO[];
	/**
	 * Collections overlapping with the token audience.
	 */
	overlap: readonly TokenOverlapDTO[];
}
