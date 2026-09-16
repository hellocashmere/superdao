import type { UseInfiniteQueryResult, UseQueryResult } from "@tanstack/react-query";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

import type { APIResponse, InfiniteView } from "@/shared/api";
import { baseListQuery, baseQuery } from "@/shared/api/tanstack";

import {
	WalletActivityCollectionDTOToView,
	WalletContactDTOToView,
	WalletDetailsDTOToView,
	WalletDTOToPreviewView,
	WalletDTOToRankedView,
	WalletLabelDTOToView,
	WalletSimilarWalletDTOToView,
	WalletTransactionsDTOToView,
} from "../lib/to-map";
import type {
	RankedWalletView,
	WalletActivityCollectionView,
	WalletContactView,
	WalletDetailsHeaderView,
	WalletFilter,
	WalletLabelView,
	WalletPreviewView,
	WalletSimilarWalletView,
	WalletTransactionsView,
} from "../model/types/types";

import type {
	WalletActivityCollectionDTO,
	WalletContactDTO,
	WalletDetailsDTO,
	WalletDTO,
	WalletLabelDTO,
	WalletSimilarWalletDTO,
	WalletTransactionsDTO,
} from "./types/types";

/**
 * Loads recently active wallets for the carousel.
 *
 * Endpoint: `GET /wallets?sort=recent&limit=:limit&offset=:offset`.
 */
export function useGetRecentWallets({
	limit,
}: {
	limit: number;
}): UseInfiniteQueryResult<InfiniteView<WalletPreviewView>, Error> {
	return useInfiniteQuery<
		APIResponse<readonly WalletDTO[]>,
		Error,
		InfiniteView<WalletPreviewView>,
		readonly unknown[],
		number
	>({
		queryKey: ["wallets", "recent", limit],
		initialPageParam: 0,
		queryFn: ({ pageParam }) => {
			return baseQuery<readonly WalletDTO[]>("/wallets", {
				method: "GET",
				params: {
					limit,
					offset: pageParam,
					sort: "recent",
				},
			});
		},
		getNextPageParam: (lastPage) => {
			return lastPage.metadata?.next_offset ?? undefined;
		},
		select: (data) => {
			return {
				hasMore: data.pages.at(-1)?.metadata?.next_offset != null,
				items: data.pages.flatMap((page) => {
					return page.data.map(WalletDTOToPreviewView);
				}),
			};
		},
	});
}

/**
 * Loads the wallet leaderboard for the selected metric.
 *
 * Endpoint: `GET /wallets?sort=:filter&limit=:limit&offset=:offset`.
 */
export function useGetWalletsByFilter({
	filter,
	limit,
}: {
	filter: WalletFilter;
	limit: number;
}): UseInfiniteQueryResult<InfiniteView<RankedWalletView>, Error> {
	return useInfiniteQuery<
		APIResponse<readonly WalletDTO[]>,
		Error,
		InfiniteView<RankedWalletView>,
		readonly unknown[],
		number
	>({
		queryKey: ["wallets", "leaderboard", filter, limit],
		initialPageParam: 0,
		queryFn: ({ pageParam }) => {
			return baseQuery<readonly WalletDTO[]>("/wallets", {
				method: "GET",
				params: {
					limit,
					offset: pageParam,
					sort: filter,
				},
			});
		},
		getNextPageParam: (lastPage) => {
			return lastPage.metadata?.next_offset ?? undefined;
		},
		select: (data) => {
			return {
				hasMore: data.pages.at(-1)?.metadata?.next_offset != null,
				items: data.pages.flatMap((page) => {
					return page.data.map((wallet) => {
						return WalletDTOToRankedView(wallet, filter);
					});
				}),
			};
		},
	});
}

/**
 * Loads a wallet by its displayed name, address, or domain.
 *
 * Endpoint: `GET /wallets`.
 */
export function useGetWalletByName(name: string): UseQueryResult<WalletPreviewView | undefined, Error> {
	const n = name.trim().toLowerCase();

	return useQuery<APIResponse<readonly WalletDTO[]>, Error, WalletPreviewView | undefined>({
		queryKey: ["wallets", "by-name", n],
		queryFn: () => {
			return baseListQuery<WalletDTO>("/wallets", {
				method: "GET",
				params: {
					q: n,
				},
			});
		},
		select: (response) => {
			const wallet = response.data.find((item) => item.title.toLowerCase() === n);

			return wallet ? WalletDTOToPreviewView(wallet) : undefined;
		},
		enabled: n.length > 0,
	});
}

/**
 * Loads the wallet identity and overview displayed in the page header.
 *
 * Endpoint: `GET /wallets/:id`.
 */
export function useGetWalletHeader(id: number): UseQueryResult<WalletDetailsHeaderView, Error> {
	return useQuery<APIResponse<WalletDetailsDTO>, Error, WalletDetailsHeaderView>({
		queryKey: ["wallets", "by-id", id, "header"],
		queryFn: () => {
			return baseQuery<WalletDetailsDTO>(`/wallets/${id}`, {
				method: "GET",
			});
		},
		select: (response) => {
			return WalletDetailsDTOToView(response.data);
		},
	});
}

/**
 * Loads wallet contact methods.
 *
 * Endpoint: `GET /wallets/:id/contacts`.
 */
export function useGetWalletContacts(id: number): UseQueryResult<readonly WalletContactView[], Error> {
	return useQuery<APIResponse<readonly WalletContactDTO[]>, Error, readonly WalletContactView[]>({
		queryKey: ["wallets", "by-id", id, "contacts"],
		queryFn: () => {
			return baseQuery<readonly WalletContactDTO[]>(`/wallets/${id}/contacts`, {
				method: "GET",
			});
		},
		select: (response) => {
			return response.data.map(WalletContactDTOToView);
		},
	});
}

/**
 * Loads classification labels assigned to a wallet.
 *
 * Endpoint: `GET /wallets/:id/labels`.
 */
export function useGetWalletLabels(id: number): UseQueryResult<readonly WalletLabelView[], Error> {
	return useQuery<APIResponse<readonly WalletLabelDTO[]>, Error, readonly WalletLabelView[]>({
		queryKey: ["wallets", "by-id", id, "labels"],
		queryFn: () => {
			return baseQuery<readonly WalletLabelDTO[]>(`/wallets/${id}/labels`, {
				method: "GET",
			});
		},
		select: (response) => {
			return response.data.map(WalletLabelDTOToView);
		},
	});
}

/**
 * Loads collections found in wallet activity.
 *
 * Endpoint: `GET /wallets/:id/activity`.
 */
export function useGetWalletActivity(id: number): UseQueryResult<readonly WalletActivityCollectionView[], Error> {
	return useQuery<APIResponse<readonly WalletActivityCollectionDTO[]>, Error, readonly WalletActivityCollectionView[]>({
		queryKey: ["wallets", "by-id", id, "activity"],
		queryFn: () => {
			return baseQuery<readonly WalletActivityCollectionDTO[]>(`/wallets/${id}/activity`, {
				method: "GET",
			});
		},
		select: (response) => {
			return response.data.map(WalletActivityCollectionDTOToView);
		},
	});
}

/**
 * Loads wallets similar to the selected wallet.
 *
 * Endpoint: `GET /wallets/:id/similar-wallets`.
 */
export function useGetSimilarWallets(id: number): UseQueryResult<readonly WalletSimilarWalletView[], Error> {
	return useQuery<APIResponse<readonly WalletSimilarWalletDTO[]>, Error, readonly WalletSimilarWalletView[]>({
		queryKey: ["wallets", "by-id", id, "similar"],
		queryFn: () => {
			return baseQuery<readonly WalletSimilarWalletDTO[]>(`/wallets/${id}/similar-wallets`, {
				method: "GET",
			});
		},
		select: (response) => {
			return response.data.map(WalletSimilarWalletDTOToView);
		},
	});
}

/**
 * Loads a wallet transaction summary and recent transactions.
 *
 * Endpoint: `GET /wallets/:id/transaction-summary`.
 */
export function useGetWalletTransactions(id: number): UseQueryResult<WalletTransactionsView, Error> {
	return useQuery<APIResponse<WalletTransactionsDTO>, Error, WalletTransactionsView>({
		queryKey: ["wallets", "by-id", id, "transactions"],
		queryFn: () => {
			return baseQuery<WalletTransactionsDTO>(`/wallets/${id}/transaction-summary`, {
				method: "GET",
			});
		},
		select: (response) => {
			return WalletTransactionsDTOToView(response.data);
		},
	});
}
