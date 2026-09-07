import type {
  WalletActivityCollectionDTO,
  WalletContactDTO,
  WalletDTO,
  WalletLabelDTO,
  WalletOverviewDTO,
  WalletSimilarWalletDTO,
  WalletTransactionDTO,
  WalletTransactionsDTO,
} from "../api/types/types";
import type {
  RankedWalletView,
  WalletActivityCollectionView,
  WalletContactView,
  WalletDetailsHeaderView,
  WalletFilter,
  WalletLabelView,
  WalletPreviewView,
  WalletSimilarWalletView,
  WalletTransactionsView,
  WalletTransactionView,
} from "../model/types/types";

/**
 * Converts a wallet DTO into the compact wallet view used by cards and links.
 */
export function WalletDTOToPreviewView(dto: WalletDTO): WalletPreviewView {
  return {
    id: Number(dto.id),
    name: dto.name,
    avatar: dto.avatar,
  };
}

/**
 * Converts a wallet DTO into a card view for the selected leaderboard metric.
 */
export function WalletDTOToRankedView(dto: WalletDTO, filter: WalletFilter): RankedWalletView {
  const metrics = dto.metrics[filter];

  return {
    ...WalletDTOToPreviewView(dto),
    primaryMetric: metrics.primary,
    secondaryMetric: metrics.secondary,
    tertiaryMetric: metrics.tertiary,
  };
}

/**
 * Combines wallet identity and overview data for the wallet header.
 */
export function WalletOverviewDTOToView(dto: WalletOverviewDTO, wallet: WalletPreviewView): WalletDetailsHeaderView {
  return {
    wallet: wallet,
    ids: Array.from(new Set([wallet.name, ...dto.ids])),
    bio: dto.bio.map((segment) => ({ ...segment })),
    bioTooltip: dto.bio_tooltip,
    superrank: dto.superrank,
    lastUpdated: dto.last_updated,
    stats: dto.stats.map((stat) => ({ ...stat })),
  };
}

/**
 * Maps a wallet contact DTO without its transport-only wallet reference.
 */
export function WalletContactDTOToView(dto: WalletContactDTO): WalletContactView {
  return {
    id: dto.id,
    provider: dto.provider,
    label: dto.label,
  };
}

/**
 * Maps a wallet label DTO without its transport-only wallet reference.
 */
export function WalletLabelDTOToView(dto: WalletLabelDTO): WalletLabelView {
  return {
    id: dto.id,
    label: dto.label,
    tone: dto.tone,
  };
}

/**
 * Maps an activity DTO without its transport-only wallet reference.
 */
export function WalletActivityCollectionDTOToView(dto: WalletActivityCollectionDTO): WalletActivityCollectionView {
  return {
    id: dto.id,
    name: dto.name,
    avatar: dto.avatar,
  };
}

/**
 * Maps a similar-wallet DTO without its transport-only wallet reference.
 */
export function WalletSimilarWalletDTOToView(dto: WalletSimilarWalletDTO): WalletSimilarWalletView {
  return {
    id: dto.similar_wallet_id,
    name: dto.name,
    avatar: dto.avatar,
    score: dto.score,
  };
}

/**
 * Converts a wallet transaction DTO into a renderable transaction view.
 */
export function WalletTransactionDTOToView(dto: WalletTransactionDTO): WalletTransactionView {
  return {
    id: dto.id,
    type: dto.type,
    kind: dto.kind,
    date: dto.date,
    asset: dto.asset,
    assetIcon: dto.asset_icon ?? undefined,
    amount: dto.amount,
    direction: dto.direction,
    tone: dto.tone,
  };
}

/**
 * Maps transaction summary data into the view consumed by the transactions block.
 */
export function WalletTransactionsDTOToView(dto: WalletTransactionsDTO): WalletTransactionsView {
  return {
    title: dto.title,
    tooltip: dto.tooltip,
    metrics: dto.metrics.map((metric) => ({
      id: metric.id,
      label: metric.label,
      value: metric.value,
      tone: metric.tone,
    })),
    transactions: dto.transactions.map(WalletTransactionDTOToView),
  };
}
