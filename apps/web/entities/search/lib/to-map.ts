import { exploreRoutes } from "@/shared/lib/routes";

import type { SearchResultDTO } from "../api/types/types";
import type { SearchResultView } from "../model/types/types";

function getCanonicalHref(dto: SearchResultDTO): string {
  if (dto.target_id === undefined || dto.target_kind === undefined) return dto.href;
  if (dto.target_kind === "wallet") return exploreRoutes.wallet(dto.target_id);
  if (dto.target_kind === "label") return exploreRoutes.labelWallets(dto.target_id);
  if (dto.target_kind === "nft-collection") return exploreRoutes.nftCollectionWallets(dto.target_id);
  if (dto.target_kind === "token") return exploreRoutes.tokenWallets(dto.target_id);

  return exploreRoutes.dappWallets(dto.target_id);
}

/**
 * Converts a search result DTO into a view model rendered by application widgets.
 */
export function SearchResultDTOToView(dto: SearchResultDTO): SearchResultView {
  return {
    id: dto.id,
    name: dto.name,
    type: dto.type,
    href: getCanonicalHref(dto),
    targetID: dto.target_id,
    targetKind: dto.target_kind,
    avatarSrc: dto.avatar_src,
    glyph: dto.glyph,
  };
}
