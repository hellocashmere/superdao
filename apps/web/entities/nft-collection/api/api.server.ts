import { baseQuery } from "@/shared/api/tanstack";

import "server-only";

import { NftCollectionDTOToView } from "../lib/to-map";
import type { NftCollectionView } from "../model/types/types";

import type { NftCollectionDTO } from "./types/types";

/**
 * Loads one NFT collection for server-side consumers.
 *
 * Endpoint: `GET /nft-collections/:id`.
 */
export async function getNftCollection(id: number): Promise<NftCollectionView> {
	const response = await baseQuery<NftCollectionDTO>(`/nft-collections/${id}`, {
		method: "GET",
	});

	return NftCollectionDTOToView(response.data);
}
