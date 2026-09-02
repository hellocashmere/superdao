/**
 * Leaderboard metric used to order wallets.
 */
export type WalletFilter = "rank" | "balance" | "transactions" | "twitter";

/**
 * Wallet identity displayed in links, cards, and headers.
 */
export interface WalletPreviewView {
  id: string;
  name: string;
  avatar: string;
}

/**
 * Wallet card enriched with values for the selected leaderboard metric.
 */
export interface RankedWalletView extends WalletPreviewView {
  primaryMetric: string;
  secondaryMetric: string;
  tertiaryMetric: string;
}

/**
 * NFT collection associated with a wallet.
 */
export interface WalletActivityCollectionView {
  id: string;
  name: string;
  avatar: string;
}

/**
 * Supported wallet contact provider.
 */
export type WalletContactProvider =
  | "email"
  | "etherscan"
  | "lens"
  | "mirror"
  | "opensea"
  | "polygonscan"
  | "twitter"
  | "zapper";

/**
 * External profile or contact method associated with a wallet.
 */
export interface WalletContactView {
  id: string;
  provider: WalletContactProvider;
  label: string;
}

/**
 * Plain-text segment in the wallet biography.
 */
export interface WalletBioTextSegmentView {
  id: string;
  type: "text";
  value: string;
}

/**
 * Linked segment in the wallet biography.
 */
export interface WalletBioLinkSegmentView {
  id: string;
  type: "link";
  label: string;
  href: string;
  heading: string;
  description: string;
}

/**
 * Renderable segment in the wallet biography.
 */
export type WalletBioSegmentView = WalletBioLinkSegmentView | WalletBioTextSegmentView;

/**
 * Summary statistic displayed in the wallet header.
 */
export interface WalletHeaderStatView {
  id: string;
  label: string;
  value: string;
}

/**
 * Identity, biography, and statistics displayed in the wallet header.
 */
export interface WalletDetailsHeaderView {
  wallet: WalletPreviewView;
  ids: readonly string[];
  bio: readonly WalletBioSegmentView[];
  bioTooltip: string;
  superrank: number;
  lastUpdated: string;
  stats: readonly WalletHeaderStatView[];
}

/**
 * Visual tone assigned to a wallet classification label.
 */
export type WalletLabelTone = "amber" | "blue" | "constructive" | "cyan" | "fuchsia" | "primary" | "violet" | "yellow";

/**
 * Classification label assigned to a wallet.
 */
export interface WalletLabelView {
  id: string;
  label: string;
  tone: WalletLabelTone;
}

/**
 * Wallet with a similarity score relative to the current wallet.
 */
export interface WalletSimilarWalletView extends WalletPreviewView {
  score: string;
}

/**
 * Direction represented by a wallet transaction.
 */
export type WalletTransactionDirection = "down" | "none" | "up";

/**
 * Kind of wallet transaction used to select its icon.
 */
export type WalletTransactionKind = "approved" | "contract" | "transfer" | "unknown";

/**
 * Semantic color tone used by a wallet transaction.
 */
export type WalletTransactionTone = "muted" | "negative" | "positive";

/**
 * Aggregate metric displayed above recent transactions.
 */
export interface WalletTransactionMetricView {
  id: string;
  label: string;
  value: string;
  tone: "default" | "negative" | "positive";
}

/**
 * Recent transaction associated with a wallet.
 */
export interface WalletTransactionView {
  id: string;
  type: string;
  kind: WalletTransactionKind;
  date: string;
  asset: string;
  assetIcon?: string;
  amount: string;
  direction: WalletTransactionDirection;
  tone: WalletTransactionTone;
}

/**
 * Transaction summary and recent transaction rows.
 */
export interface WalletTransactionsView {
  title: string;
  tooltip: string;
  metrics: readonly WalletTransactionMetricView[];
  transactions: readonly WalletTransactionView[];
}

/**
 * Complete view model consumed by the wallet details page.
 */
export interface WalletDetailsView {
  header: WalletDetailsHeaderView;
  contacts: readonly WalletContactView[];
  labels: readonly WalletLabelView[];
  activity: readonly WalletActivityCollectionView[];
  similarWallets: readonly WalletSimilarWalletView[];
  transactions: WalletTransactionsView;
}
