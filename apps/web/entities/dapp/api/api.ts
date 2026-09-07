import type { UseQueryResult } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";

import type { APIResponse } from "@/shared/api";
import { baseQuery } from "@/shared/api/tanstack";

import { DappDTOToView, DappHighlightsDTOToView, DappInsightsDTOToView, DappWalletDTOToView } from "../lib/to-map";
import type { DappHighlightsView, DappInsightsView, DappView, DappWalletView } from "../model/types/types";

import type { DappDTO, DappHighlightsDTO, DappInsightsDTO, DappWalletDTO } from "./types/types";

/**
 * Loads one dapp for server-side consumers.
 *
 * Endpoint: `GET /dapps/:id`.
 */
export async function getDapp(id: number): Promise<DappView> {
  const response = await baseQuery<DappDTO>(`/dapps/${id}`, {
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
 * Loads one dapp by its backend-provided ID.
 *
 * Endpoint: `GET /dapps/:id`.
 */
export function useGetDapp(id: number): UseQueryResult<DappView, Error> {
  return useQuery<APIResponse<DappDTO>, Error, DappView>({
    queryKey: ["dapps", "by-id", id],
    queryFn: () => baseQuery<DappDTO>(`/dapps/${id}`, { method: "GET" }),
    select: (response) => DappDTOToView(response.data),
  });
}

/**
 * Loads highlights for a dapp audience.
 *
 * Endpoint: `GET /dapp-highlights?dapp_id=:id`.
 */
export function useGetDappHighlights(id: number): UseQueryResult<DappHighlightsView, Error> {
  return useQuery<APIResponse<readonly DappHighlightsDTO[]>, Error, DappHighlightsView>({
    queryKey: ["dapps", "by-id", id, "highlights"],
    queryFn: () =>
      baseQuery<readonly DappHighlightsDTO[]>("/dapp-highlights", {
        method: "GET",
        params: { dapp_id: id },
      }),
    select: (response) => {
      const highlights = response.data[0];

      if (!highlights) {
        throw new Error(`Highlights were not found for dapp ${id}.`);
      }

      return DappHighlightsDTOToView(highlights);
    },
  });
}

/**
 * Loads wallets for a dapp audience.
 *
 * Endpoint: `GET /dapp-wallets?dapp_id=:id`.
 */
export function useGetDappWallets(id: number): UseQueryResult<readonly DappWalletView[], Error> {
  return useQuery<APIResponse<readonly DappWalletDTO[]>, Error, readonly DappWalletView[]>({
    queryKey: ["dapps", "by-id", id, "wallets"],
    queryFn: () =>
      baseQuery<readonly DappWalletDTO[]>("/dapp-wallets", {
        method: "GET",
        params: { dapp_id: id },
      }),
    select: (response) => response.data.map(DappWalletDTOToView),
  });
}

/**
 * Loads analytics for a dapp audience.
 *
 * Endpoint: `GET /dapp-insights?dapp_id=:id`.
 */
export function useGetDappInsights(id: number): UseQueryResult<DappInsightsView, Error> {
  return useQuery<APIResponse<readonly DappInsightsDTO[]>, Error, DappInsightsView>({
    queryKey: ["dapps", "by-id", id, "insights"],
    queryFn: () =>
      baseQuery<readonly DappInsightsDTO[]>("/dapp-insights", {
        method: "GET",
        params: { dapp_id: id },
      }),
    select: (response) => {
      const insights = response.data[0];

      if (!insights) {
        throw new Error(`Insights were not found for dapp ${id}.`);
      }

      return DappInsightsDTOToView(insights);
    },
  });
}
