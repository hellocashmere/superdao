/**
 * A resource returned by the Explore directory and details endpoints.
 *
 * Endpoints: `GET /tokens`, `GET /tokens/:id`.
 */
export interface TokenDTO {
  id: string;
  slug: string;
  name: string;
  avatar: string;
  owners: string;
  active_wallets: string;
  supply: string;
  price: string;
  chain: "ethereum" | "polygon";
  wallet_count: string;
}

/**
 * A summary metric displayed above a resource wallet table.
 */
export interface TokenMetricDTO {
  title: string;
  value: string;
  description: string;
  footer_value: string;
  footer_label: string;
  kind: "activity" | "balance" | "email" | "influencers" | "nfts" | "twitter";
  info?: string;
}

/**
 * A bar in an Explore resource distribution chart.
 */
export interface TokenChartDatumDTO {
  label: string;
  value: number;
  display_value: string;
  fill?: string;
}

/**
 * Highlights displayed above a resource wallet table.
 *
 * Endpoint: `GET /token-highlights?token_id=:id`.
 */
export interface TokenHighlightsDTO {
  id: string;
  token_id: number;
  metrics: readonly TokenMetricDTO[];
  balance_distribution: readonly TokenChartDatumDTO[];
}

/**
 * A classification assigned to a resource wallet.
 */
export interface TokenWalletTagDTO {
  name: string;
  tone: "blue" | "green" | "orange" | "pink" | "purple" | "yellow";
}

/**
 * An activity identity associated with a resource wallet.
 */
export interface TokenWalletActivityDTO {
  avatar: string;
  name: string;
}

/**
 * A wallet returned for an Explore resource audience.
 *
 * Endpoint: `GET /token-wallets?token_id=:id`.
 */
export interface TokenWalletDTO {
  id: string;
  token_id: number;
  name: string;
  avatar: string;
  rank: string;
  rank_tone: "constructive" | "lime" | "orange";
  age: string;
  age_details?: string;
  labels: readonly TokenWalletTagDTO[];
  balance: string;
  nfts: string;
  twitter: string;
  activity: readonly TokenWalletActivityDTO[];
  contacts: readonly ("email" | "link" | "mirror" | "opensea" | "twitter")[];
}

/**
 * A metric card displayed in resource analytics.
 */
export interface TokenInsightMetricDTO {
  title: string;
  value: string;
  description: string;
  footer: string;
  info?: string;
}

/**
 * A transaction aggregate displayed in resource analytics.
 */
export interface TokenTransactionStatDTO {
  label: string;
  value: string;
  tone: "default" | "negative" | "positive";
}

/**
 * A Twitter profile found in a resource audience.
 */
export interface TokenInfluencerDTO {
  name: string;
  username: string;
  followers: string;
  nfts: string;
  balance: string;
  avatar: string;
}

/**
 * An NFT collection that overlaps with a resource audience.
 */
export interface TokenOverlapDTO {
  name: string;
  avatar: string;
  owners_in_audience: string;
  share_in_audience: string;
  owners: string;
  floor_price: string;
}

/**
 * Analytics displayed in an Explore resource Insights tab.
 *
 * Endpoint: `GET /token-insights?token_id=:id`.
 */
export interface TokenInsightsDTO {
  id: string;
  token_id: number;
  balance_metrics: readonly TokenInsightMetricDTO[];
  wallet_balance: readonly TokenChartDatumDTO[];
  nft_allocation: readonly TokenChartDatumDTO[];
  transaction_stats: readonly TokenTransactionStatDTO[];
  contact_metrics: readonly TokenInsightMetricDTO[];
  influencers: readonly TokenInfluencerDTO[];
  superrank: readonly TokenChartDatumDTO[];
  interests: readonly TokenChartDatumDTO[];
  personas: readonly TokenChartDatumDTO[];
  overlap: readonly TokenOverlapDTO[];
}
