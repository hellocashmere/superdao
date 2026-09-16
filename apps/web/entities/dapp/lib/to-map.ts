import type {
	DappChartDatumDTO,
	DappDTO,
	DappHighlightsDTO,
	DappInsightMetricDTO,
	DappInsightsDTO,
	DappOverlapDTO,
	DappWalletDTO,
} from "../api/types/types";
import type {
	DappChartDatumView,
	DappHighlightsView,
	DappInsightMetricView,
	DappInsightsView,
	DappOverlapView,
	DappView,
	DappWalletView,
} from "../model/types/types";

/**
 * Converts a `DappDTO` -> `DappView`.
 */
export function DappDTOToView(dto: DappDTO): DappView {
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
 * Converts a `DappChartDatumDTO` -> `DappChartDatumView`.
 */
export function DappChartDatumDTOToView(dto: DappChartDatumDTO): DappChartDatumView {
	return {
		label: dto.label,
		value: dto.value,
		displayValue: dto.value,
		fill: dto.fill,
	};
}

/**
 * Converts a `DappInsightMetricDTO` -> `DappInsightMetricView`.
 */
function DappInsightMetricDTOToView(dto: DappInsightMetricDTO): DappInsightMetricView {
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
 * Converts a `DappHighlightsDTO` -> `DappHighlightsView`.
 */
export function DappHighlightsDTOToView(dto: DappHighlightsDTO): DappHighlightsView {
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
		balanceDistribution: dto.balance_distribution.map(DappChartDatumDTOToView),
	};
}

/**
 * Converts a `DappWalletDTO` -> `DappWalletView`.
 */
export function DappWalletDTOToView(dto: DappWalletDTO): DappWalletView {
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
 * Converts a `DappOverlapDTO` -> `DappOverlapView`.
 */
function DappOverlapDTOToView(dto: DappOverlapDTO): DappOverlapView {
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
 * Converts a `DappInsightsDTO` -> `DappInsightsView`.
 */
export function DappInsightsDTOToView(dto: DappInsightsDTO): DappInsightsView {
	return {
		balanceMetrics: dto.balance_metrics.map(DappInsightMetricDTOToView),
		walletBalance: dto.wallet_balance.map(DappChartDatumDTOToView),
		nftAllocation: dto.nft_allocation.map(DappChartDatumDTOToView),
		transactionStats: dto.transaction_stats.map((stat) => ({
			label: stat.label,
			value: stat.value,
			variant: stat.variant,
		})),
		contactMetrics: dto.contact_metrics.map(DappInsightMetricDTOToView),
		influencers: dto.influencers.map((profile) => ({
			title: profile.title,
			username: profile.username,
			followers: profile.followers,
			nfts: profile.nfts,
			balance: profile.balance,
			avatar: profile.avatar,
		})),
		superrank: dto.superrank.map(DappChartDatumDTOToView),
		interests: dto.interests.map(DappChartDatumDTOToView),
		personas: dto.personas.map(DappChartDatumDTOToView),
		overlap: dto.overlap.map(DappOverlapDTOToView),
	};
}
