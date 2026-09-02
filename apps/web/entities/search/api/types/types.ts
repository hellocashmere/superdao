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
  avatar_src?: string;
  glyph?: "audience" | "label" | "music";
}
