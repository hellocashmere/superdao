import type {
  NftCollectionChartDatumDTO,
  NftCollectionDTO,
  NftCollectionHighlightsDTO,
  NftCollectionInsightsDTO,
  NftCollectionOverlapDTO,
  NftCollectionWalletDTO,
} from "../api/types/types";
import type {
  NftCollectionChartDatumView,
  NftCollectionHighlightsView,
  NftCollectionInsightsView,
  NftCollectionOverlapView,
  NftCollectionView,
  NftCollectionWalletView,
} from "../model/types/types";

/**
 * Converts a resource DTO into the view used by directories and headers.
 */
export function NftCollectionDTOToView(dto: NftCollectionDTO): NftCollectionView {
  return {
    id: dto.id,
    name: dto.name,
    avatar: dto.avatar,
    owners: dto.owners,
    activeWallets: dto.active_wallets,
    supply: dto.supply,
    price: dto.price,
    chain: dto.chain,
    walletCount: dto.wallet_count,
  };
}

/**
 * Converts a chart DTO into the view consumed by resource visualizations.
 */
export function NftCollectionChartDatumDTOToView(dto: NftCollectionChartDatumDTO): NftCollectionChartDatumView {
  return {
    label: dto.label,
    value: dto.value,
    displayValue: dto.display_value,
    fill: dto.fill,
  };
}

/**
 * Converts resource highlights into the view displayed above the wallet table.
 */
export function NftCollectionHighlightsDTOToView(dto: NftCollectionHighlightsDTO): NftCollectionHighlightsView {
  return {
    metrics: dto.metrics.map((metric) => ({
      title: metric.title,
      value: metric.value,
      description: metric.description,
      footerValue: metric.footer_value,
      footerLabel: metric.footer_label,
      kind: metric.kind,
      info: metric.info,
    })),
    balanceDistribution: dto.balance_distribution.map(NftCollectionChartDatumDTOToView),
  };
}

/**
 * Converts a resource-wallet DTO into the table row view.
 */
export function NftCollectionWalletDTOToView(dto: NftCollectionWalletDTO): NftCollectionWalletView {
  return {
    id: dto.id,
    name: dto.name,
    avatar: dto.avatar,
    rank: dto.rank,
    rankTone: dto.rank_tone,
    age: dto.age,
    ageDetails: dto.age_details,
    labels: dto.labels.map((label) => ({ ...label })),
    balance: dto.balance,
    nfts: dto.nfts,
    twitter: dto.twitter,
    activity: dto.activity.map((activity) => ({ ...activity })),
    contacts: [...dto.contacts],
  };
}

function NftCollectionOverlapDTOToView(dto: NftCollectionOverlapDTO): NftCollectionOverlapView {
  return {
    name: dto.name,
    avatar: dto.avatar,
    ownersInAudience: dto.owners_in_audience,
    shareInAudience: dto.share_in_audience,
    owners: dto.owners,
    floorPrice: dto.floor_price,
  };
}

/**
 * Converts resource analytics into the view consumed by the Insights tab.
 */
export function NftCollectionInsightsDTOToView(dto: NftCollectionInsightsDTO): NftCollectionInsightsView {
  return {
    balanceMetrics: dto.balance_metrics.map((metric) => ({ ...metric })),
    walletBalance: dto.wallet_balance.map(NftCollectionChartDatumDTOToView),
    nftAllocation: dto.nft_allocation.map(NftCollectionChartDatumDTOToView),
    transactionStats: dto.transaction_stats.map((stat) => ({ ...stat })),
    contactMetrics: dto.contact_metrics.map((metric) => ({ ...metric })),
    influencers: dto.influencers.map((profile) => ({ ...profile })),
    superrank: dto.superrank.map(NftCollectionChartDatumDTOToView),
    interests: dto.interests.map(NftCollectionChartDatumDTOToView),
    personas: dto.personas.map(NftCollectionChartDatumDTOToView),
    overlap: dto.overlap.map(NftCollectionOverlapDTOToView),
  };
}
