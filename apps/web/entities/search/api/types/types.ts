/**
 * A global search result returned by the API.
 *
 * Endpoint: `GET /search`.
 */
export interface SearchResultDTO {
	/**
	 * Stable identifier for the search result.
	 */
	id: string;

	/**
	 * Display name returned by global search.
	 */
	title: string;

	/**
	 * Resource type shown with the result.
	 */
	type: string;

	/**
	 * Fallback destination supplied by the API.
	 */
	href: string;

	/**
	 * Optional numeric identifier of the matched resource.
	 */
	target_id?: number;

	/**
	 * Kind of resource matched by the search query.
	 */
	target_kind?: ExploreSearchTargetKind;

	/**
	 * Optional avatar image URL for the result.
	 */
	avatar_src?: string;

	/**
	 * Optional icon fallback used by the client.
	 */
	glyph?: "audience" | "label" | "music";
}
export type ExploreSearchTargetKind = "dapp" | "label" | "nft-collection" | "token" | "wallet";
