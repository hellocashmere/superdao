import type { SearchResultDTO } from "../api/types/types";
import type { SearchResultView } from "../model/types/types";

/**
 * Converts a search result DTO into a view model rendered by application widgets.
 */
export function SearchResultDTOToView(dto: SearchResultDTO): SearchResultView {
  return {
    id: dto.id,
    name: dto.name,
    type: dto.type,
    href: dto.href,
    avatarSrc: dto.avatar_src,
    glyph: dto.glyph,
  };
}
