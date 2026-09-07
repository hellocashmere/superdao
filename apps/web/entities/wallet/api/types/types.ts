/**
 * A wallet metric used in the leaderboard.
 *
 * Endpoint: `GET /wallets`.
 */
export interface WalletMetricDTO {
  primary: string;
  secondary: string;
  tertiary: string;
}

/**
 * A wallet returned for lists, leaderboards, and previews.
 *
 * Endpoints: `GET /wallets`, `GET /wallets/:id`.
 */
export interface WalletDTO {
  id: string;
  name: string;
  avatar: string;
  metrics: Record<"balance" | "rank" | "transactions" | "twitter", WalletMetricDTO>;
  balance_order: number;
  rank_order: number;
  recent_order: number;
  transactions_order: number;
  twitter_order: number;
}

/**
 * A wallet overview displayed in the page header.
 *
 * Endpoint: `GET /wallet-overviews?id=:id`.
 */
export interface WalletOverviewDTO {
  id: number;
  wallet_id: number;
  ids: readonly string[];
  bio: ReadonlyArray<WalletBioLinkSegmentDTO | WalletBioTextSegmentDTO>;
  bio_tooltip: string;
  superrank: number;
  last_updated: string;
  stats: readonly WalletHeaderStatDTO[];
}

/**
 * A text segment in a wallet biography.
 *
 * Endpoint: `GET /wallet-overviews?id=:id`.
 */
export interface WalletBioTextSegmentDTO {
  id: string;
  type: "text";
  value: string;
}

/**
 * A link segment in a wallet biography.
 *
 * Endpoint: `GET /wallet-overviews?id=:id`.
 */
export interface WalletBioLinkSegmentDTO {
  id: string;
  type: "link";
  label: string;
  href: string;
  heading: string;
  description: string;
}

/**
 * A statistic displayed in the wallet page header.
 *
 * Endpoint: `GET /wallet-overviews?id=:id`.
 */
export interface WalletHeaderStatDTO {
  id: string;
  label: string;
  value: string;
}

/**
 * A collection found in wallet activity.
 *
 * Endpoint: `GET /wallet-activities?wallet_id=:id`.
 */
export interface WalletActivityCollectionDTO {
  id: string;
  name: string;
  avatar: string;
  wallet_id: number;
}

/**
 * A wallet contact method.
 *
 * Endpoint: `GET /wallet-contacts?wallet_id=:id`.
 */
export interface WalletContactDTO {
  id: string;
  provider: "email" | "etherscan" | "lens" | "mirror" | "opensea" | "polygonscan" | "twitter" | "zapper";
  label: string;
  wallet_id: number;
}

/**
 * A classification label assigned to a wallet.
 *
 * Endpoint: `GET /wallet-labels?wallet_id=:id`.
 */
export interface WalletLabelDTO {
  id: string;
  label: string;
  tone: "amber" | "blue" | "constructive" | "cyan" | "fuchsia" | "primary" | "violet" | "yellow";
  wallet_id: number;
}

/**
 * A wallet similar to the selected wallet.
 *
 * Endpoint: `GET /wallet-similar-wallets?wallet_id=:id`.
 */
export interface WalletSimilarWalletDTO {
  id: string;
  similar_wallet_id: number;
  name: string;
  avatar: string;
  score: string;
  wallet_id: number;
}

/**
 * A metric from a wallet transaction summary.
 *
 * Endpoint: `GET /wallet-transaction-summaries?id=:id`.
 */
export interface WalletTransactionMetricDTO {
  id: string;
  label: string;
  tone: "default" | "negative" | "positive";
  value: string;
}

/**
 * A wallet transaction.
 *
 * Endpoint: `GET /wallet-transaction-summaries?id=:id`.
 */
export interface WalletTransactionDTO {
  id: string;
  type: string;
  kind: "approved" | "contract" | "transfer" | "unknown";
  date: string;
  asset: string;
  asset_icon: string | null;
  amount: string;
  direction: "down" | "none" | "up";
  tone: "muted" | "negative" | "positive";
}

/**
 * A summary of wallet metrics and recent transactions.
 *
 * Endpoint: `GET /wallet-transaction-summaries?id=:id`.
 */
export interface WalletTransactionsDTO {
  id: number;
  wallet_id: number;
  title: string;
  tooltip: string;
  metrics: readonly WalletTransactionMetricDTO[];
  transactions: readonly WalletTransactionDTO[];
}
