/**
 * A dapp returned by the Explore directory and details endpoints.
 *
 * Endpoints: `GET /dapps`, `GET /dapps/:id`.
 */
export interface DappDTO {
	/**
	 * Unique dapp ID.
	 */
	id: number;
	/**
	 * URL-safe dapp ID.
	 */
	slug: string;
	/**
	 * Dapp title.
	 */
	title: string;
	/**
	 * Dapp avatar URL.
	 */
	avatar: string;
	/**
	 * Number of dapp owners.
	 */
	owners: number;
	/**
	 * Number of active wallets.
	 */
	active_wallets: number;
	/**
	 * Total dapp supply.
	 */
	supply: number;
	/**
	 * Current dapp price.
	 */
	price: number;
	/**
	 * Blockchain hosting the dapp.
	 */
	chain: "ethereum" | "polygon";
	/**
	 * Number of wallets in the dapp audience.
	 */
	wallet_count: number;
}

/**
 * A summary metric displayed above the dapp wallet table.
 */
export interface DappMetricDTO {
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
 * A bar in a dapp distribution chart.
 */
export interface DappChartDatumDTO {
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
 * Highlights displayed above the dapp wallet table.
 *
 * Endpoint: `GET /dapps/:id/highlights`.
 */
export interface DappHighlightsDTO {
	/**
	 * Stable highlights response ID.
	 */
	id: string;
	/**
	 * ID of the dapp these highlights describe.
	 */
	dapp_id: number;
	/**
	 * Summary metrics shown above the wallet table.
	 */
	metrics: readonly DappMetricDTO[];
	/**
	 * Balance distribution chart data.
	 */
	balance_distribution: readonly DappChartDatumDTO[];
}

/**
 * A classification assigned to a dapp wallet.
 */
export interface DappWalletTagDTO {
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
 * An activity identity associated with a dapp wallet.
 */
export interface DappWalletActivityDTO {
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
 * A wallet returned for a dapp audience.
 *
 * Endpoint: `GET /dapps/:id/wallets`.
 */
export interface DappWalletDTO {
	/**
	 * Unique wallet ID.
	 */
	id: number;
	/**
	 * ID of the dapp that owns this wallet row.
	 */
	dapp_id: number;
	/**
	 * Wallet title.
	 */
	title: string;
	/**
	 * Wallet avatar URL.
	 */
	avatar: string;
	/**
	 * Wallet rank within the dapp audience.
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
	labels: readonly DappWalletTagDTO[];
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
	activity: readonly DappWalletActivityDTO[];
	/**
	 * Contact methods available for the wallet.
	 */
	contacts: readonly ("email" | "link" | "mirror" | "opensea" | "twitter")[];
}

/**
 * A metric card displayed in dapp analytics.
 */
export interface DappInsightMetricDTO {
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
 * A transaction aggregate displayed in dapp analytics.
 */
export interface DappTransactionStatDTO {
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
 * A Twitter profile found in a dapp audience.
 */
export interface DappInfluencerDTO {
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
 * An NFT collection that overlaps with a dapp audience.
 */
export interface DappOverlapDTO {
	/**
	 * Overlapping collection title.
	 */
	title: string;
	/**
	 * Overlapping collection avatar URL.
	 */
	avatar: string;
	/**
	 * Number of collection owners in the dapp audience.
	 */
	owners_in_audience: number;
	/**
	 * Percentage of the dapp audience owning the collection.
	 */
	share_in_audience: number;
	/**
	 * Total number of collection owners.
	 */
	owners: number;
	/**
	 * Number of collection items owned by the dapp audience.
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
 * Analytics displayed in the dapp Insights tab.
 *
 * Endpoint: `GET /dapps/:id/insights`.
 */
export interface DappInsightsDTO {
	/**
	 * Stable insights response ID.
	 */
	id: string;
	/**
	 * ID of the dapp these insights describe.
	 */
	dapp_id: number;
	/**
	 * Balance-related insight metrics.
	 */
	balance_metrics: readonly DappInsightMetricDTO[];
	/**
	 * Wallet balance distribution chart data.
	 */
	wallet_balance: readonly DappChartDatumDTO[];
	/**
	 * NFT allocation chart data.
	 */
	nft_allocation: readonly DappChartDatumDTO[];
	/**
	 * Aggregated transaction statistics.
	 */
	transaction_stats: readonly DappTransactionStatDTO[];
	/**
	 * Contact-related insight metrics.
	 */
	contact_metrics: readonly DappInsightMetricDTO[];
	/**
	 * Influencers found in the dapp audience.
	 */
	influencers: readonly DappInfluencerDTO[];
	/**
	 * Superrank distribution chart data.
	 */
	superrank: readonly DappChartDatumDTO[];
	/**
	 * Interest distribution chart data.
	 */
	interests: readonly DappChartDatumDTO[];
	/**
	 * Persona distribution chart data.
	 */
	personas: readonly DappChartDatumDTO[];
	/**
	 * Collections overlapping with the dapp audience.
	 */
	overlap: readonly DappOverlapDTO[];
}
