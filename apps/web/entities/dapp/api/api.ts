import type { UseQueryResult } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";

import type { APIResponse } from "@/shared/api";
import { baseQuery } from "@/shared/api/tanstack";

import {
  DappDTOToView,
  DappHighlightsDTOToView,
  DappInsightsDTOToView,
  DappWalletDTOToView,
} from "../lib/to-map";
import type {
  DappHighlightsView,
  DappInsightsView,
  DappView,
  DappWalletView,
} from "../model/types/types";

import type {
  DappDTO,
  DappHighlightsDTO,
  DappInsightsDTO,
  DappWalletDTO,
} from "./types/types";

/**
 * Loads one dapp for server-side consumers.
 *
 * Endpoint: `GET /dapps/:id`.
 */
export async function getDapp(id: string): Promise<DappView> {
  const normalizedID = id.trim().toLowerCase();
  const response = await baseQuery<DappDTO>(`/dapps/${encodeURIComponent(normalizedID)}`, {
    method: "GET",
  });

  return DappDTOToView(response.data);
}

/**
 * Loads dapps for the Explore directory.
 *
 * Endpoint: `GET /dapps`.
 */
export function useGetDapps(): UseQueryResult<readonly DappView[], Error> {
  return useQuery<APIResponse<readonly DappDTO[]>, Error, readonly DappView[]>({
    queryKey: ["dapps"],
    queryFn: () => baseQuery<readonly DappDTO[]>("/dapps", { method: "GET" }),
    select: (response) => response.data.map(DappDTOToView),
  });
}

/**
 * Loads one dapp by its identifier.
 *
 * Endpoint: `GET /dapps/:id`.
 */
export function useGetDapp(id: string): UseQueryResult<DappView, Error> {
  const normalizedID = id.trim().toLowerCase();

  return useQuery<APIResponse<DappDTO>, Error, DappView>({
    queryKey: ["dapps", normalizedID],
    queryFn: () => baseQuery<DappDTO>(`/dapps/${encodeURIComponent(normalizedID)}`, { method: "GET" }),
    select: (response) => DappDTOToView(response.data),
    enabled: normalizedID.length > 0,
  });
}

/**
 * Loads highlights for a dapp audience.
 *
 * Endpoint: `GET /dapp-highlights?dapp_id=:id`.
 */
export function useGetDappHighlights(id: string): UseQueryResult<DappHighlightsView, Error> {
  const normalizedID = id.trim().toLowerCase();

  return useQuery<APIResponse<readonly DappHighlightsDTO[]>, Error, DappHighlightsView>({
    queryKey: ["dapps", normalizedID, "highlights"],
    queryFn: () =>
      baseQuery<readonly DappHighlightsDTO[]>("/dapp-highlights", {
        method: "GET",
        params: { dapp_id: normalizedID },
      }),
    select: (response) => {
      const highlights = response.data[0];

      if (!highlights) {
        throw new Error(`Highlights were not found for dapp ${normalizedID}.`);
      }

      return DappHighlightsDTOToView(highlights);
    },
    enabled: normalizedID.length > 0,
  });
}

/**
 * Loads wallets for a dapp audience.
 *
 * Endpoint: `GET /dapp-wallets?dapp_id=:id`.
 */
export function useGetDappWallets(id: string): UseQueryResult<readonly DappWalletView[], Error> {
  const normalizedID = id.trim().toLowerCase();

  return useQuery<APIResponse<readonly DappWalletDTO[]>, Error, readonly DappWalletView[]>({
    queryKey: ["dapps", normalizedID, "wallets"],
    queryFn: () =>
      baseQuery<readonly DappWalletDTO[]>("/dapp-wallets", {
        method: "GET",
        params: { dapp_id: normalizedID },
      }),
    select: (response) => response.data.map(DappWalletDTOToView),
    enabled: normalizedID.length > 0,
  });
}

/**
 * Loads analytics for a dapp audience.
 *
 * Endpoint: `GET /dapp-insights?dapp_id=:id`.
 */
export function useGetDappInsights(id: string): UseQueryResult<DappInsightsView, Error> {
  const normalizedID = id.trim().toLowerCase();

  return useQuery<APIResponse<readonly DappInsightsDTO[]>, Error, DappInsightsView>({
    queryKey: ["dapps", normalizedID, "insights"],
    queryFn: () =>
      baseQuery<readonly DappInsightsDTO[]>("/dapp-insights", {
        method: "GET",
        params: { dapp_id: normalizedID },
      }),
    select: (response) => {
      const insights = response.data[0];

      if (!insights) {
        throw new Error(`Insights were not found for dapp ${normalizedID}.`);
      }

      return DappInsightsDTOToView(insights);
    },
    enabled: normalizedID.length > 0,
  });
}
