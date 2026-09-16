/**
 * Token identity displayed in directories and details headers.
 */
export interface TokenView {
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
	activeWallets: number;
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
	walletCount: number;
}

/**
 * Summary metric displayed above the token wallet table.
 */
export interface TokenMetricView {
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
 * One value in a token distribution chart.
 */
export interface TokenChartDatumView {
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
 * Summary data displayed above the token wallet table.
 */
export interface TokenHighlightsView {
	/**
	 * Summary metrics shown above the wallet table.
	 */
	metrics: readonly TokenMetricView[];
	/**
	 * Balance distribution chart data.
	 */
	balanceDistribution: readonly TokenChartDatumView[];
}

/**
 * Classification assigned to a token wallet.
 */
export interface TokenWalletTagView {
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
 * Activity identity associated with a token wallet.
 */
export interface TokenWalletActivityView {
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
 * Wallet displayed in a token audience table.
 */
export interface TokenWalletView {
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
	ageDetails?: string;
	/**
	 * Labels assigned to the wallet.
	 */
	labels: readonly TokenWalletTagView[];
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
	activity: readonly TokenWalletActivityView[];
	/**
	 * Contact methods available for the wallet.
	 */
	contacts: readonly ("email" | "link" | "mirror" | "opensea" | "twitter")[];
}

/**
 * Metric card displayed in token analytics.
 */
export interface TokenInsightMetricView {
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
 * Transaction aggregate displayed in token analytics.
 */
export interface TokenTransactionStatView {
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
 * Twitter profile found in a token audience.
 */
export interface TokenInfluencerView {
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
 * NFT collection that overlaps with a token audience.
 */
export interface TokenOverlapView {
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
	ownersInAudience: number;
	/**
	 * Percentage of the token audience owning the collection.
	 */
	shareInAudience: number;
	/**
	 * Total number of collection owners.
	 */
	owners: number;
	/**
	 * Number of collection items owned by the token audience.
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
 * Complete analytics view consumed by the token Insights tab.
 */
export interface TokenInsightsView {
	/**
	 * Balance-related insight metrics.
	 */
	balanceMetrics: readonly TokenInsightMetricView[];
	/**
	 * Wallet balance distribution chart data.
	 */
	walletBalance: readonly TokenChartDatumView[];
	/**
	 * NFT allocation chart data.
	 */
	nftAllocation: readonly TokenChartDatumView[];
	/**
	 * Aggregated transaction statistics.
	 */
	transactionStats: readonly TokenTransactionStatView[];
	/**
	 * Contact-related insight metrics.
	 */
	contactMetrics: readonly TokenInsightMetricView[];
	/**
	 * Influencers found in the token audience.
	 */
	influencers: readonly TokenInfluencerView[];
	/**
	 * Superrank distribution chart data.
	 */
	superrank: readonly TokenChartDatumView[];
	/**
	 * Interest distribution chart data.
	 */
	interests: readonly TokenChartDatumView[];
	/**
	 * Persona distribution chart data.
	 */
	personas: readonly TokenChartDatumView[];
	/**
	 * Collections overlapping with the token audience.
	 */
	overlap: readonly TokenOverlapView[];
}
