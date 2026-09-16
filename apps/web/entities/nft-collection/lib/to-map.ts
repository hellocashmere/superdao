import type {
	NftCollectionChartDatumDTO,
	NftCollectionDTO,
	NftCollectionHighlightsDTO,
	NftCollectionInsightMetricDTO,
	NftCollectionInsightsDTO,
	NftCollectionOverlapDTO,
	NftCollectionWalletDTO,
} from "../api/types/types";
import type {
	NftCollectionChartDatumView,
	NftCollectionHighlightsView,
	NftCollectionInsightMetricView,
	NftCollectionInsightsView,
	NftCollectionOverlapView,
	NftCollectionView,
	NftCollectionWalletView,
} from "../model/types/types";

/**
 * Converts a `NftCollectionDTO` -> `NftCollectionView`.
 */
export function NftCollectionDTOToView(dto: NftCollectionDTO): NftCollectionView {
	return {
		id: Number(dto.id),
		slug: dto.slug,
		title: dto.title,
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
 * Converts a `NftCollectionChartDatumDTO` -> `NftCollectionChartDatumView`.
 */
export function NftCollectionChartDatumDTOToView(dto: NftCollectionChartDatumDTO): NftCollectionChartDatumView {
	return {
		label: dto.label,
		value: dto.value,
		displayValue: dto.value,
		fill: dto.fill,
	};
}

/**
 * Converts a `NftCollectionInsightMetricDTO` -> `NftCollectionInsightMetricView`.
 */
function NftCollectionInsightMetricDTOToView(dto: NftCollectionInsightMetricDTO): NftCollectionInsightMetricView {
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
 * Converts a `NftCollectionHighlightsDTO` -> `NftCollectionHighlightsView`.
 */
export function NftCollectionHighlightsDTOToView(dto: NftCollectionHighlightsDTO): NftCollectionHighlightsView {
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
		balanceDistribution: dto.balance_distribution.map(NftCollectionChartDatumDTOToView),
	};
}

/**
 * Converts a `NftCollectionWalletDTO` -> `NftCollectionWalletView`.
 */
export function NftCollectionWalletDTOToView(dto: NftCollectionWalletDTO): NftCollectionWalletView {
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
 * Converts a `NftCollectionOverlapDTO` -> `NftCollectionOverlapView`.
 */
function NftCollectionOverlapDTOToView(dto: NftCollectionOverlapDTO): NftCollectionOverlapView {
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
 * Converts a `NftCollectionInsightsDTO` -> `NftCollectionInsightsView`.
 */
export function NftCollectionInsightsDTOToView(dto: NftCollectionInsightsDTO): NftCollectionInsightsView {
	return {
		balanceMetrics: dto.balance_metrics.map(NftCollectionInsightMetricDTOToView),
		walletBalance: dto.wallet_balance.map(NftCollectionChartDatumDTOToView),
		nftAllocation: dto.nft_allocation.map(NftCollectionChartDatumDTOToView),
		transactionStats: dto.transaction_stats.map((stat) => ({
			label: stat.label,
			value: stat.value,
			variant: stat.variant,
		})),
		contactMetrics: dto.contact_metrics.map(NftCollectionInsightMetricDTOToView),
		influencers: dto.influencers.map((profile) => ({
			title: profile.title,
			username: profile.username,
			followers: profile.followers,
			nfts: profile.nfts,
			balance: profile.balance,
			avatar: profile.avatar,
		})),
		superrank: dto.superrank.map(NftCollectionChartDatumDTOToView),
		interests: dto.interests.map(NftCollectionChartDatumDTOToView),
		personas: dto.personas.map(NftCollectionChartDatumDTOToView),
		overlap: dto.overlap.map(NftCollectionOverlapDTOToView),
	};
}
