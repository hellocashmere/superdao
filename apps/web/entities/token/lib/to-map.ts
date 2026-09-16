import type {
	TokenChartDatumDTO,
	TokenDTO,
	TokenHighlightsDTO,
	TokenInsightMetricDTO,
	TokenInsightsDTO,
	TokenOverlapDTO,
	TokenWalletDTO,
} from "../api/types/types";
import type {
	TokenChartDatumView,
	TokenHighlightsView,
	TokenInsightMetricView,
	TokenInsightsView,
	TokenOverlapView,
	TokenView,
	TokenWalletView,
} from "../model/types/types";

/**
 * Converts a `TokenDTO` -> `TokenView`.
 */
export function TokenDTOToView(dto: TokenDTO): TokenView {
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
 * Converts a `TokenChartDatumDTO` -> `TokenChartDatumView`.
 */
export function TokenChartDatumDTOToView(dto: TokenChartDatumDTO): TokenChartDatumView {
	return {
		label: dto.label,
		value: dto.value,
		displayValue: dto.value,
		fill: dto.fill,
	};
}

/**
 * Converts a `TokenInsightMetricDTO` -> `TokenInsightMetricView`.
 */
function TokenInsightMetricDTOToView(dto: TokenInsightMetricDTO): TokenInsightMetricView {
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
 * Converts a `TokenHighlightsDTO` -> `TokenHighlightsView`.
 */
export function TokenHighlightsDTOToView(dto: TokenHighlightsDTO): TokenHighlightsView {
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
		balanceDistribution: dto.balance_distribution.map(TokenChartDatumDTOToView),
	};
}

/**
 * Converts a `TokenWalletDTO` -> `TokenWalletView`.
 */
export function TokenWalletDTOToView(dto: TokenWalletDTO): TokenWalletView {
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
 * Converts a `TokenOverlapDTO` -> `TokenOverlapView`.
 */
function TokenOverlapDTOToView(dto: TokenOverlapDTO): TokenOverlapView {
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
 * Converts a `TokenInsightsDTO` -> `TokenInsightsView`.
 */
export function TokenInsightsDTOToView(dto: TokenInsightsDTO): TokenInsightsView {
	return {
		balanceMetrics: dto.balance_metrics.map(TokenInsightMetricDTOToView),
		walletBalance: dto.wallet_balance.map(TokenChartDatumDTOToView),
		nftAllocation: dto.nft_allocation.map(TokenChartDatumDTOToView),
		transactionStats: dto.transaction_stats.map((stat) => ({
			label: stat.label,
			value: stat.value,
			variant: stat.variant,
		})),
		contactMetrics: dto.contact_metrics.map(TokenInsightMetricDTOToView),
		influencers: dto.influencers.map((profile) => ({
			title: profile.title,
			username: profile.username,
			followers: profile.followers,
			nfts: profile.nfts,
			balance: profile.balance,
			avatar: profile.avatar,
		})),
		superrank: dto.superrank.map(TokenChartDatumDTOToView),
		interests: dto.interests.map(TokenChartDatumDTOToView),
		personas: dto.personas.map(TokenChartDatumDTOToView),
		overlap: dto.overlap.map(TokenOverlapDTOToView),
	};
}
