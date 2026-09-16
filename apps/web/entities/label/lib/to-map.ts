import type {
	LabelChartDatumDTO,
	LabelDTO,
	LabelHighlightsDTO,
	LabelInsightMetricDTO,
	LabelInsightsDTO,
	LabelOverlapDTO,
	LabelWalletDTO,
} from "../api/types/types";
import type {
	LabelChartDatumView,
	LabelHighlightsView,
	LabelInsightMetricView,
	LabelInsightsView,
	LabelOverlapView,
	LabelView,
	LabelWalletView,
} from "../model/types/types";

/**
 * Converts a `LabelDTO` -> `LabelView`.
 */
export function LabelDTOToView(dto: LabelDTO): LabelView {
	return {
		id: Number(dto.id),
		slug: dto.slug,
		title: dto.title,
		walletCount: dto.wallet_count,
		color: dto.color,
		category: dto.category,
	};
}

/**
 * Converts a `LabelChartDatumDTO` -> `LabelChartDatumView`.
 */
export function LabelChartDatumDTOToView(dto: LabelChartDatumDTO): LabelChartDatumView {
	return {
		label: dto.label,
		value: dto.value,
		displayValue: dto.value,
		fill: dto.fill,
	};
}

/**
 * Converts a `LabelInsightMetricDTO` -> `LabelInsightMetricView`.
 */
function LabelInsightMetricDTOToView(dto: LabelInsightMetricDTO): LabelInsightMetricView {
	return {
		title: dto.title,
		value: dto.value,
		description: dto.description,
		footerValue: dto.footer_value,
		footerLabel: dto.footer_label,
		info: dto.info,
	};
}

/**
 * Converts a `LabelHighlightsDTO` -> `LabelHighlightsView`.
 */
export function LabelHighlightsDTOToView(dto: LabelHighlightsDTO): LabelHighlightsView {
	return {
		metrics: dto.metrics.map((metric) => ({
			id: metric.id,
			title: metric.title,
			value: metric.value,
			description: metric.description,
			footerValue: metric.footer_value,
			footerLabel: metric.footer_label,
			info: metric.info,
		})),
		balanceDistribution: dto.balance_distribution.map(LabelChartDatumDTOToView),
	};
}

/**
 * Converts a `LabelWalletDTO` -> `LabelWalletView`.
 */
export function LabelWalletDTOToView(dto: LabelWalletDTO): LabelWalletView {
	return {
		id: Number(dto.id),
		title: dto.title,
		avatar: dto.avatar,
		rank: dto.rank,
		age: dto.age,
		ageDetails: dto.age_details,
		labels: dto.labels.map((label) => ({ title: label.title, variant: label.variant })),
		balance: dto.balance,
		nfts: dto.nfts,
		twitter: dto.twitter,
		activity: dto.activity.map((activity) => ({ avatar: activity.avatar, title: activity.title })),
		contacts: [...dto.contacts],
	};
}

/**
 * Converts a `LabelOverlapDTO` -> `LabelOverlapView`.
 */
function LabelOverlapDTOToView(dto: LabelOverlapDTO): LabelOverlapView {
	return {
		title: dto.title,
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
 * Converts a `LabelInsightsDTO` -> `LabelInsightsView`.
 */
export function LabelInsightsDTOToView(dto: LabelInsightsDTO): LabelInsightsView {
	return {
		balanceMetrics: dto.balance_metrics.map(LabelInsightMetricDTOToView),
		walletBalance: dto.wallet_balance.map(LabelChartDatumDTOToView),
		nftAllocation: dto.nft_allocation.map(LabelChartDatumDTOToView),
		transactionStats: dto.transaction_stats.map((stat) => ({
			label: stat.label,
			value: stat.value,
			variant: stat.variant,
		})),
		contactMetrics: dto.contact_metrics.map(LabelInsightMetricDTOToView),
		influencers: dto.influencers.map((profile) => ({
			title: profile.title,
			username: profile.username,
			followers: profile.followers,
			nfts: profile.nfts,
			balance: profile.balance,
			avatar: profile.avatar,
		})),
		superrank: dto.superrank.map(LabelChartDatumDTOToView),
		interests: dto.interests.map(LabelChartDatumDTOToView),
		personas: dto.personas.map(LabelChartDatumDTOToView),
		overlap: dto.overlap.map(LabelOverlapDTOToView),
	};
}
