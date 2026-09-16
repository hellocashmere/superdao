/**
 * Leaderboard metric used to order wallets.
 */
export type WalletFilter = "rank" | "balance" | "transactions" | "twitter";

/**
 * Wallet identity displayed in links, cards, and headers.
 */
export interface WalletPreviewView {
	/**
	 * Unique entity ID.
	 */
	id: number;
	/**
	 * Display title.
	 */
	title: string;
	/**
	 * Avatar URL.
	 */
	avatar: string;
}

/**
 * Wallet card enriched with values for the selected leaderboard metric.
 */
export interface RankedWalletView extends WalletPreviewView {
	/**
	 * Leaderboard metric represented by this view.
	 */
	filter: WalletFilter;
	/**
	 * Primary value for the selected leaderboard metric.
	 */
	primaryMetric: number;
	/**
	 * Secondary value displayed beside the primary metric.
	 */
	secondaryMetric: number;
	/**
	 * Tertiary value displayed beside the primary metric.
	 */
	tertiaryMetric: number;
}

/**
 * NFT collection associated with a wallet.
 */
export interface WalletActivityCollectionView {
	/**
	 * Unique entity ID.
	 */
	id: string;
	/**
	 * Display title.
	 */
	title: string;
	/**
	 * Avatar URL.
	 */
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
	/**
	 * Unique entity ID.
	 */
	id: string;
	/**
	 * Contact or authentication provider.
	 */
	provider: WalletContactProvider;
	/**
	 * Human-readable field label.
	 */
	label: string;
}

/**
 * Plain-text segment in the wallet biography.
 */
export interface WalletBioTextSegmentView {
	/**
	 * Unique entity ID.
	 */
	id: string;
	/**
	 * Result classification.
	 */
	type: "text";
	/**
	 * Value rendered for this field.
	 */
	value: number | string;
}

/**
 * Linked segment in the wallet biography.
 */
export interface WalletBioLinkSegmentView {
	/**
	 * Unique entity ID.
	 */
	id: string;
	/**
	 * Result classification.
	 */
	type: "link";
	/**
	 * Human-readable field label.
	 */
	label: string;
	/**
	 * Destination URL.
	 */
	href: string;
	/**
	 * Heading displayed for the linked biography segment.
	 */
	heading: string;
	/**
	 * Supporting explanatory text.
	 */
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
	/**
	 * Unique entity ID.
	 */
	id: string;
	/**
	 * Human-readable field label.
	 */
	label: string;
	/**
	 * Value rendered for this field.
	 */
	value: number | string;
}

/**
 * Identity, biography, and statistics displayed in the wallet header.
 */
export interface WalletDetailsHeaderView {
	/**
	 * Wallet address.
	 */
	wallet: WalletPreviewView;
	/**
	 * Known addresses and domains associated with the wallet.
	 */
	ids: readonly string[];
	/**
	 * Renderable segments in the wallet biography.
	 */
	bio: readonly WalletBioSegmentView[];
	/**
	 * Expanded biography text shown in a tooltip.
	 */
	bioTooltip: string;
	/**
	 * Computed wallet ranking score.
	 */
	superrank: number;
	/**
	 * Human-readable time since the wallet was refreshed.
	 */
	lastUpdated: string;
	/**
	 * Summary statistics displayed in the wallet header.
	 */
	stats: readonly WalletHeaderStatView[];
}

/**
 * Visual variant assigned to a wallet classification label.
 */
export type WalletLabelVariant =
	| "amber"
	| "blue"
	| "constructive"
	| "cyan"
	| "fuchsia"
	| "primary"
	| "violet"
	| "yellow";

/**
 * Classification label assigned to a wallet.
 */
export interface WalletLabelView {
	/**
	 * Unique entity ID.
	 */
	id: string;
	/**
	 * Human-readable field label.
	 */
	label: string;
	/**
	 * Visual variant used to render the value.
	 */
	variant: WalletLabelVariant;
}

/**
 * Wallet with a similarity score relative to the current wallet.
 */
export interface WalletSimilarWalletView extends WalletPreviewView {
	/**
	 * Similarity score relative to the selected wallet.
	 */
	score: number;
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
 * Semantic visual variant used by a wallet transaction.
 */
export type WalletTransactionVariant = "muted" | "negative" | "positive";

/**
 * Aggregate metric displayed above recent transactions.
 */
export interface WalletTransactionMetricView {
	/**
	 * Unique entity ID.
	 */
	id: string;
	/**
	 * Human-readable field label.
	 */
	label: string;
	/**
	 * Value rendered for this field.
	 */
	value: number;
	/**
	 * Visual variant used to render the value.
	 */
	variant: "default" | "negative" | "positive";
}

/**
 * Recent transaction associated with a wallet.
 */
export interface WalletTransactionView {
	/**
	 * Unique entity ID.
	 */
	id: string;
	/**
	 * Result classification.
	 */
	type: string;
	/**
	 * Transaction kind used to select its icon.
	 */
	kind: WalletTransactionKind;
	/**
	 * Date associated with the record.
	 */
	date: string;
	/**
	 * Transaction asset symbol.
	 */
	asset: string;
	/**
	 * Optional transaction asset icon URL.
	 */
	assetIcon?: string;
	/**
	 * Transaction amount when available.
	 */
	amount: number | null;
	/**
	 * Direction of the transaction value.
	 */
	direction: WalletTransactionDirection;
	/**
	 * Visual variant used to render the value.
	 */
	variant: WalletTransactionVariant;
}

/**
 * Transaction summary and recent transaction rows.
 */
export interface WalletTransactionsView {
	/**
	 * Display title.
	 */
	title: string;
	/**
	 * Tooltip text explaining the section.
	 */
	tooltip: string;
	/**
	 * Summary metrics displayed by the section.
	 */
	metrics: readonly WalletTransactionMetricView[];
	/**
	 * Recent wallet transactions.
	 */
	transactions: readonly WalletTransactionView[];
}

/**
 * Complete view model consumed by the wallet details page.
 */
export interface WalletDetailsView {
	/**
	 * Wallet header identity and summary.
	 */
	header: WalletDetailsHeaderView;
	/**
	 * Contact methods available for the wallet.
	 */
	contacts: readonly WalletContactView[];
	/**
	 * Classification labels assigned to the wallet.
	 */
	labels: readonly WalletLabelView[];
	/**
	 * Collections found in wallet activity.
	 */
	activity: readonly WalletActivityCollectionView[];
	/**
	 * Wallets similar to the selected wallet.
	 */
	similarWallets: readonly WalletSimilarWalletView[];
	/**
	 * Recent wallet transactions.
	 */
	transactions: WalletTransactionsView;
}
