/**
 * NFT collection identity displayed in directories and details headers.
 */
export interface NftCollectionView {
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
	activeWallets: number;
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
	walletCount: number;
}

/**
 * Summary metric displayed above the NFT collection wallet table.
 */
export interface NftCollectionMetricView {
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
	footerValue: number;
	/**
	 * Label describing the footer value.
	 */
	footerLabel: string;
	/**
	 * Optional tooltip information.
	 */
	info?: string;
}

/**
 * One value in a NFT collection distribution chart.
 */
export interface NftCollectionChartDatumView {
	/**
	 * Label displayed for the chart bucket.
	 */
	label: number | string;
	/**
	 * Numeric value represented by the chart bucket.
	 */
	value: number;
	/**
	 * Numeric value displayed to users.
	 */
	displayValue: number;
	/**
	 * Optional chart color override.
	 */
	fill?: string;
}

/**
 * Summary data displayed above the NFT collection wallet table.
 */
export interface NftCollectionHighlightsView {
	/**
	 * Summary metrics shown above the wallet table.
	 */
	metrics: readonly NftCollectionMetricView[];
	/**
	 * Balance distribution chart data.
	 */
	balanceDistribution: readonly NftCollectionChartDatumView[];
}

/**
 * Classification assigned to a NFT collection wallet.
 */
export interface NftCollectionWalletTagView {
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
 * Activity identity associated with a NFT collection wallet.
 */
export interface NftCollectionWalletActivityView {
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
 * Wallet displayed in a NFT collection audience table.
 */
export interface NftCollectionWalletView {
	/**
	 * Unique wallet ID.
	 */
	id: number;
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
	ageDetails?: string;
	/**
	 * Labels assigned to the wallet.
	 */
	labels: readonly NftCollectionWalletTagView[];
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
	activity: readonly NftCollectionWalletActivityView[];
	/**
	 * Contact methods available for the wallet.
	 */
	contacts: readonly ("email" | "link" | "mirror" | "opensea" | "twitter")[];
}

/**
 * Metric card displayed in NFT collection analytics.
 */
export interface NftCollectionInsightMetricView {
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
	footerValue: number;
	/**
	 * Label describing the metric footer value.
	 */
	footerLabel: string;
	/**
	 * Optional tooltip information.
	 */
	info?: string;
}

/**
 * Transaction aggregate displayed in NFT collection analytics.
 */
export interface NftCollectionTransactionStatView {
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
 * Twitter profile found in a NFT collection audience.
 */
export interface NftCollectionInfluencerView {
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
 * NFT collection that overlaps with a NFT collection audience.
 */
export interface NftCollectionOverlapView {
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
	ownersInAudience: number;
	/**
	 * Percentage of the NFT collection audience owning the collection.
	 */
	shareInAudience: number;
	/**
	 * Total number of collection owners.
	 */
	owners: number;
	/**
	 * Number of collection items owned by the NFT collection audience.
	 */
	itemsInAudience: number;
	/**
	 * Total number of collection items.
	 */
	items: number;
	/**
	 * Collection floor price.
	 */
	floorPrice: number;
	/**
	 * Blockchain hosting the collection.
	 */
	chain: "ethereum" | "polygon";
}

/**
 * Complete analytics view consumed by the NFT collection Insights tab.
 */
export interface NftCollectionInsightsView {
	/**
	 * Balance-related insight metrics.
	 */
	balanceMetrics: readonly NftCollectionInsightMetricView[];
	/**
	 * Wallet balance distribution chart data.
	 */
	walletBalance: readonly NftCollectionChartDatumView[];
	/**
	 * NFT allocation chart data.
	 */
	nftAllocation: readonly NftCollectionChartDatumView[];
	/**
	 * Aggregated transaction statistics.
	 */
	transactionStats: readonly NftCollectionTransactionStatView[];
	/**
	 * Contact-related insight metrics.
	 */
	contactMetrics: readonly NftCollectionInsightMetricView[];
	/**
	 * Influencers found in the NFT collection audience.
	 */
	influencers: readonly NftCollectionInfluencerView[];
	/**
	 * Superrank distribution chart data.
	 */
	superrank: readonly NftCollectionChartDatumView[];
	/**
	 * Interest distribution chart data.
	 */
	interests: readonly NftCollectionChartDatumView[];
	/**
	 * Persona distribution chart data.
	 */
	personas: readonly NftCollectionChartDatumView[];
	/**
	 * Collections overlapping with the NFT collection audience.
	 */
	overlap: readonly NftCollectionOverlapView[];
}
