/**
 * Category used to group labels.
 */
export type LabelCategory = "interest" | "persona";

/**
 * Label identity displayed in directories and details headers.
 */
export interface LabelView {
	/**
	 * Unique label ID.
	 */
	id: number;
	/**
	 * URL-safe label ID.
	 */
	slug: string;
	/**
	 * Label title.
	 */
	title: string;
	/**
	 * Number of wallets assigned to the label.
	 */
	walletCount: number;
	/**
	 * Color used to identify the label.
	 */
	color: string;
	/**
	 * Category used to group the label.
	 */
	category: LabelCategory;
}

/**
 * Summary metric displayed above the label wallet table.
 */
export interface LabelMetricView {
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
 * One value in a label distribution chart.
 */
export interface LabelChartDatumView {
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
 * Summary data displayed above the label wallet table.
 */
export interface LabelHighlightsView {
	/**
	 * Summary metrics shown above the wallet table.
	 */
	metrics: readonly LabelMetricView[];
	/**
	 * Balance distribution chart data.
	 */
	balanceDistribution: readonly LabelChartDatumView[];
}

/**
 * Classification assigned to a label wallet.
 */
export interface LabelWalletTagView {
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
 * Activity identity associated with a label wallet.
 */
export interface LabelWalletActivityView {
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
 * Wallet displayed in a label audience table.
 */
export interface LabelWalletView {
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
	 * Wallet rank within the label audience.
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
	labels: readonly LabelWalletTagView[];
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
	activity: readonly LabelWalletActivityView[];
	/**
	 * Contact methods available for the wallet.
	 */
	contacts: readonly ("email" | "link" | "mirror" | "opensea" | "twitter")[];
}

/**
 * Metric card displayed in label analytics.
 */
export interface LabelInsightMetricView {
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
 * Transaction aggregate displayed in label analytics.
 */
export interface LabelTransactionStatView {
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
 * Twitter profile found in a label audience.
 */
export interface LabelInfluencerView {
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
 * NFT collection that overlaps with a label audience.
 */
export interface LabelOverlapView {
	/**
	 * Overlapping collection title.
	 */
	title: string;
	/**
	 * Overlapping collection avatar URL.
	 */
	avatar: string;
	/**
	 * Number of collection owners in the label audience.
	 */
	ownersInAudience: number;
	/**
	 * Percentage of the label audience owning the collection.
	 */
	shareInAudience: number;
	/**
	 * Total number of collection owners.
	 */
	owners: number;
	/**
	 * Number of collection items owned by the label audience.
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
 * Complete analytics view consumed by the label Insights tab.
 */
export interface LabelInsightsView {
	/**
	 * Balance-related insight metrics.
	 */
	balanceMetrics: readonly LabelInsightMetricView[];
	/**
	 * Wallet balance distribution chart data.
	 */
	walletBalance: readonly LabelChartDatumView[];
	/**
	 * NFT allocation chart data.
	 */
	nftAllocation: readonly LabelChartDatumView[];
	/**
	 * Aggregated transaction statistics.
	 */
	transactionStats: readonly LabelTransactionStatView[];
	/**
	 * Contact-related insight metrics.
	 */
	contactMetrics: readonly LabelInsightMetricView[];
	/**
	 * Influencers found in the label audience.
	 */
	influencers: readonly LabelInfluencerView[];
	/**
	 * Superrank distribution chart data.
	 */
	superrank: readonly LabelChartDatumView[];
	/**
	 * Interest distribution chart data.
	 */
	interests: readonly LabelChartDatumView[];
	/**
	 * Persona distribution chart data.
	 */
	personas: readonly LabelChartDatumView[];
	/**
	 * Collections overlapping with the label audience.
	 */
	overlap: readonly LabelOverlapView[];
}
