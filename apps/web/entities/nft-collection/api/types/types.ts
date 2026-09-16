/**
 * A NFT collection returned by the Explore directory and details endpoints.
 *
 * Endpoints: `GET /nft-collections`, `GET /nft-collections/:id`.
 */
export interface NftCollectionDTO {
	/**
	 * Unique NFT collection ID.
	 */
	id: number;
	/**
	 * URL-safe NFT collection ID.
	 */
	slug: string;
	/**
	 * NFT collection title.
	 */
	title: string;
	/**
	 * NFT collection avatar URL.
	 */
	avatar: string;
	/**
	 * Number of NFT collection owners.
	 */
	owners: number;
	/**
	 * Number of active wallets.
	 */
	active_wallets: number;
	/**
	 * Total NFT collection supply.
	 */
	supply: number;
	/**
	 * Current NFT collection price.
	 */
	price: number;
	/**
	 * Blockchain hosting the NFT collection.
	 */
	chain: "ethereum" | "polygon";
	/**
	 * Number of wallets in the NFT collection audience.
	 */
	wallet_count: number;
}

/**
 * A summary metric displayed above the NFT collection wallet table.
 */
export interface NftCollectionMetricDTO {
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
 * A bar in a NFT collection distribution chart.
 */
export interface NftCollectionChartDatumDTO {
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
 * Highlights displayed above the NFT collection wallet table.
 *
 * Endpoint: `GET /nft-collections/:id/highlights`.
 */
export interface NftCollectionHighlightsDTO {
	/**
	 * Stable highlights response ID.
	 */
	id: string;
	/**
	 * ID of the NFT collection these highlights describe.
	 */
	nft_collection_id: number;
	/**
	 * Summary metrics shown above the wallet table.
	 */
	metrics: readonly NftCollectionMetricDTO[];
	/**
	 * Balance distribution chart data.
	 */
	balance_distribution: readonly NftCollectionChartDatumDTO[];
}

/**
 * A classification assigned to a NFT collection wallet.
 */
export interface NftCollectionWalletTagDTO {
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
 * An activity identity associated with a NFT collection wallet.
 */
export interface NftCollectionWalletActivityDTO {
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
 * A wallet returned for a NFT collection audience.
 *
 * Endpoint: `GET /nft-collections/:id/wallets`.
 */
export interface NftCollectionWalletDTO {
	/**
	 * Unique wallet ID.
	 */
	id: number;
	/**
	 * ID of the NFT collection that owns this wallet row.
	 */
	nft_collection_id: number;
	/**
	 * Wallet title.
	 */
	title: string;
	/**
	 * Wallet avatar URL.
	 */
	avatar: string;
	/**
	 * Wallet rank within the NFT collection audience.
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
	labels: readonly NftCollectionWalletTagDTO[];
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
	activity: readonly NftCollectionWalletActivityDTO[];
	/**
	 * Contact methods available for the wallet.
	 */
	contacts: readonly ("email" | "link" | "mirror" | "opensea" | "twitter")[];
}

/**
 * A metric card displayed in NFT collection analytics.
 */
export interface NftCollectionInsightMetricDTO {
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
 * A transaction aggregate displayed in NFT collection analytics.
 */
export interface NftCollectionTransactionStatDTO {
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
 * A Twitter profile found in a NFT collection audience.
 */
export interface NftCollectionInfluencerDTO {
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
 * An NFT collection that overlaps with a NFT collection audience.
 */
export interface NftCollectionOverlapDTO {
	/**
	 * Overlapping collection title.
	 */
	title: string;
	/**
	 * Overlapping collection avatar URL.
	 */
	avatar: string;
	/**
	 * Number of collection owners in the NFT collection audience.
	 */
	owners_in_audience: number;
	/**
	 * Percentage of the NFT collection audience owning the collection.
	 */
	share_in_audience: number;
	/**
	 * Total number of collection owners.
	 */
	owners: number;
	/**
	 * Number of collection items owned by the NFT collection audience.
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
 * Analytics displayed in the NFT collection Insights tab.
 *
 * Endpoint: `GET /nft-collections/:id/insights`.
 */
export interface NftCollectionInsightsDTO {
	/**
	 * Stable insights response ID.
	 */
	id: string;
	/**
	 * ID of the NFT collection these insights describe.
	 */
	nft_collection_id: number;
	/**
	 * Balance-related insight metrics.
	 */
	balance_metrics: readonly NftCollectionInsightMetricDTO[];
	/**
	 * Wallet balance distribution chart data.
	 */
	wallet_balance: readonly NftCollectionChartDatumDTO[];
	/**
	 * NFT allocation chart data.
	 */
	nft_allocation: readonly NftCollectionChartDatumDTO[];
	/**
	 * Aggregated transaction statistics.
	 */
	transaction_stats: readonly NftCollectionTransactionStatDTO[];
	/**
	 * Contact-related insight metrics.
	 */
	contact_metrics: readonly NftCollectionInsightMetricDTO[];
	/**
	 * Influencers found in the NFT collection audience.
	 */
	influencers: readonly NftCollectionInfluencerDTO[];
	/**
	 * Superrank distribution chart data.
	 */
	superrank: readonly NftCollectionChartDatumDTO[];
	/**
	 * Interest distribution chart data.
	 */
	interests: readonly NftCollectionChartDatumDTO[];
	/**
	 * Persona distribution chart data.
	 */
	personas: readonly NftCollectionChartDatumDTO[];
	/**
	 * Collections overlapping with the NFT collection audience.
	 */
	overlap: readonly NftCollectionOverlapDTO[];
}
