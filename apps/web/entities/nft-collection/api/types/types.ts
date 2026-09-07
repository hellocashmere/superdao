/**
 * A resource returned by the Explore directory and details endpoints.
 *
 * Endpoints: `GET /nft-collections`, `GET /nft-collections/:id`.
 */
export interface NftCollectionDTO {
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
export interface NftCollectionMetricDTO {
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
export interface NftCollectionChartDatumDTO {
  label: string;
  value: number;
  display_value: string;
  fill?: string;
}

/**
 * Highlights displayed above a resource wallet table.
 *
 * Endpoint: `GET /nft-collection-highlights?nft_collection_id=:id`.
 */
export interface NftCollectionHighlightsDTO {
  id: string;
  nft_collection_id: number;
  metrics: readonly NftCollectionMetricDTO[];
  balance_distribution: readonly NftCollectionChartDatumDTO[];
}

/**
 * A classification assigned to a resource wallet.
 */
export interface NftCollectionWalletTagDTO {
  name: string;
  tone: "blue" | "green" | "orange" | "pink" | "purple" | "yellow";
}

/**
 * An activity identity associated with a resource wallet.
 */
export interface NftCollectionWalletActivityDTO {
  avatar: string;
  name: string;
}

/**
 * A wallet returned for an Explore resource audience.
 *
 * Endpoint: `GET /nft-collection-wallets?nft_collection_id=:id`.
 */
export interface NftCollectionWalletDTO {
  id: string;
  nft_collection_id: number;
  name: string;
  avatar: string;
  rank: string;
  rank_tone: "constructive" | "lime" | "orange";
  age: string;
  age_details?: string;
  labels: readonly NftCollectionWalletTagDTO[];
  balance: string;
  nfts: string;
  twitter: string;
  activity: readonly NftCollectionWalletActivityDTO[];
  contacts: readonly ("email" | "link" | "mirror" | "opensea" | "twitter")[];
}

/**
 * A metric card displayed in resource analytics.
 */
export interface NftCollectionInsightMetricDTO {
  title: string;
  value: string;
  description: string;
  footer: string;
  info?: string;
}

/**
 * A transaction aggregate displayed in resource analytics.
 */
export interface NftCollectionTransactionStatDTO {
  label: string;
  value: string;
  tone: "default" | "negative" | "positive";
}

/**
 * A Twitter profile found in a resource audience.
 */
export interface NftCollectionInfluencerDTO {
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
export interface NftCollectionOverlapDTO {
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
 * Endpoint: `GET /nft-collection-insights?nft_collection_id=:id`.
 */
export interface NftCollectionInsightsDTO {
  id: string;
  nft_collection_id: number;
  balance_metrics: readonly NftCollectionInsightMetricDTO[];
  wallet_balance: readonly NftCollectionChartDatumDTO[];
  nft_allocation: readonly NftCollectionChartDatumDTO[];
  transaction_stats: readonly NftCollectionTransactionStatDTO[];
  contact_metrics: readonly NftCollectionInsightMetricDTO[];
  influencers: readonly NftCollectionInfluencerDTO[];
  superrank: readonly NftCollectionChartDatumDTO[];
  interests: readonly NftCollectionChartDatumDTO[];
  personas: readonly NftCollectionChartDatumDTO[];
  overlap: readonly NftCollectionOverlapDTO[];
}
