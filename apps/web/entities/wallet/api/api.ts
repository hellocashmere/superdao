import type { UseInfiniteQueryResult, UseQueryResult } from "@tanstack/react-query";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

import type { APIResponse, InfiniteView, PaginatedDTO } from "@/shared/api";
import { baseQuery } from "@/shared/api/tanstack";

import {
  WalletActivityCollectionDTOToView,
  WalletContactDTOToView,
  WalletDTOToPreviewView,
  WalletDTOToRankedView,
  WalletLabelDTOToView,
  WalletOverviewDTOToView,
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
  WalletDTO,
  WalletLabelDTO,
  WalletOverviewDTO,
  WalletSimilarWalletDTO,
  WalletTransactionsDTO,
} from "./types/types";

/**
 * Loads a wallet by its identifier for server-side consumers.
 *
 * Endpoint: `GET /wallets/:id`.
 */
export async function getWalletByID(id: string): Promise<WalletPreviewView> {
  const normalizedID = id.trim().toLowerCase();
  const response = await baseQuery<WalletDTO>(`/wallets/${encodeURIComponent(normalizedID)}`, {
    method: "GET",
  });

  return WalletDTOToPreviewView(response.data);
}

/**
 * Loads recently active wallets for the carousel.
 *
 * Endpoint: `GET /wallets?_sort=recent_order`.
 */
export function useGetRecentWallets({
  limit,
}: {
  limit: number;
}): UseInfiniteQueryResult<InfiniteView<WalletPreviewView>, Error> {
  return useInfiniteQuery<
    APIResponse<PaginatedDTO<WalletDTO>>,
    Error,
    InfiniteView<WalletPreviewView>,
    readonly unknown[],
    number
  >({
    queryKey: ["wallets", "recent", limit],
    initialPageParam: 1,
    queryFn: ({ pageParam }) => {
      return baseQuery<PaginatedDTO<WalletDTO>>("/wallets", {
        method: "GET",
        params: {
          _page: pageParam,
          _per_page: limit,
          _sort: "recent_order",
        },
      });
    },
    getNextPageParam: (lastPage) => {
      return lastPage.data.next ?? undefined;
    },
    select: (data) => {
      return {
        hasMore: data.pages.at(-1)?.data.next !== null,
        items: data.pages.flatMap((page) => {
          return page.data.data.map(WalletDTOToPreviewView);
        }),
      };
    },
  });
}

/**
 * Loads the wallet leaderboard for the selected metric.
 *
 * Endpoint: `GET /wallets?_sort=:order`.
 */
export function useGetWalletsByFilter({
  filter,
  limit,
}: {
  filter: WalletFilter;
  limit: number;
}): UseInfiniteQueryResult<InfiniteView<RankedWalletView>, Error> {
  return useInfiniteQuery<
    APIResponse<PaginatedDTO<WalletDTO>>,
    Error,
    InfiniteView<RankedWalletView>,
    readonly unknown[],
    number
  >({
    queryKey: ["wallets", "leaderboard", filter, limit],
    initialPageParam: 1,
    queryFn: ({ pageParam }) => {
      return baseQuery<PaginatedDTO<WalletDTO>>("/wallets", {
        method: "GET",
        params: {
          _page: pageParam,
          _per_page: limit,
          _sort: `${filter}_order`,
        },
      });
    },
    getNextPageParam: (lastPage) => {
      return lastPage.data.next ?? undefined;
    },
    select: (data) => {
      return {
        hasMore: data.pages.at(-1)?.data.next !== null,
        items: data.pages.flatMap((page) => {
          return page.data.data.map((wallet) => {
            return WalletDTOToRankedView(wallet, filter);
          });
        }),
      };
    },
  });
}

/**
 * Loads a wallet by its identifier.
 *
 * Endpoint: `GET /wallets/:id`.
 */
export function useGetWalletByID(id: string): UseQueryResult<WalletPreviewView, Error> {
  const normalizedID = id.trim().toLowerCase();

  return useQuery<APIResponse<WalletDTO>, Error, WalletPreviewView>({
    queryKey: ["wallets", normalizedID],
    queryFn: () => {
      return baseQuery<WalletDTO>(`/wallets/${encodeURIComponent(normalizedID)}`, {
        method: "GET",
      });
    },
    select: (response) => {
      return WalletDTOToPreviewView(response.data);
    },
    enabled: normalizedID.length > 0,
  });
}

/**
 * Loads the wallet identity and overview displayed in the page header.
 *
 * Endpoints: `GET /wallets/:id`, `GET /wallet-overviews?id=:id`.
 */
export function useGetWalletHeader(id: string): UseQueryResult<WalletDetailsHeaderView, Error> {
  const normalizedID = id.trim().toLowerCase();

  return useQuery<APIResponse<WalletDetailsHeaderView>, Error, WalletDetailsHeaderView>({
    queryKey: ["wallets", normalizedID, "header"],
    queryFn: async () => {
      const [walletResponse, overviewResponse] = await Promise.all([
        baseQuery<WalletDTO>(`/wallets/${encodeURIComponent(normalizedID)}`, { method: "GET" }),
        baseQuery<WalletOverviewDTO[]>("/wallet-overviews", { method: "GET", params: { id: normalizedID } }),
      ]);
      const overview = overviewResponse.data[0];

      if (!overview) {
        throw new Error(`Wallet overview was not found for wallet ${normalizedID}.`);
      }

      return {
        data: WalletOverviewDTOToView(overview, WalletDTOToPreviewView(walletResponse.data)),
      };
    },
    select: (response: APIResponse<WalletDetailsHeaderView>): WalletDetailsHeaderView => {
      return response.data;
    },
    enabled: normalizedID.length > 0,
  });
}

/**
 * Loads wallet contact methods.
 *
 * Endpoint: `GET /wallet-contacts?wallet_id=:id`.
 */
export function useGetWalletContacts(id: string): UseQueryResult<readonly WalletContactView[], Error> {
  const normalizedID = id.trim().toLowerCase();

  return useQuery<APIResponse<readonly WalletContactDTO[]>, Error, readonly WalletContactView[]>({
    queryKey: ["wallets", normalizedID, "contacts"],
    queryFn: () => {
      return baseQuery<readonly WalletContactDTO[]>("/wallet-contacts", {
        method: "GET",
        params: { wallet_id: normalizedID },
      });
    },
    select: (response) => {
      return response.data.map(WalletContactDTOToView);
    },
    enabled: normalizedID.length > 0,
  });
}

/**
 * Loads classification labels assigned to a wallet.
 *
 * Endpoint: `GET /wallet-labels?wallet_id=:id`.
 */
export function useGetWalletLabels(id: string): UseQueryResult<readonly WalletLabelView[], Error> {
  const normalizedID = id.trim().toLowerCase();

  return useQuery<APIResponse<readonly WalletLabelDTO[]>, Error, readonly WalletLabelView[]>({
    queryKey: ["wallets", normalizedID, "labels"],
    queryFn: () => {
      return baseQuery<readonly WalletLabelDTO[]>("/wallet-labels", {
        method: "GET",
        params: { wallet_id: normalizedID },
      });
    },
    select: (response) => {
      return response.data.map(WalletLabelDTOToView);
    },
    enabled: normalizedID.length > 0,
  });
}

/**
 * Loads collections found in wallet activity.
 *
 * Endpoint: `GET /wallet-activities?wallet_id=:id`.
 */
export function useGetWalletActivity(id: string): UseQueryResult<readonly WalletActivityCollectionView[], Error> {
  const normalizedID = id.trim().toLowerCase();

  return useQuery<APIResponse<readonly WalletActivityCollectionDTO[]>, Error, readonly WalletActivityCollectionView[]>({
    queryKey: ["wallets", normalizedID, "activity"],
    queryFn: () => {
      return baseQuery<readonly WalletActivityCollectionDTO[]>("/wallet-activities", {
        method: "GET",
        params: { wallet_id: normalizedID },
      });
    },
    select: (response) => {
      return response.data.map(WalletActivityCollectionDTOToView);
    },
    enabled: normalizedID.length > 0,
  });
}

/**
 * Loads wallets similar to the selected wallet.
 *
 * Endpoint: `GET /wallet-similar-wallets?wallet_id=:id`.
 */
export function useGetSimilarWallets(id: string): UseQueryResult<readonly WalletSimilarWalletView[], Error> {
  const normalizedID = id.trim().toLowerCase();

  return useQuery<APIResponse<readonly WalletSimilarWalletDTO[]>, Error, readonly WalletSimilarWalletView[]>({
    queryKey: ["wallets", normalizedID, "similar"],
    queryFn: () => {
      return baseQuery<readonly WalletSimilarWalletDTO[]>("/wallet-similar-wallets", {
        method: "GET",
        params: { wallet_id: normalizedID },
      });
    },
    select: (response) => {
      return response.data.map(WalletSimilarWalletDTOToView);
    },
    enabled: normalizedID.length > 0,
  });
}

/**
 * Loads a wallet transaction summary and recent transactions.
 *
 * Endpoint: `GET /wallet-transaction-summaries?id=:id`.
 */
export function useGetWalletTransactions(id: string): UseQueryResult<WalletTransactionsView, Error> {
  const normalizedID = id.trim().toLowerCase();

  return useQuery<APIResponse<WalletTransactionsDTO[]>, Error, WalletTransactionsView>({
    queryKey: ["wallets", normalizedID, "transactions"],
    queryFn: () => {
      return baseQuery<WalletTransactionsDTO[]>("/wallet-transaction-summaries", {
        method: "GET",
        params: { id: normalizedID },
      });
    },
    select: (response) => {
      const transactions = response.data[0];

      if (!transactions) {
        throw new Error(`Wallet transactions were not found for wallet ${normalizedID}.`);
      }

      return WalletTransactionsDTOToView(transactions);
    },
    enabled: normalizedID.length > 0,
  });
}
