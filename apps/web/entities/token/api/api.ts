import type { UseQueryResult } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";

import type { APIResponse } from "@/shared/api";
import { baseQuery } from "@/shared/api/tanstack";

import {
  TokenDTOToView,
  TokenHighlightsDTOToView,
  TokenInsightsDTOToView,
  TokenWalletDTOToView,
} from "../lib/to-map";
import type {
  TokenHighlightsView,
  TokenInsightsView,
  TokenView,
  TokenWalletView,
} from "../model/types/types";

import type {
  TokenDTO,
  TokenHighlightsDTO,
  TokenInsightsDTO,
  TokenWalletDTO,
} from "./types/types";

/**
 * Loads one token for server-side consumers.
 *
 * Endpoint: `GET /tokens/:id`.
 */
export async function getToken(id: string): Promise<TokenView> {
  const normalizedID = id.trim().toLowerCase();
  const response = await baseQuery<TokenDTO>(`/tokens/${encodeURIComponent(normalizedID)}`, {
    method: "GET",
  });

  return TokenDTOToView(response.data);
}

/**
 * Loads tokens for the Explore directory.
 *
 * Endpoint: `GET /tokens`.
 */
export function useGetTokens(): UseQueryResult<readonly TokenView[], Error> {
  return useQuery<APIResponse<readonly TokenDTO[]>, Error, readonly TokenView[]>({
    queryKey: ["tokens"],
    queryFn: () => baseQuery<readonly TokenDTO[]>("/tokens", { method: "GET" }),
    select: (response) => response.data.map(TokenDTOToView),
  });
}

/**
 * Loads one token by its identifier.
 *
 * Endpoint: `GET /tokens/:id`.
 */
export function useGetToken(id: string): UseQueryResult<TokenView, Error> {
  const normalizedID = id.trim().toLowerCase();

  return useQuery<APIResponse<TokenDTO>, Error, TokenView>({
    queryKey: ["tokens", normalizedID],
    queryFn: () => baseQuery<TokenDTO>(`/tokens/${encodeURIComponent(normalizedID)}`, { method: "GET" }),
    select: (response) => TokenDTOToView(response.data),
    enabled: normalizedID.length > 0,
  });
}

/**
 * Loads highlights for a token audience.
 *
 * Endpoint: `GET /token-highlights?token_id=:id`.
 */
export function useGetTokenHighlights(id: string): UseQueryResult<TokenHighlightsView, Error> {
  const normalizedID = id.trim().toLowerCase();

  return useQuery<APIResponse<readonly TokenHighlightsDTO[]>, Error, TokenHighlightsView>({
    queryKey: ["tokens", normalizedID, "highlights"],
    queryFn: () =>
      baseQuery<readonly TokenHighlightsDTO[]>("/token-highlights", {
        method: "GET",
        params: { token_id: normalizedID },
      }),
    select: (response) => {
      const highlights = response.data[0];

      if (!highlights) {
        throw new Error(`Highlights were not found for token ${normalizedID}.`);
      }

      return TokenHighlightsDTOToView(highlights);
    },
    enabled: normalizedID.length > 0,
  });
}

/**
 * Loads wallets for a token audience.
 *
 * Endpoint: `GET /token-wallets?token_id=:id`.
 */
export function useGetTokenWallets(id: string): UseQueryResult<readonly TokenWalletView[], Error> {
  const normalizedID = id.trim().toLowerCase();

  return useQuery<APIResponse<readonly TokenWalletDTO[]>, Error, readonly TokenWalletView[]>({
    queryKey: ["tokens", normalizedID, "wallets"],
    queryFn: () =>
      baseQuery<readonly TokenWalletDTO[]>("/token-wallets", {
        method: "GET",
        params: { token_id: normalizedID },
      }),
    select: (response) => response.data.map(TokenWalletDTOToView),
    enabled: normalizedID.length > 0,
  });
}

/**
 * Loads analytics for a token audience.
 *
 * Endpoint: `GET /token-insights?token_id=:id`.
 */
export function useGetTokenInsights(id: string): UseQueryResult<TokenInsightsView, Error> {
  const normalizedID = id.trim().toLowerCase();

  return useQuery<APIResponse<readonly TokenInsightsDTO[]>, Error, TokenInsightsView>({
    queryKey: ["tokens", normalizedID, "insights"],
    queryFn: () =>
      baseQuery<readonly TokenInsightsDTO[]>("/token-insights", {
        method: "GET",
        params: { token_id: normalizedID },
      }),
    select: (response) => {
      const insights = response.data[0];

      if (!insights) {
        throw new Error(`Insights were not found for token ${normalizedID}.`);
      }

      return TokenInsightsDTOToView(insights);
    },
    enabled: normalizedID.length > 0,
  });
}
