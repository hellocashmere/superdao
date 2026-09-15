export interface ChartDatumFixture {
	label: string;
	value: number;
	fill?: string;
}

export interface InsightMetricFixture {
	title: string;
	value: number;
	description: string;
	footer_value: number;
	footer_label: string;
	info?: string;
}

export interface InfluencerFixture {
	title: string;
	username: string;
	followers: number;
	nfts: number;
	balance: number;
	avatar: string;
}

export interface AudienceOverlapFixture {
	title: string;
	avatar: string;
	owners_in_audience: number;
	share_in_audience: number;
	owners: number;
	items_in_audience: number;
	items: number;
	floor_price: number;
	chain: "ethereum" | "polygon";
}

export interface InsightsFixture {
	balance_metrics: InsightMetricFixture[];
	wallet_balance: Array<{ label: string | number; value: number }>;
	nft_allocation: ChartDatumFixture[];
	transaction_stats: Array<{ label: string; value: number; variant: "default" | "negative" | "positive" }>;
	contact_metrics: InsightMetricFixture[];
	influencers: InfluencerFixture[];
	overlap: AudienceOverlapFixture[];
	superrank: ChartDatumFixture[];
	interests: ChartDatumFixture[];
	personas: ChartDatumFixture[];
}
