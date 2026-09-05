import type { UseQueryResult } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";

import type { APIResponse } from "@/shared/api";
import { baseQuery } from "@/shared/api/tanstack";

import {
  LabelDTOToDetailsView,
  LabelDTOToPreviewView,
  LabelHighlightsDTOToView,
  LabelInsightsDTOToView,
  LabelWalletDTOToView,
} from "../lib/to-map";
import type {
  LabelDetailsView,
  LabelHighlightsView,
  LabelInsightsView,
  LabelPreviewView,
  LabelWallet,
} from "../model/types/types";

import type { LabelDTO, LabelHighlightsDTO, LabelInsightsDTO, LabelWalletDTO } from "./types/types";

/**
 * Loads a label by its identifier for server-side consumers.
 *
 * Endpoint: `GET /labels/:id`.
 */
export async function getLabelDetails(id: string): Promise<LabelDetailsView> {
  const normalizedID = id.trim().toLowerCase();
  const response = await baseQuery<LabelDTO>(`/labels/${encodeURIComponent(normalizedID)}`, { method: "GET" });

  return LabelDTOToDetailsView(response.data);
}

/**
 * Loads labels for the discovery directory.
 *
 * Endpoint: `GET /labels`.
 */
export function useGetLabels(): UseQueryResult<readonly LabelPreviewView[], Error> {
  return useQuery<APIResponse<readonly LabelDTO[]>, Error, readonly LabelPreviewView[]>({
    queryKey: ["labels"],
    queryFn: () => baseQuery<readonly LabelDTO[]>("/labels", { method: "GET" }),
    select: (response) => response.data.map(LabelDTOToPreviewView),
  });
}

/**
 * Loads a label by its identifier.
 *
 * Endpoint: `GET /labels/:id`.
 */
export function useGetLabelDetails(id: string): UseQueryResult<LabelDetailsView, Error> {
  const normalizedID = id.trim().toLowerCase();

  return useQuery<APIResponse<LabelDTO>, Error, LabelDetailsView>({
    queryKey: ["labels", normalizedID],
    queryFn: () => baseQuery<LabelDTO>(`/labels/${encodeURIComponent(normalizedID)}`, { method: "GET" }),
    select: (response) => LabelDTOToDetailsView(response.data),
    enabled: normalizedID.length > 0,
  });
}

/**
 * Loads summary metrics and a balance distribution for a label.
 *
 * Endpoint: `GET /label-highlights?label_id=:id`.
 */
export function useGetLabelHighlights(id: string): UseQueryResult<LabelHighlightsView, Error> {
  const normalizedID = id.trim().toLowerCase();

  return useQuery<APIResponse<readonly LabelHighlightsDTO[]>, Error, LabelHighlightsView>({
    queryKey: ["labels", normalizedID, "highlights"],
    queryFn: () =>
      baseQuery<readonly LabelHighlightsDTO[]>("/label-highlights", {
        method: "GET",
        params: { label_id: normalizedID },
      }),
    select: (response) => {
      const highlights = response.data[0];

      if (!highlights) {
        throw new Error(`Label highlights were not found for label ${normalizedID}.`);
      }

      return LabelHighlightsDTOToView(highlights);
    },
    enabled: normalizedID.length > 0,
  });
}

/**
 * Loads wallets associated with a label.
 *
 * Endpoint: `GET /label-wallets?label_id=:id`.
 */
export function useGetLabelWallets(id: string): UseQueryResult<readonly LabelWallet[], Error> {
  const normalizedID = id.trim().toLowerCase();

  return useQuery<APIResponse<readonly LabelWalletDTO[]>, Error, readonly LabelWallet[]>({
    queryKey: ["labels", normalizedID, "wallets"],
    queryFn: () =>
      baseQuery<readonly LabelWalletDTO[]>("/label-wallets", {
        method: "GET",
        params: { label_id: normalizedID },
      }),
    select: (response) => response.data.map(LabelWalletDTOToView),
    enabled: normalizedID.length > 0,
  });
}

/**
 * Loads analytics displayed in the label Insights tab.
 *
 * Endpoint: `GET /label-insights?label_id=:id`.
 */
export function useGetLabelInsights(id: string): UseQueryResult<LabelInsightsView, Error> {
  const normalizedID = id.trim().toLowerCase();

  return useQuery<APIResponse<readonly LabelInsightsDTO[]>, Error, LabelInsightsView>({
    queryKey: ["labels", normalizedID, "insights"],
    queryFn: () =>
      baseQuery<readonly LabelInsightsDTO[]>("/label-insights", {
        method: "GET",
        params: { label_id: normalizedID },
      }),
    select: (response) => {
      const insights = response.data[0];

      if (!insights) {
        throw new Error(`Label insights were not found for label ${normalizedID}.`);
      }

      return LabelInsightsDTOToView(insights);
    },
    enabled: normalizedID.length > 0,
  });
}
