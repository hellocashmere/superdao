/**
 * Label category used to group cards in the directory.
 */
export type LabelCategory = "interest" | "persona";

/**
 * Label identity displayed in cards and page headers.
 */
export interface LabelPreviewView {
  id: string;
  name: string;
  walletCount: string;
  color: string;
  category: LabelCategory;
}

/**
 * Details displayed for a selected label.
 */
export interface LabelDetailsView extends LabelPreviewView {}

/**
 * Kind of metric displayed in label highlights.
 */
export type LabelMetricKind = "activity" | "balance" | "email" | "influencers" | "nfts" | "twitter";

/**
 * Summary metric displayed above the label wallet table.
 */
export interface LabelMetric {
  title: string;
  value: string;
  description: string;
  footerValue: string;
  footerLabel: string;
  kind: LabelMetricKind;
  info?: string;
}

/**
 * One value in a label distribution chart.
 */
export interface InsightBarDatum {
  label: string;
  value: number;
  displayValue: string;
  fill?: string;
}

/**
 * Summary data displayed above the label wallet table.
 */
export interface LabelHighlightsView {
  metrics: readonly LabelMetric[];
  balanceDistribution: readonly InsightBarDatum[];
}

/**
 * Visual tone assigned to a wallet classification.
 */
export type LabelTagTone = "blue" | "green" | "orange" | "pink" | "purple" | "yellow";

/**
 * Classification assigned to a wallet in a label audience.
 */
export interface LabelTag {
  name: string;
  tone: LabelTagTone;
}

/**
 * Activity identity associated with a label wallet.
 */
export interface LabelWalletActivity {
  avatar: string;
  name: string;
}

/**
 * Visual tone assigned to a wallet rank.
 */
export type RankTone = "constructive" | "lime" | "orange";

/**
 * Wallet displayed in a label audience table.
 */
export interface LabelWallet {
  id: number;
  name: string;
  avatar: string;
  rank: string;
  rankTone: RankTone;
  age: string;
  ageDetails?: string;
  labels: readonly LabelTag[];
  balance: string;
  nfts: string;
  twitter: string;
  activity: readonly LabelWalletActivity[];
  contacts: readonly ("email" | "link" | "mirror" | "opensea" | "twitter")[];
}

/**
 * Reusable metric displayed in the label Insights tab.
 */
export interface LabelInsightMetricView {
  title: string;
  value: string;
  description: string;
  footer: string;
  info?: string;
}

/**
 * Transaction aggregate displayed in the label Insights tab.
 */
export interface LabelTransactionStatView {
  label: string;
  value: string;
  tone: "default" | "negative" | "positive";
}

/**
 * Twitter profile found in a label audience.
 */
export interface TwitterInfluencer {
  name: string;
  username: string;
  followers: string;
  nfts: string;
  balance: string;
  avatar: string;
}

/**
 * NFT collection that overlaps with a label audience.
 */
export interface AudienceOverlapCollection {
  name: string;
  avatar: string;
  ownersInAudience: string;
  shareInAudience: string;
  owners: string;
  itemsInAudience: string;
  items: string;
  floorPrice: string;
  chain: "ethereum" | "polygon";
}

/**
 * Complete analytics view consumed by the label Insights tab.
 */
export interface LabelInsightsView {
  balanceMetrics: readonly LabelInsightMetricView[];
  walletBalance: readonly InsightBarDatum[];
  nftAllocation: readonly InsightBarDatum[];
  transactionStats: readonly LabelTransactionStatView[];
  contactMetrics: readonly LabelInsightMetricView[];
  twitterInfluencers: readonly TwitterInfluencer[];
  superrank: readonly InsightBarDatum[];
  interests: readonly InsightBarDatum[];
  personas: readonly InsightBarDatum[];
  audienceOverlap: readonly AudienceOverlapCollection[];
  notableProjects: readonly AudienceOverlapCollection[];
}
