/**
 * Identifies the visual fallback for a search result.
 */
export type SearchGlyph = "audience" | "label" | "music";

/**
 * Explore resource kind targeted by a search result.
 */
export type ExploreSearchTargetKind = "dapp" | "label" | "nft-collection" | "token" | "wallet";

/**
 * Represents a search result rendered by application widgets.
 */
export interface SearchResultView {
	/**
	 * Unique entity ID.
	 */
	id: string;
	/**
	 * Display title.
	 */
	title: string;
	/**
	 * Result classification.
	 */
	type: string;
	/**
	 * Destination URL.
	 */
	href: string;
	/**
	 * Optional target entity ID.
	 */
	targetID?: number;
	/**
	 * Optional target entity kind.
	 */
	targetKind?: ExploreSearchTargetKind;
	/**
	 * Avatar image source.
	 */
	avatarSrc?: string;
	/**
	 * Optional fallback glyph.
	 */
	glyph?: SearchGlyph;
}

/**
 * Contains persisted search state shared by client-side widgets.
 */
export interface SearchState {
	/**
	 * Whether persisted state has hydrated.
	 */
	hasHydrated: boolean;
	/**
	 * IDs of recently selected search results.
	 */
	recentSearchIDs: readonly string[];
}

/**
 * Defines mutations available to search-aware UI.
 */
export interface SearchActions {
	/**
	 * Adds a result to recent searches.
	 */
	addRecentSearch: (searchID: string) => void;
	/**
	 * Records that persisted state has hydrated.
	 */
	setHasHydrated: (hasHydrated: boolean) => void;
}

/**
 * Combines search state with mutations consumed by widgets.
 */
export type SearchStore = SearchState & SearchActions;
