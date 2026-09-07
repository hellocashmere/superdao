/**
 * A resource returned by the Explore directory and details endpoints.
 *
 * Endpoints: `GET /dapps`, `GET /dapps/:id`.
 */
export interface DappDTO {
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
export interface DappMetricDTO {
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
export interface DappChartDatumDTO {
  label: string;
  value: number;
  display_value: string;
  fill?: string;
}

/**
 * Highlights displayed above a resource wallet table.
 *
 * Endpoint: `GET /dapp-highlights?dapp_id=:id`.
 */
export interface DappHighlightsDTO {
  id: string;
  dapp_id: number;
  metrics: readonly DappMetricDTO[];
  balance_distribution: readonly DappChartDatumDTO[];
}

/**
 * A classification assigned to a resource wallet.
 */
export interface DappWalletTagDTO {
  name: string;
  tone: "blue" | "green" | "orange" | "pink" | "purple" | "yellow";
}

/**
 * An activity identity associated with a resource wallet.
 */
export interface DappWalletActivityDTO {
  avatar: string;
  name: string;
}

/**
 * A wallet returned for an Explore resource audience.
 *
 * Endpoint: `GET /dapp-wallets?dapp_id=:id`.
 */
export interface DappWalletDTO {
  id: string;
  dapp_id: number;
  name: string;
  avatar: string;
  rank: string;
  rank_tone: "constructive" | "lime" | "orange";
  age: string;
  age_details?: string;
  labels: readonly DappWalletTagDTO[];
  balance: string;
  nfts: string;
  twitter: string;
  activity: readonly DappWalletActivityDTO[];
  contacts: readonly ("email" | "link" | "mirror" | "opensea" | "twitter")[];
}

/**
 * A metric card displayed in resource analytics.
 */
export interface DappInsightMetricDTO {
  title: string;
  value: string;
  description: string;
  footer: string;
  info?: string;
}

/**
 * A transaction aggregate displayed in resource analytics.
 */
export interface DappTransactionStatDTO {
  label: string;
  value: string;
  tone: "default" | "negative" | "positive";
}

/**
 * A Twitter profile found in a resource audience.
 */
export interface DappInfluencerDTO {
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
export interface DappOverlapDTO {
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
 * Endpoint: `GET /dapp-insights?dapp_id=:id`.
 */
export interface DappInsightsDTO {
  id: string;
  dapp_id: number;
  balance_metrics: readonly DappInsightMetricDTO[];
  wallet_balance: readonly DappChartDatumDTO[];
  nft_allocation: readonly DappChartDatumDTO[];
  transaction_stats: readonly DappTransactionStatDTO[];
  contact_metrics: readonly DappInsightMetricDTO[];
  influencers: readonly DappInfluencerDTO[];
  superrank: readonly DappChartDatumDTO[];
  interests: readonly DappChartDatumDTO[];
  personas: readonly DappChartDatumDTO[];
  overlap: readonly DappOverlapDTO[];
}
