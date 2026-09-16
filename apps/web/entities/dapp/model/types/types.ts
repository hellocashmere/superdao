/**
 * Dapp identity displayed in directories and details headers.
 */
export interface DappView {
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
	activeWallets: number;
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
	walletCount: number;
}

/**
 * Summary metric displayed above the dapp wallet table.
 */
export interface DappMetricView {
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
 * One value in a dapp distribution chart.
 */
export interface DappChartDatumView {
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
 * Summary data displayed above the dapp wallet table.
 */
export interface DappHighlightsView {
	/**
	 * Summary metrics shown above the wallet table.
	 */
	metrics: readonly DappMetricView[];
	/**
	 * Balance distribution chart data.
	 */
	balanceDistribution: readonly DappChartDatumView[];
}

/**
 * Classification assigned to a dapp wallet.
 */
export interface DappWalletTagView {
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
 * Activity identity associated with a dapp wallet.
 */
export interface DappWalletActivityView {
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
 * Wallet displayed in a dapp audience table.
 */
export interface DappWalletView {
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
	ageDetails?: string;
	/**
	 * Labels assigned to the wallet.
	 */
	labels: readonly DappWalletTagView[];
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
	activity: readonly DappWalletActivityView[];
	/**
	 * Contact methods available for the wallet.
	 */
	contacts: readonly ("email" | "link" | "mirror" | "opensea" | "twitter")[];
}

/**
 * Metric card displayed in dapp analytics.
 */
export interface DappInsightMetricView {
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
 * Transaction aggregate displayed in dapp analytics.
 */
export interface DappTransactionStatView {
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
 * Twitter profile found in a dapp audience.
 */
export interface DappInfluencerView {
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
 * NFT collection that overlaps with a dapp audience.
 */
export interface DappOverlapView {
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
	ownersInAudience: number;
	/**
	 * Percentage of the dapp audience owning the collection.
	 */
	shareInAudience: number;
	/**
	 * Total number of collection owners.
	 */
	owners: number;
	/**
	 * Number of collection items owned by the dapp audience.
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
 * Complete analytics view consumed by the dapp Insights tab.
 */
export interface DappInsightsView {
	/**
	 * Balance-related insight metrics.
	 */
	balanceMetrics: readonly DappInsightMetricView[];
	/**
	 * Wallet balance distribution chart data.
	 */
	walletBalance: readonly DappChartDatumView[];
	/**
	 * NFT allocation chart data.
	 */
	nftAllocation: readonly DappChartDatumView[];
	/**
	 * Aggregated transaction statistics.
	 */
	transactionStats: readonly DappTransactionStatView[];
	/**
	 * Contact-related insight metrics.
	 */
	contactMetrics: readonly DappInsightMetricView[];
	/**
	 * Influencers found in the dapp audience.
	 */
	influencers: readonly DappInfluencerView[];
	/**
	 * Superrank distribution chart data.
	 */
	superrank: readonly DappChartDatumView[];
	/**
	 * Interest distribution chart data.
	 */
	interests: readonly DappChartDatumView[];
	/**
	 * Persona distribution chart data.
	 */
	personas: readonly DappChartDatumView[];
	/**
	 * Collections overlapping with the dapp audience.
	 */
	overlap: readonly DappOverlapView[];
}
