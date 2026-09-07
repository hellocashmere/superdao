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
 * Loads a wallet by its numeric ID for server-side consumers.
 *
 * Endpoint: `GET /wallets/:id`.
 */
export async function getWalletByID(id: number): Promise<WalletPreviewView> {
  const response = await baseQuery<WalletDTO>(`/wallets/${id}`, {
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
 * Loads a wallet by its displayed name, address, or domain.
 *
 * Endpoint: `GET /wallets`.
 */
export function useGetWalletByName(name: string): UseQueryResult<WalletPreviewView, Error> {
  const normalizedName = name.trim().toLowerCase();

  return useQuery<APIResponse<readonly WalletDTO[]>, Error, WalletPreviewView>({
    queryKey: ["wallets", "by-name", normalizedName],
    queryFn: () => {
      return baseQuery<readonly WalletDTO[]>("/wallets", {
        method: "GET",
      });
    },
    select: (response) => {
      const wallet = response.data.find((item) => item.name.toLowerCase() === normalizedName);

      if (!wallet) throw new Error(`Wallet was not found for name ${normalizedName}.`);
      return WalletDTOToPreviewView(wallet);
    },
    enabled: normalizedName.length > 0,
  });
}

/**
 * Loads the wallet identity and overview displayed in the page header.
 *
 * Endpoints: `GET /wallets/:id`, `GET /wallet-overviews?id=:id`.
 */
export function useGetWalletHeader(id: number): UseQueryResult<WalletDetailsHeaderView, Error> {
  return useQuery<APIResponse<WalletDetailsHeaderView>, Error, WalletDetailsHeaderView>({
    queryKey: ["wallets", "by-id", id, "header"],
    queryFn: async () => {
      const [walletResponse, overviewResponse] = await Promise.all([
        baseQuery<WalletDTO>(`/wallets/${id}`, { method: "GET" }),
        baseQuery<WalletOverviewDTO[]>("/wallet-overviews", { method: "GET", params: { wallet_id: id } }),
      ]);
      const overview = overviewResponse.data[0];

      if (!overview) {
        throw new Error(`Wallet overview was not found for wallet ${id}.`);
      }

      return {
        data: WalletOverviewDTOToView(overview, WalletDTOToPreviewView(walletResponse.data)),
      };
    },
    select: (response: APIResponse<WalletDetailsHeaderView>): WalletDetailsHeaderView => {
      return response.data;
    },
  });
}

/**
 * Loads wallet contact methods.
 *
 * Endpoint: `GET /wallet-contacts?wallet_id=:id`.
 */
export function useGetWalletContacts(id: number): UseQueryResult<readonly WalletContactView[], Error> {
  return useQuery<APIResponse<readonly WalletContactDTO[]>, Error, readonly WalletContactView[]>({
    queryKey: ["wallets", "by-id", id, "contacts"],
    queryFn: () => {
      return baseQuery<readonly WalletContactDTO[]>("/wallet-contacts", {
        method: "GET",
        params: { wallet_id: id },
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
 * Endpoint: `GET /wallet-labels?wallet_id=:id`.
 */
export function useGetWalletLabels(id: number): UseQueryResult<readonly WalletLabelView[], Error> {
  return useQuery<APIResponse<readonly WalletLabelDTO[]>, Error, readonly WalletLabelView[]>({
    queryKey: ["wallets", "by-id", id, "labels"],
    queryFn: () => {
      return baseQuery<readonly WalletLabelDTO[]>("/wallet-labels", {
        method: "GET",
        params: { wallet_id: id },
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
 * Endpoint: `GET /wallet-activities?wallet_id=:id`.
 */
export function useGetWalletActivity(id: number): UseQueryResult<readonly WalletActivityCollectionView[], Error> {
  return useQuery<APIResponse<readonly WalletActivityCollectionDTO[]>, Error, readonly WalletActivityCollectionView[]>({
    queryKey: ["wallets", "by-id", id, "activity"],
    queryFn: () => {
      return baseQuery<readonly WalletActivityCollectionDTO[]>("/wallet-activities", {
        method: "GET",
        params: { wallet_id: id },
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
 * Endpoint: `GET /wallet-similar-wallets?wallet_id=:id`.
 */
export function useGetSimilarWallets(id: number): UseQueryResult<readonly WalletSimilarWalletView[], Error> {
  return useQuery<APIResponse<readonly WalletSimilarWalletDTO[]>, Error, readonly WalletSimilarWalletView[]>({
    queryKey: ["wallets", "by-id", id, "similar"],
    queryFn: () => {
      return baseQuery<readonly WalletSimilarWalletDTO[]>("/wallet-similar-wallets", {
        method: "GET",
        params: { wallet_id: id },
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
 * Endpoint: `GET /wallet-transaction-summaries?id=:id`.
 */
export function useGetWalletTransactions(id: number): UseQueryResult<WalletTransactionsView, Error> {
  return useQuery<APIResponse<WalletTransactionsDTO[]>, Error, WalletTransactionsView>({
    queryKey: ["wallets", "by-id", id, "transactions"],
    queryFn: () => {
      return baseQuery<WalletTransactionsDTO[]>("/wallet-transaction-summaries", {
        method: "GET",
        params: { wallet_id: id },
      });
    },
    select: (response) => {
      const transactions = response.data[0];

      if (!transactions) {
        throw new Error(`Wallet transactions were not found for wallet ${id}.`);
      }

      return WalletTransactionsDTOToView(transactions);
    },
  });
}
