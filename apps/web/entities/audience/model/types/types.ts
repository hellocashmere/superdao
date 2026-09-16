/**
 * Audience details persisted by the client application.
 */
export interface AudienceView {
	/**
	 * Unique audience ID.
	 */
	id: number;

	/**
	 * Audience title shown in navigation.
	 */
	title: string;

	/**
	 * Number of wallets in the audience.
	 */
	walletCount: number;
}

/**
 * Data required to create an audience.
 */
export interface CreateAudienceInput {
	/**
	 * Title assigned to the new audience.
	 */
	title: string;

	/**
	 * Initial number of wallets in the audience.
	 */
	walletCount: number;
}
