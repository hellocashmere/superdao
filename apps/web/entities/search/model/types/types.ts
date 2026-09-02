/**
 * Identifies the visual fallback for a search result.
 */
export type SearchGlyph = "audience" | "label" | "music";

/**
 * Represents a search result rendered by application widgets.
 */
export interface SearchResultView {
  id: string;
  name: string;
  type: string;
  href: string;
  avatarSrc?: string;
  glyph?: SearchGlyph;
}

/**
 * Contains persisted search state shared by client-side widgets.
 */
export interface SearchState {
  hasHydrated: boolean;
  recentSearchIDs: readonly string[];
}

/**
 * Defines mutations available to search-aware UI.
 */
export interface SearchActions {
  addRecentSearch: (searchID: string) => void;
  setHasHydrated: (hasHydrated: boolean) => void;
}

/**
 * Combines search state with mutations consumed by widgets.
 */
export type SearchStore = SearchState & SearchActions;
