/**
 * Resource identity and metrics displayed in directories and details headers.
 */
export interface TokenView {
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
export type TokenMetricKind = "activity" | "balance" | "email" | "influencers" | "nfts" | "twitter";

/**
 * Summary metric displayed above a resource wallet table.
 */
export interface TokenMetricView {
  title: string;
  value: string;
  description: string;
  footerValue: string;
  footerLabel: string;
  kind: TokenMetricKind;
  info?: string;
}

/**
 * One value in a resource distribution chart.
 */
export interface TokenChartDatumView {
  label: string;
  value: number;
  displayValue: string;
  fill?: string;
}

/**
 * Summary data displayed above a resource wallet table.
 */
export interface TokenHighlightsView {
  metrics: readonly TokenMetricView[];
  balanceDistribution: readonly TokenChartDatumView[];
}

/**
 * Wallet displayed in a resource audience table.
 */
export interface TokenWalletView {
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
export interface TokenInsightMetricView {
  title: string;
  value: string;
  description: string;
  footer: string;
  info?: string;
}

/**
 * Transaction aggregate displayed in resource analytics.
 */
export interface TokenTransactionStatView {
  label: string;
  value: string;
  tone: "default" | "negative" | "positive";
}

/**
 * Twitter profile found in a resource audience.
 */
export interface TokenInfluencerView {
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
export interface TokenOverlapView {
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
export interface TokenInsightsView {
  balanceMetrics: readonly TokenInsightMetricView[];
  walletBalance: readonly TokenChartDatumView[];
  nftAllocation: readonly TokenChartDatumView[];
  transactionStats: readonly TokenTransactionStatView[];
  contactMetrics: readonly TokenInsightMetricView[];
  influencers: readonly TokenInfluencerView[];
  superrank: readonly TokenChartDatumView[];
  interests: readonly TokenChartDatumView[];
  personas: readonly TokenChartDatumView[];
  overlap: readonly TokenOverlapView[];
}
