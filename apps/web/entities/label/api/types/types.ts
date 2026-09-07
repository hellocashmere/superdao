/**
 * A label returned by the label directory endpoint.
 *
 * Endpoint: `GET /labels`.
 */
export interface LabelDTO {
  id: string;
  slug: string;
  name: string;
  wallet_count: string;
  color: string;
  category: "interest" | "persona";
}

/**
 * A summary metric displayed above the label wallet table.
 *
 * Endpoint: `GET /label-highlights?label_id=:id`.
 */
export interface LabelMetricDTO {
  title: string;
  value: string;
  description: string;
  footer_value: string;
  footer_label: string;
  kind: "activity" | "balance" | "email" | "influencers" | "nfts" | "twitter";
  info?: string;
}

/**
 * A bar in a label distribution chart.
 */
export interface LabelChartDatumDTO {
  label: string;
  value: number;
  display_value: string;
  fill?: string;
}

/**
 * Summary metrics and balance distribution for a label.
 *
 * Endpoint: `GET /label-highlights?label_id=:id`.
 */
export interface LabelHighlightsDTO {
  id: string;
  label_id: number;
  metrics: readonly LabelMetricDTO[];
  balance_distribution: readonly LabelChartDatumDTO[];
}

/**
 * A classification assigned to a wallet in a label audience.
 */
export interface LabelWalletTagDTO {
  name: string;
  tone: "blue" | "green" | "orange" | "pink" | "purple" | "yellow";
}

/**
 * An activity identity associated with a label wallet.
 */
export interface LabelWalletActivityDTO {
  avatar: string;
  name: string;
}

/**
 * A wallet returned for a label audience.
 *
 * Endpoint: `GET /label-wallets?label_id=:id`.
 */
export interface LabelWalletDTO {
  id: string;
  label_id: number;
  name: string;
  avatar: string;
  rank: string;
  rank_tone: "constructive" | "lime" | "orange";
  age: string;
  age_details?: string;
  labels: readonly LabelWalletTagDTO[];
  balance: string;
  nfts: string;
  twitter: string;
  activity: readonly LabelWalletActivityDTO[];
  contacts: readonly ("email" | "link" | "mirror" | "opensea" | "twitter")[];
}

/**
 * A reusable metric in the label insights response.
 */
export interface LabelInsightMetricDTO {
  title: string;
  value: string;
  description: string;
  footer: string;
  info?: string;
}

/**
 * A transaction aggregate in the label insights response.
 */
export interface LabelTransactionStatDTO {
  label: string;
  value: string;
  tone: "default" | "negative" | "positive";
}

/**
 * A Twitter profile found in a label audience.
 */
export interface LabelTwitterInfluencerDTO {
  name: string;
  username: string;
  followers: string;
  nfts: string;
  balance: string;
  avatar: string;
}

/**
 * An NFT collection that overlaps with a label audience.
 */
export interface LabelAudienceOverlapDTO {
  name: string;
  avatar: string;
  owners_in_audience: string;
  share_in_audience: string;
  owners: string;
  items_in_audience: string;
  items: string;
  floor_price: string;
  chain: "ethereum" | "polygon";
}

/**
 * Analytics data displayed in the label Insights tab.
 *
 * Endpoint: `GET /label-insights?label_id=:id`.
 */
export interface LabelInsightsDTO {
  id: string;
  label_id: number;
  balance_metrics: readonly LabelInsightMetricDTO[];
  wallet_balance: readonly LabelChartDatumDTO[];
  nft_allocation: readonly LabelChartDatumDTO[];
  transaction_stats: readonly LabelTransactionStatDTO[];
  contact_metrics: readonly LabelInsightMetricDTO[];
  twitter_influencers: readonly LabelTwitterInfluencerDTO[];
  superrank: readonly LabelChartDatumDTO[];
  interests: readonly LabelChartDatumDTO[];
  personas: readonly LabelChartDatumDTO[];
  audience_overlap: readonly LabelAudienceOverlapDTO[];
  notable_projects: readonly LabelAudienceOverlapDTO[];
}
