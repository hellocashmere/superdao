/**
 * Resource identity and metrics displayed in directories and details headers.
 */
export interface NftCollectionView {
  id: string;
  name: string;
  avatar: string;
  owners: string;
  activeWallets: string;
  supply: string;
  price: string;
  chain: "ethereum" | "polygon";
  walletCount: string;
}

/**
 * Kind of summary metric displayed for a resource audience.
 */
export type NftCollectionMetricKind = "activity" | "balance" | "email" | "influencers" | "nfts" | "twitter";

/**
 * Summary metric displayed above a resource wallet table.
 */
export interface NftCollectionMetricView {
  title: string;
  value: string;
  description: string;
  footerValue: string;
  footerLabel: string;
  kind: NftCollectionMetricKind;
  info?: string;
}

/**
 * One value in a resource distribution chart.
 */
export interface NftCollectionChartDatumView {
  label: string;
  value: number;
  displayValue: string;
  fill?: string;
}

/**
 * Summary data displayed above a resource wallet table.
 */
export interface NftCollectionHighlightsView {
  metrics: readonly NftCollectionMetricView[];
  balanceDistribution: readonly NftCollectionChartDatumView[];
}

/**
 * Wallet displayed in a resource audience table.
 */
export interface NftCollectionWalletView {
  id: number;
  name: string;
  avatar: string;
  rank: string;
  rankTone: "constructive" | "lime" | "orange";
  age: string;
  ageDetails?: string;
  labels: readonly {
    name: string;
    tone: "blue" | "green" | "orange" | "pink" | "purple" | "yellow";
  }[];
  balance: string;
  nfts: string;
  twitter: string;
  activity: readonly {
    avatar: string;
    name: string;
  }[];
  contacts: readonly ("email" | "link" | "mirror" | "opensea" | "twitter")[];
}

/**
 * Metric card displayed in resource analytics.
 */
export interface NftCollectionInsightMetricView {
  title: string;
  value: string;
  description: string;
  footer: string;
  info?: string;
}

/**
 * Transaction aggregate displayed in resource analytics.
 */
export interface NftCollectionTransactionStatView {
  label: string;
  value: string;
  tone: "default" | "negative" | "positive";
}

/**
 * Twitter profile found in a resource audience.
 */
export interface NftCollectionInfluencerView {
  name: string;
  username: string;
  followers: string;
  nfts: string;
  balance: string;
  avatar: string;
}

/**
 * NFT collection that overlaps with a resource audience.
 */
export interface NftCollectionOverlapView {
  name: string;
  avatar: string;
  ownersInAudience: string;
  shareInAudience: string;
  owners: string;
  floorPrice: string;
}

/**
 * Complete analytics view consumed by a resource Insights tab.
 */
export interface NftCollectionInsightsView {
  balanceMetrics: readonly NftCollectionInsightMetricView[];
  walletBalance: readonly NftCollectionChartDatumView[];
  nftAllocation: readonly NftCollectionChartDatumView[];
  transactionStats: readonly NftCollectionTransactionStatView[];
  contactMetrics: readonly NftCollectionInsightMetricView[];
  influencers: readonly NftCollectionInfluencerView[];
  superrank: readonly NftCollectionChartDatumView[];
  interests: readonly NftCollectionChartDatumView[];
  personas: readonly NftCollectionChartDatumView[];
  overlap: readonly NftCollectionOverlapView[];
}
