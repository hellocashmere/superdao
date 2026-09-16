import { exploreRoutes } from "@/shared/lib/routes";

import type { SearchResultDTO } from "../api/types/types";
import type { SearchResultView } from "../model/types/types";

/**
 * Converts a `SearchResultDTO` -> canonical href `string`.
 */
function SearchResultDTOToHref(dto: SearchResultDTO): string {
	if (dto.target_id === undefined || dto.target_kind === undefined) return dto.href;
	if (dto.target_kind === "wallet") return exploreRoutes.wallet(dto.target_id);
	if (dto.target_kind === "label") return exploreRoutes.labelWallets(dto.target_id);
	if (dto.target_kind === "nft-collection") return exploreRoutes.nftCollectionWallets(dto.target_id);
	if (dto.target_kind === "token") return exploreRoutes.tokenWallets(dto.target_id);

	return exploreRoutes.dappWallets(dto.target_id);
}

/**
 * Converts a `SearchResultDTO` -> `SearchResultView`.
 */
export function SearchResultDTOToView(dto: SearchResultDTO): SearchResultView {
	return {
		id: dto.id,
		title: dto.title,
		type: dto.type,
		href: SearchResultDTOToHref(dto),
		targetID: dto.target_id,
		targetKind: dto.target_kind,
		avatarSrc: dto.avatar_src,
		glyph: dto.glyph,
	};
}
