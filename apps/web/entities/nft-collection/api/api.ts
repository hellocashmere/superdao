import type { UseQueryResult } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";

import type { APIResponse } from "@/shared/api";
import type { QueryOptions } from "@/shared/api/tanstack";
import { baseListQuery, baseQuery } from "@/shared/api/tanstack";

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
 * Loads NFT collections for the Explore directory.
 *
 * Endpoint: `GET /nft-collections`.
 */
export function useGetNftCollections(): UseQueryResult<readonly NftCollectionView[], Error> {
	return useQuery<APIResponse<readonly NftCollectionDTO[]>, Error, readonly NftCollectionView[]>({
		queryKey: ["nft-collections"],
		queryFn: () => {
			return baseListQuery<NftCollectionDTO>("/nft-collections", {
				method: "GET",
			});
		},
		select: (response) => {
			return response.data.map(NftCollectionDTOToView);
		},
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
		queryFn: () => {
			return baseQuery<NftCollectionDTO>(`/nft-collections/${id}`, {
				method: "GET",
			});
		},
		select: (response) => {
			return NftCollectionDTOToView(response.data);
		},
	});
}

/**
 * Loads highlights for an NFT collection audience.
 *
 * Endpoint: `GET /nft-collections/:id/highlights`.
 */
export function useGetNftCollectionHighlights(
	id: number,
	options?: QueryOptions
): UseQueryResult<NftCollectionHighlightsView, Error> {
	return useQuery<APIResponse<NftCollectionHighlightsDTO>, Error, NftCollectionHighlightsView>({
		enabled: options?.enabled,
		queryKey: ["nft-collections", "by-id", id, "highlights"],
		queryFn: () => {
			return baseQuery<NftCollectionHighlightsDTO>(`/nft-collections/${id}/highlights`, {
				method: "GET",
			});
		},
		select: (response) => {
			return NftCollectionHighlightsDTOToView(response.data);
		},
	});
}

/**
 * Loads wallets for an NFT collection audience.
 *
 * Endpoint: `GET /nft-collections/:id/wallets`.
 */
export function useGetNftCollectionWallets(
	id: number,
	options?: QueryOptions
): UseQueryResult<readonly NftCollectionWalletView[], Error> {
	return useQuery<APIResponse<readonly NftCollectionWalletDTO[]>, Error, readonly NftCollectionWalletView[]>({
		enabled: options?.enabled,
		queryKey: ["nft-collections", "by-id", id, "wallets"],
		queryFn: () => {
			return baseListQuery<NftCollectionWalletDTO>(`/nft-collections/${id}/wallets`, {
				method: "GET",
			});
		},
		select: (response) => {
			return response.data.map(NftCollectionWalletDTOToView);
		},
	});
}

/**
 * Loads analytics for an NFT collection audience.
 *
 * Endpoint: `GET /nft-collections/:id/insights`.
 */
export function useGetNftCollectionInsights(
	id: number,
	options?: QueryOptions
): UseQueryResult<NftCollectionInsightsView, Error> {
	return useQuery<APIResponse<NftCollectionInsightsDTO>, Error, NftCollectionInsightsView>({
		enabled: options?.enabled,
		queryKey: ["nft-collections", "by-id", id, "insights"],
		queryFn: () => {
			return baseQuery<NftCollectionInsightsDTO>(`/nft-collections/${id}/insights`, {
				method: "GET",
			});
		},
		select: (response) => {
			return NftCollectionInsightsDTOToView(response.data);
		},
	});
}
