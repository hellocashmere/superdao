/**
 * Resource identity and metrics displayed in directories and details headers.
 */
export interface DappView {
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
export type DappMetricKind = "activity" | "balance" | "email" | "influencers" | "nfts" | "twitter";

/**
 * Summary metric displayed above a resource wallet table.
 */
export interface DappMetricView {
  title: string;
  value: string;
  description: string;
  footerValue: string;
  footerLabel: string;
  kind: DappMetricKind;
  info?: string;
}

/**
 * One value in a resource distribution chart.
 */
export interface DappChartDatumView {
  label: string;
  value: number;
  displayValue: string;
  fill?: string;
}

/**
 * Summary data displayed above a resource wallet table.
 */
export interface DappHighlightsView {
  metrics: readonly DappMetricView[];
  balanceDistribution: readonly DappChartDatumView[];
}

/**
 * Wallet displayed in a resource audience table.
 */
export interface DappWalletView {
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
export interface DappInsightMetricView {
  title: string;
  value: string;
  description: string;
  footer: string;
  info?: string;
}

/**
 * Transaction aggregate displayed in resource analytics.
 */
export interface DappTransactionStatView {
  label: string;
  value: string;
  tone: "default" | "negative" | "positive";
}

/**
 * Twitter profile found in a resource audience.
 */
export interface DappInfluencerView {
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
export interface DappOverlapView {
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
export interface DappInsightsView {
  balanceMetrics: readonly DappInsightMetricView[];
  walletBalance: readonly DappChartDatumView[];
  nftAllocation: readonly DappChartDatumView[];
  transactionStats: readonly DappTransactionStatView[];
  contactMetrics: readonly DappInsightMetricView[];
  influencers: readonly DappInfluencerView[];
  superrank: readonly DappChartDatumView[];
  interests: readonly DappChartDatumView[];
  personas: readonly DappChartDatumView[];
  overlap: readonly DappOverlapView[];
}
