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
export async function getNftCollection(id: string): Promise<NftCollectionView> {
  const normalizedID = id.trim().toLowerCase();
  const response = await baseQuery<NftCollectionDTO>(`/nft-collections/${encodeURIComponent(normalizedID)}`, {
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
 * Loads one NFT collection by its identifier.
 *
 * Endpoint: `GET /nft-collections/:id`.
 */
export function useGetNftCollection(id: string): UseQueryResult<NftCollectionView, Error> {
  const normalizedID = id.trim().toLowerCase();

  return useQuery<APIResponse<NftCollectionDTO>, Error, NftCollectionView>({
    queryKey: ["nft-collections", normalizedID],
    queryFn: () => baseQuery<NftCollectionDTO>(`/nft-collections/${encodeURIComponent(normalizedID)}`, { method: "GET" }),
    select: (response) => NftCollectionDTOToView(response.data),
    enabled: normalizedID.length > 0,
  });
}

/**
 * Loads highlights for an NFT collection audience.
 *
 * Endpoint: `GET /nft-collection-highlights?nft_collection_id=:id`.
 */
export function useGetNftCollectionHighlights(id: string): UseQueryResult<NftCollectionHighlightsView, Error> {
  const normalizedID = id.trim().toLowerCase();

  return useQuery<APIResponse<readonly NftCollectionHighlightsDTO[]>, Error, NftCollectionHighlightsView>({
    queryKey: ["nft-collections", normalizedID, "highlights"],
    queryFn: () =>
      baseQuery<readonly NftCollectionHighlightsDTO[]>("/nft-collection-highlights", {
        method: "GET",
        params: { nft_collection_id: normalizedID },
      }),
    select: (response) => {
      const highlights = response.data[0];

      if (!highlights) {
        throw new Error(`Highlights were not found for NFT collection ${normalizedID}.`);
      }

      return NftCollectionHighlightsDTOToView(highlights);
    },
    enabled: normalizedID.length > 0,
  });
}

/**
 * Loads wallets for an NFT collection audience.
 *
 * Endpoint: `GET /nft-collection-wallets?nft_collection_id=:id`.
 */
export function useGetNftCollectionWallets(id: string): UseQueryResult<readonly NftCollectionWalletView[], Error> {
  const normalizedID = id.trim().toLowerCase();

  return useQuery<APIResponse<readonly NftCollectionWalletDTO[]>, Error, readonly NftCollectionWalletView[]>({
    queryKey: ["nft-collections", normalizedID, "wallets"],
    queryFn: () =>
      baseQuery<readonly NftCollectionWalletDTO[]>("/nft-collection-wallets", {
        method: "GET",
        params: { nft_collection_id: normalizedID },
      }),
    select: (response) => response.data.map(NftCollectionWalletDTOToView),
    enabled: normalizedID.length > 0,
  });
}

/**
 * Loads analytics for an NFT collection audience.
 *
 * Endpoint: `GET /nft-collection-insights?nft_collection_id=:id`.
 */
export function useGetNftCollectionInsights(id: string): UseQueryResult<NftCollectionInsightsView, Error> {
  const normalizedID = id.trim().toLowerCase();

  return useQuery<APIResponse<readonly NftCollectionInsightsDTO[]>, Error, NftCollectionInsightsView>({
    queryKey: ["nft-collections", normalizedID, "insights"],
    queryFn: () =>
      baseQuery<readonly NftCollectionInsightsDTO[]>("/nft-collection-insights", {
        method: "GET",
        params: { nft_collection_id: normalizedID },
      }),
    select: (response) => {
      const insights = response.data[0];

      if (!insights) {
        throw new Error(`Insights were not found for NFT collection ${normalizedID}.`);
      }

      return NftCollectionInsightsDTOToView(insights);
    },
    enabled: normalizedID.length > 0,
  });
}
