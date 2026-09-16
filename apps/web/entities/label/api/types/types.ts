/**
 * A label returned by the Explore directory and details endpoints.
 *
 * Endpoints: `GET /labels`, `GET /labels/:id`.
 */
export interface LabelDTO {
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
	wallet_count: number;
	/**
	 * Color used to identify the label.
	 */
	color: string;
	/**
	 * Category used to group the label.
	 */
	category: "interest" | "persona";
}

/**
 * A summary metric displayed above the label wallet table.
 */
export interface LabelMetricDTO {
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
 * A bar in a label distribution chart.
 */
export interface LabelChartDatumDTO {
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
 * Highlights displayed above the label wallet table.
 *
 * Endpoint: `GET /labels/:id/highlights`.
 */
export interface LabelHighlightsDTO {
	/**
	 * Stable highlights response ID.
	 */
	id: string;
	/**
	 * ID of the label these highlights describe.
	 */
	label_id: number;
	/**
	 * Summary metrics shown above the wallet table.
	 */
	metrics: readonly LabelMetricDTO[];
	/**
	 * Balance distribution chart data.
	 */
	balance_distribution: readonly LabelChartDatumDTO[];
}

/**
 * A classification assigned to a label wallet.
 */
export interface LabelWalletTagDTO {
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
 * An activity identity associated with a label wallet.
 */
export interface LabelWalletActivityDTO {
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
 * A wallet returned for a label audience.
 *
 * Endpoint: `GET /labels/:id/wallets`.
 */
export interface LabelWalletDTO {
	/**
	 * Unique wallet ID.
	 */
	id: number;
	/**
	 * ID of the label that owns this wallet row.
	 */
	label_id: number;
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
	age_details?: string;
	/**
	 * Labels assigned to the wallet.
	 */
	labels: readonly LabelWalletTagDTO[];
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
	activity: readonly LabelWalletActivityDTO[];
	/**
	 * Contact methods available for the wallet.
	 */
	contacts: readonly ("email" | "link" | "mirror" | "opensea" | "twitter")[];
}

/**
 * A metric card displayed in label analytics.
 */
export interface LabelInsightMetricDTO {
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
 * A transaction aggregate displayed in label analytics.
 */
export interface LabelTransactionStatDTO {
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
 * A Twitter profile found in a label audience.
 */
export interface LabelInfluencerDTO {
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
 * An NFT collection that overlaps with a label audience.
 */
export interface LabelOverlapDTO {
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
	owners_in_audience: number;
	/**
	 * Percentage of the label audience owning the collection.
	 */
	share_in_audience: number;
	/**
	 * Total number of collection owners.
	 */
	owners: number;
	/**
	 * Number of collection items owned by the label audience.
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
 * Analytics displayed in the label Insights tab.
 *
 * Endpoint: `GET /labels/:id/insights`.
 */
export interface LabelInsightsDTO {
	/**
	 * Stable insights response ID.
	 */
	id: string;
	/**
	 * ID of the label these insights describe.
	 */
	label_id: number;
	/**
	 * Balance-related insight metrics.
	 */
	balance_metrics: readonly LabelInsightMetricDTO[];
	/**
	 * Wallet balance distribution chart data.
	 */
	wallet_balance: readonly LabelChartDatumDTO[];
	/**
	 * NFT allocation chart data.
	 */
	nft_allocation: readonly LabelChartDatumDTO[];
	/**
	 * Aggregated transaction statistics.
	 */
	transaction_stats: readonly LabelTransactionStatDTO[];
	/**
	 * Contact-related insight metrics.
	 */
	contact_metrics: readonly LabelInsightMetricDTO[];
	/**
	 * Influencers found in the label audience.
	 */
	influencers: readonly LabelInfluencerDTO[];
	/**
	 * Superrank distribution chart data.
	 */
	superrank: readonly LabelChartDatumDTO[];
	/**
	 * Interest distribution chart data.
	 */
	interests: readonly LabelChartDatumDTO[];
	/**
	 * Persona distribution chart data.
	 */
	personas: readonly LabelChartDatumDTO[];
	/**
	 * Collections overlapping with the label audience.
	 */
	overlap: readonly LabelOverlapDTO[];
}
