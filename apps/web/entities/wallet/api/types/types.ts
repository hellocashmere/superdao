/**
 * A wallet metric used in the leaderboard.
 *
 * Endpoint: `GET /wallets`.
 */
export interface WalletMetricDTO {
	/**
	 * Primary metric value.
	 */
	primary: number;
	/**
	 * Secondary metric value.
	 */
	secondary: number;
	/**
	 * Tertiary metric value.
	 */
	tertiary: number;
}

/**
 * A wallet returned for lists, leaderboards, and previews.
 *
 * Endpoints: `GET /wallets`, `GET /wallets/:id`.
 */
export interface WalletDTO {
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
	/**
	 * Summary metrics displayed by the section.
	 */
	metrics: Record<"balance" | "rank" | "transactions" | "twitter", WalletMetricDTO>;
	/**
	 * Wallet IDs ordered by balance.
	 */
	balance_order: number;
	/**
	 * Wallet IDs ordered by rank.
	 */
	rank_order: number;
	/**
	 * Wallet IDs ordered by recent activity.
	 */
	recent_order: number;
	/**
	 * Wallet IDs ordered by transaction count.
	 */
	transactions_order: number;
	/**
	 * Wallet IDs ordered by Twitter audience.
	 */
	twitter_order: number;
}

/**
 * A wallet identity and overview returned by the details endpoint.
 *
 * Endpoint: `GET /wallets/:id`.
 */
export interface WalletDetailsDTO {
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
	/**
	 * Known addresses and domains associated with the wallet.
	 */
	ids: readonly string[];
	/**
	 * Renderable segments in the wallet biography.
	 */
	bio: readonly WalletBioSegmentDTO[];
	/**
	 * Expanded biography text shown in a tooltip.
	 */
	bio_tooltip: string;
	/**
	 * Computed wallet ranking score.
	 */
	superrank: number;
	/**
	 * Human-readable time since the wallet was refreshed.
	 */
	last_updated: string;
	/**
	 * Summary statistics displayed in the wallet header.
	 */
	stats: readonly WalletHeaderStatDTO[];
}

/**
 * A wallet overview displayed in the page header.
 *
 * Endpoint: `GET /wallets/:id`.
 */
/**
 * A text segment in a wallet biography.
 *
 * Endpoint: `GET /wallets/:id`.
 */
export interface WalletBioTextSegmentDTO {
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
	value: string;
}

/**
 * A link segment in a wallet biography.
 *
 * Endpoint: `GET /wallets/:id`.
 */
export interface WalletBioLinkSegmentDTO {
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
 * A renderable segment in a wallet biography.
 *
 * Endpoint: `GET /wallets/:id`.
 */
export type WalletBioSegmentDTO = WalletBioLinkSegmentDTO | WalletBioTextSegmentDTO;

/**
 * A statistic displayed in the wallet page header.
 *
 * Endpoint: `GET /wallets/:id`.
 */
export interface WalletHeaderStatDTO {
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
 * A collection found in wallet activity.
 *
 * Endpoint: `GET /wallets/:id/activity`.
 */
export interface WalletActivityCollectionDTO {
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
	/**
	 * ID of the wallet that owns this record.
	 */
	wallet_id: number;
}

/**
 * A wallet contact method.
 *
 * Endpoint: `GET /wallets/:id/contacts`.
 */
export interface WalletContactDTO {
	/**
	 * Unique entity ID.
	 */
	id: string;
	/**
	 * Contact or authentication provider.
	 */
	provider: "email" | "etherscan" | "lens" | "mirror" | "opensea" | "polygonscan" | "twitter" | "zapper";
	/**
	 * Human-readable field label.
	 */
	label: string;
	/**
	 * ID of the wallet that owns this record.
	 */
	wallet_id: number;
}

/**
 * A classification label assigned to a wallet.
 *
 * Endpoint: `GET /wallets/:id/labels`.
 */
export interface WalletLabelDTO {
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
	variant: "amber" | "blue" | "constructive" | "cyan" | "fuchsia" | "primary" | "violet" | "yellow";
	/**
	 * ID of the wallet that owns this record.
	 */
	wallet_id: number;
}

/**
 * A wallet similar to the selected wallet.
 *
 * Endpoint: `GET /wallets/:id/similar-wallets`.
 */
export interface WalletSimilarWalletDTO {
	/**
	 * Unique entity ID.
	 */
	id: string;
	/**
	 * ID of the similar wallet.
	 */
	similar_wallet_id: number;
	/**
	 * Display title.
	 */
	title: string;
	/**
	 * Avatar URL.
	 */
	avatar: string;
	/**
	 * Similarity score relative to the selected wallet.
	 */
	score: number;
	/**
	 * ID of the wallet that owns this record.
	 */
	wallet_id: number;
}

/**
 * A metric from a wallet transaction summary.
 *
 * Endpoint: `GET /wallets/:id/transaction-summary`.
 */
export interface WalletTransactionMetricDTO {
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
	variant: "default" | "negative" | "positive";
	/**
	 * Value rendered for this field.
	 */
	value: number;
}

/**
 * A wallet transaction.
 *
 * Endpoint: `GET /wallets/:id/transaction-summary`.
 */
export interface WalletTransactionDTO {
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
	kind: "approved" | "contract" | "transfer" | "unknown";
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
	asset_icon: string | null;
	/**
	 * Transaction amount when available.
	 */
	amount: number | null;
	/**
	 * Direction of the transaction value.
	 */
	direction: "down" | "none" | "up";
	/**
	 * Visual variant used to render the value.
	 */
	variant: "muted" | "negative" | "positive";
}

/**
 * A summary of wallet metrics and recent transactions.
 *
 * Endpoint: `GET /wallets/:id/transaction-summary`.
 */
export interface WalletTransactionsDTO {
	/**
	 * Unique entity ID.
	 */
	id: number;
	/**
	 * ID of the wallet that owns this record.
	 */
	wallet_id: number;
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
	metrics: readonly WalletTransactionMetricDTO[];
	/**
	 * Recent wallet transactions.
	 */
	transactions: readonly WalletTransactionDTO[];
}
