export interface BalanceDistributionDatumFixture {
	label: string | number;
	value: number;
}

export interface HighlightMetricFixture {
	id: "activity" | "balance" | "email" | "influencers" | "nfts" | "twitter";
	title: string;
	value: number;
	description: string;
	footer_value: number;
	footer_label: string;
}

export interface HighlightsFixture {
	metrics: HighlightMetricFixture[];
	balance_distribution: BalanceDistributionDatumFixture[];
}
