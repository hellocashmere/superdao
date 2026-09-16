/**
 * An audience returned for navigation in the application sidebar.
 *
 * Endpoint: `GET /audiences`.
 */
export interface SidebarAudienceDTO {
	/**
	 * Unique audience identifier.
	 */
	id: number;

	/**
	 * Audience title shown in navigation.
	 */
	title: string;

	/**
	 * Number of wallets included in the audience.
	 */
	wallet_count: number;
}

/**
 * Payload used to create an audience.
 *
 * Endpoint: `POST /audiences`.
 */
export interface CreateAudienceDTO {
	/**
	 * Audience title.
	 */
	title: string;

	/**
	 * Number of wallets included in the audience.
	 */
	wallet_count: number;
}
