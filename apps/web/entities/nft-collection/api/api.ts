import type { UseQueryResult } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";

import type { APIResponse } from "@/shared/api";
import { baseQuery } from "@/shared/api/tanstack";

import {
  NftCollectionDTOToView,
  NftCollectionHighlightsDTOToView,
  NftCollectionInsightsDTOToView,
  NftCollectionWalletDTOToView,
} from "../lib/to-map";
import type {
  NftCollectionHighlightsView,
  NftCollectionInsightsView,
  NftCollectionView,
  NftCollectionWalletView,
} from "../model/types/types";

import type {
  NftCollectionDTO,
  NftCollectionHighlightsDTO,
  NftCollectionInsightsDTO,
  NftCollectionWalletDTO,
} from "./types/types";

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

/**
 * Loads NFT collections for the Explore directory.
 *
 * Endpoint: `GET /nft-collections`.
 */
export function useGetNftCollections(): UseQueryResult<readonly NftCollectionView[], Error> {
  return useQuery<APIResponse<readonly NftCollectionDTO[]>, Error, readonly NftCollectionView[]>({
    queryKey: ["nft-collections"],
    queryFn: () => baseQuery<readonly NftCollectionDTO[]>("/nft-collections", { method: "GET" }),
    select: (response) => response.data.map(NftCollectionDTOToView),
  });
}

/**
 * Loads one NFT collection by its backend-provided ID.
 *
 * Endpoint: `GET /nft-collections/:id`.
 */
export function useGetNftCollection(id: number): UseQueryResult<NftCollectionView, Error> {
  return useQuery<APIResponse<NftCollectionDTO>, Error, NftCollectionView>({
    queryKey: ["nft-collections", "by-id", id],
    queryFn: () => baseQuery<NftCollectionDTO>(`/nft-collections/${id}`, { method: "GET" }),
    select: (response) => NftCollectionDTOToView(response.data),
  });
}

/**
 * Loads highlights for an NFT collection audience.
 *
 * Endpoint: `GET /nft-collection-highlights?nft_collection_id=:id`.
 */
export function useGetNftCollectionHighlights(id: number): UseQueryResult<NftCollectionHighlightsView, Error> {
  return useQuery<APIResponse<readonly NftCollectionHighlightsDTO[]>, Error, NftCollectionHighlightsView>({
    queryKey: ["nft-collections", "by-id", id, "highlights"],
    queryFn: () =>
      baseQuery<readonly NftCollectionHighlightsDTO[]>("/nft-collection-highlights", {
        method: "GET",
        params: { nft_collection_id: id },
      }),
    select: (response) => {
      const highlights = response.data[0];

      if (!highlights) {
        throw new Error(`Highlights were not found for NFT collection ${id}.`);
      }

      return NftCollectionHighlightsDTOToView(highlights);
    },
  });
}

/**
 * Loads wallets for an NFT collection audience.
 *
 * Endpoint: `GET /nft-collection-wallets?nft_collection_id=:id`.
 */
export function useGetNftCollectionWallets(id: number): UseQueryResult<readonly NftCollectionWalletView[], Error> {
  return useQuery<APIResponse<readonly NftCollectionWalletDTO[]>, Error, readonly NftCollectionWalletView[]>({
    queryKey: ["nft-collections", "by-id", id, "wallets"],
    queryFn: () =>
      baseQuery<readonly NftCollectionWalletDTO[]>("/nft-collection-wallets", {
        method: "GET",
        params: { nft_collection_id: id },
      }),
    select: (response) => response.data.map(NftCollectionWalletDTOToView),
  });
}

/**
 * Loads analytics for an NFT collection audience.
 *
 * Endpoint: `GET /nft-collection-insights?nft_collection_id=:id`.
 */
export function useGetNftCollectionInsights(id: number): UseQueryResult<NftCollectionInsightsView, Error> {
  return useQuery<APIResponse<readonly NftCollectionInsightsDTO[]>, Error, NftCollectionInsightsView>({
    queryKey: ["nft-collections", "by-id", id, "insights"],
    queryFn: () =>
      baseQuery<readonly NftCollectionInsightsDTO[]>("/nft-collection-insights", {
        method: "GET",
        params: { nft_collection_id: id },
      }),
    select: (response) => {
      const insights = response.data[0];

      if (!insights) {
        throw new Error(`Insights were not found for NFT collection ${id}.`);
      }

      return NftCollectionInsightsDTOToView(insights);
    },
  });
}
