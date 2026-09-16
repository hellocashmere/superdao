import type {
	WalletActivityCollectionDTO,
	WalletContactDTO,
	WalletDetailsDTO,
	WalletDTO,
	WalletLabelDTO,
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
 * Converts a `WalletDTO` -> `WalletPreviewView`.
 */
export function WalletDTOToPreviewView(dto: WalletDTO): WalletPreviewView {
	return {
		id: Number(dto.id),
		title: dto.title,
		avatar: dto.avatar,
	};
}

/**
 * Converts a `WalletDetailsDTO` -> `WalletPreviewView`.
 */
export function WalletDetailsDTOToPreviewView(dto: WalletDetailsDTO): WalletPreviewView {
	return {
		id: dto.id,
		title: dto.title,
		avatar: dto.avatar,
	};
}

/**
 * Converts a `WalletDTO` -> `RankedWalletView`.
 */
export function WalletDTOToRankedView(dto: WalletDTO, filter: WalletFilter): RankedWalletView {
	const metrics = dto.metrics[filter];

	return {
		id: Number(dto.id),
		title: dto.title,
		avatar: dto.avatar,
		filter,
		primaryMetric: metrics.primary,
		secondaryMetric: metrics.secondary,
		tertiaryMetric: metrics.tertiary,
	};
}

/**
 * Converts a `WalletDetailsDTO` -> `WalletDetailsHeaderView`.
 */
export function WalletDetailsDTOToView(dto: WalletDetailsDTO): WalletDetailsHeaderView {
	const wallet = WalletDetailsDTOToPreviewView(dto);

	return {
		wallet: wallet,
		ids: Array.from(new Set([wallet.title, ...dto.ids])),
		bio: dto.bio.map((segment) =>
			segment.type === "link"
				? {
						id: segment.id,
						type: segment.type,
						label: segment.label,
						href: segment.href,
						heading: segment.heading,
						description: segment.description,
					}
				: { id: segment.id, type: segment.type, value: segment.value }
		),
		bioTooltip: dto.bio_tooltip,
		superrank: dto.superrank,
		lastUpdated: dto.last_updated,
		stats: dto.stats.map((stat) => ({ id: stat.id, label: stat.label, value: stat.value })),
	};
}

/**
 * Converts a `WalletContactDTO` -> `WalletContactView`.
 */
export function WalletContactDTOToView(dto: WalletContactDTO): WalletContactView {
	return {
		id: dto.id,
		provider: dto.provider,
		label: dto.label,
	};
}

/**
 * Converts a `WalletLabelDTO` -> `WalletLabelView`.
 */
export function WalletLabelDTOToView(dto: WalletLabelDTO): WalletLabelView {
	return {
		id: dto.id,
		label: dto.label,
		variant: dto.variant,
	};
}

/**
 * Converts a `WalletActivityCollectionDTO` -> `WalletActivityCollectionView`.
 */
export function WalletActivityCollectionDTOToView(dto: WalletActivityCollectionDTO): WalletActivityCollectionView {
	return {
		id: dto.id,
		title: dto.title,
		avatar: dto.avatar,
	};
}

/**
 * Converts a `WalletSimilarWalletDTO` -> `WalletSimilarWalletView`.
 */
export function WalletSimilarWalletDTOToView(dto: WalletSimilarWalletDTO): WalletSimilarWalletView {
	return {
		id: dto.similar_wallet_id,
		title: dto.title,
		avatar: dto.avatar,
		score: dto.score,
	};
}

/**
 * Converts a `WalletTransactionDTO` -> `WalletTransactionView`.
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
		variant: dto.variant,
	};
}

/**
 * Converts a `WalletTransactionsDTO` -> `WalletTransactionsView`.
 */
export function WalletTransactionsDTOToView(dto: WalletTransactionsDTO): WalletTransactionsView {
	return {
		title: dto.title,
		tooltip: dto.tooltip,
		metrics: dto.metrics.map((metric) => ({
			id: metric.id,
			label: metric.label,
			value: metric.value,
			variant: metric.variant,
		})),
		transactions: dto.transactions.map(WalletTransactionDTOToView),
	};
}
