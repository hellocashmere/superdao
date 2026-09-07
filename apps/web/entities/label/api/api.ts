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
 * Loads a label by its backend-provided ID for server-side consumers.
 *
 * Endpoint: `GET /labels/:id`.
 */
export async function getLabelDetails(id: number): Promise<LabelDetailsView> {
  const response = await baseQuery<LabelDTO>(`/labels/${id}`, { method: "GET" });

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
 * Loads a label by its backend-provided ID.
 *
 * Endpoint: `GET /labels/:id`.
 */
export function useGetLabelDetails(id: number): UseQueryResult<LabelDetailsView, Error> {
  return useQuery<APIResponse<LabelDTO>, Error, LabelDetailsView>({
    queryKey: ["labels", "by-id", id],
    queryFn: () => baseQuery<LabelDTO>(`/labels/${id}`, { method: "GET" }),
    select: (response) => LabelDTOToDetailsView(response.data),
  });
}

/**
 * Loads summary metrics and a balance distribution for a label.
 *
 * Endpoint: `GET /label-highlights?label_id=:id`.
 */
export function useGetLabelHighlights(id: number): UseQueryResult<LabelHighlightsView, Error> {
  return useQuery<APIResponse<readonly LabelHighlightsDTO[]>, Error, LabelHighlightsView>({
    queryKey: ["labels", "by-id", id, "highlights"],
    queryFn: () =>
      baseQuery<readonly LabelHighlightsDTO[]>("/label-highlights", {
        method: "GET",
        params: { label_id: id },
      }),
    select: (response) => {
      const highlights = response.data[0];

      if (!highlights) {
        throw new Error(`Label highlights were not found for label ${id}.`);
      }

      return LabelHighlightsDTOToView(highlights);
    },
  });
}

/**
 * Loads wallets associated with a label.
 *
 * Endpoint: `GET /label-wallets?label_id=:id`.
 */
export function useGetLabelWallets(id: number): UseQueryResult<readonly LabelWallet[], Error> {
  return useQuery<APIResponse<readonly LabelWalletDTO[]>, Error, readonly LabelWallet[]>({
    queryKey: ["labels", "by-id", id, "wallets"],
    queryFn: () =>
      baseQuery<readonly LabelWalletDTO[]>("/label-wallets", {
        method: "GET",
        params: { label_id: id },
      }),
    select: (response) => response.data.map(LabelWalletDTOToView),
  });
}

/**
 * Loads analytics displayed in the label Insights tab.
 *
 * Endpoint: `GET /label-insights?label_id=:id`.
 */
export function useGetLabelInsights(id: number): UseQueryResult<LabelInsightsView, Error> {
  return useQuery<APIResponse<readonly LabelInsightsDTO[]>, Error, LabelInsightsView>({
    queryKey: ["labels", "by-id", id, "insights"],
    queryFn: () =>
      baseQuery<readonly LabelInsightsDTO[]>("/label-insights", {
        method: "GET",
        params: { label_id: id },
      }),
    select: (response) => {
      const insights = response.data[0];

      if (!insights) {
        throw new Error(`Label insights were not found for label ${id}.`);
      }

      return LabelInsightsDTOToView(insights);
    },
  });
}
