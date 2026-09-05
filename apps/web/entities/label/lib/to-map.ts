import type {
  LabelAudienceOverlapDTO,
  LabelChartDatumDTO,
  LabelDTO,
  LabelHighlightsDTO,
  LabelInsightMetricDTO,
  LabelInsightsDTO,
  LabelWalletDTO,
} from "../api/types/types";
import type {
  AudienceOverlapCollection,
  InsightBarDatum,
  LabelDetailsView,
  LabelHighlightsView,
  LabelInsightMetricView,
  LabelInsightsView,
  LabelPreviewView,
  LabelWallet,
} from "../model/types/types";

/**
 * Converts a label DTO into the compact view used by cards and headers.
 */
export function LabelDTOToPreviewView(dto: LabelDTO): LabelPreviewView {
  return {
    id: dto.id,
    name: dto.name,
    walletCount: dto.wallet_count,
    color: dto.color,
    category: dto.category,
  };
}

/**
 * Converts a label DTO into the details view used by the label page header.
 */
export function LabelDTOToDetailsView(dto: LabelDTO): LabelDetailsView {
  return LabelDTOToPreviewView(dto);
}

/**
 * Converts a chart DTO into the chart model consumed by label visualizations.
 */
export function LabelChartDatumDTOToView(dto: LabelChartDatumDTO): InsightBarDatum {
  return {
    label: dto.label,
    value: dto.value,
    displayValue: dto.display_value,
    fill: dto.fill,
  };
}

/**
 * Converts label highlight data into the view consumed above the wallet table.
 */
export function LabelHighlightsDTOToView(dto: LabelHighlightsDTO): LabelHighlightsView {
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
    balanceDistribution: dto.balance_distribution.map(LabelChartDatumDTOToView),
  };
}

/**
 * Converts a label-wallet DTO into the table row view.
 */
export function LabelWalletDTOToView(dto: LabelWalletDTO): LabelWallet {
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

function LabelInsightMetricDTOToView(dto: LabelInsightMetricDTO): LabelInsightMetricView {
  return { ...dto };
}

function LabelAudienceOverlapDTOToView(dto: LabelAudienceOverlapDTO): AudienceOverlapCollection {
  return {
    name: dto.name,
    avatar: dto.avatar,
    ownersInAudience: dto.owners_in_audience,
    shareInAudience: dto.share_in_audience,
    owners: dto.owners,
    itemsInAudience: dto.items_in_audience,
    items: dto.items,
    floorPrice: dto.floor_price,
    chain: dto.chain,
  };
}

/**
 * Converts label analytics into the view consumed by the Insights tab.
 */
export function LabelInsightsDTOToView(dto: LabelInsightsDTO): LabelInsightsView {
  return {
    balanceMetrics: dto.balance_metrics.map(LabelInsightMetricDTOToView),
    walletBalance: dto.wallet_balance.map(LabelChartDatumDTOToView),
    nftAllocation: dto.nft_allocation.map(LabelChartDatumDTOToView),
    transactionStats: dto.transaction_stats.map((stat) => ({ ...stat })),
    contactMetrics: dto.contact_metrics.map(LabelInsightMetricDTOToView),
    twitterInfluencers: dto.twitter_influencers.map((profile) => ({ ...profile })),
    superrank: dto.superrank.map(LabelChartDatumDTOToView),
    interests: dto.interests.map(LabelChartDatumDTOToView),
    personas: dto.personas.map(LabelChartDatumDTOToView),
    audienceOverlap: dto.audience_overlap.map(LabelAudienceOverlapDTOToView),
    notableProjects: dto.notable_projects.map(LabelAudienceOverlapDTOToView),
  };
}
