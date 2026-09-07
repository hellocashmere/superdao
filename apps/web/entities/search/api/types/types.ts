/**
 * A global search result returned by the API.
 *
 * Endpoint: `GET /search-results`.
 */
export interface SearchResultDTO {
  id: string;
  name: string;
  type: string;
  href: string;
  target_id?: number;
  target_kind?: ExploreSearchTargetKind;
  avatar_src?: string;
  glyph?: "audience" | "label" | "music";
}
export type ExploreSearchTargetKind = "dapp" | "label" | "nft-collection" | "token" | "wallet";
