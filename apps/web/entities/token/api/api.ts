import type { UseQueryResult } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";

import type { APIResponse } from "@/shared/api";
import { baseQuery } from "@/shared/api/tanstack";

import { TokenDTOToView, TokenHighlightsDTOToView, TokenInsightsDTOToView, TokenWalletDTOToView } from "../lib/to-map";
import type { TokenHighlightsView, TokenInsightsView, TokenView, TokenWalletView } from "../model/types/types";

import type { TokenDTO, TokenHighlightsDTO, TokenInsightsDTO, TokenWalletDTO } from "./types/types";

/**
 * Loads one token for server-side consumers.
 *
 * Endpoint: `GET /tokens/:id`.
 */
export async function getToken(id: number): Promise<TokenView> {
  const response = await baseQuery<TokenDTO>(`/tokens/${id}`, {
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
 * Loads one token by its backend-provided ID.
 *
 * Endpoint: `GET /tokens/:id`.
 */
export function useGetToken(id: number): UseQueryResult<TokenView, Error> {
  return useQuery<APIResponse<TokenDTO>, Error, TokenView>({
    queryKey: ["tokens", "by-id", id],
    queryFn: () => baseQuery<TokenDTO>(`/tokens/${id}`, { method: "GET" }),
    select: (response) => TokenDTOToView(response.data),
  });
}

/**
 * Loads highlights for a token audience.
 *
 * Endpoint: `GET /token-highlights?token_id=:id`.
 */
export function useGetTokenHighlights(id: number): UseQueryResult<TokenHighlightsView, Error> {
  return useQuery<APIResponse<readonly TokenHighlightsDTO[]>, Error, TokenHighlightsView>({
    queryKey: ["tokens", "by-id", id, "highlights"],
    queryFn: () =>
      baseQuery<readonly TokenHighlightsDTO[]>("/token-highlights", {
        method: "GET",
        params: { token_id: id },
      }),
    select: (response) => {
      const highlights = response.data[0];

      if (!highlights) {
        throw new Error(`Highlights were not found for token ${id}.`);
      }

      return TokenHighlightsDTOToView(highlights);
    },
  });
}

/**
 * Loads wallets for a token audience.
 *
 * Endpoint: `GET /token-wallets?token_id=:id`.
 */
export function useGetTokenWallets(id: number): UseQueryResult<readonly TokenWalletView[], Error> {
  return useQuery<APIResponse<readonly TokenWalletDTO[]>, Error, readonly TokenWalletView[]>({
    queryKey: ["tokens", "by-id", id, "wallets"],
    queryFn: () =>
      baseQuery<readonly TokenWalletDTO[]>("/token-wallets", {
        method: "GET",
        params: { token_id: id },
      }),
    select: (response) => response.data.map(TokenWalletDTOToView),
  });
}

/**
 * Loads analytics for a token audience.
 *
 * Endpoint: `GET /token-insights?token_id=:id`.
 */
export function useGetTokenInsights(id: number): UseQueryResult<TokenInsightsView, Error> {
  return useQuery<APIResponse<readonly TokenInsightsDTO[]>, Error, TokenInsightsView>({
    queryKey: ["tokens", "by-id", id, "insights"],
    queryFn: () =>
      baseQuery<readonly TokenInsightsDTO[]>("/token-insights", {
        method: "GET",
        params: { token_id: id },
      }),
    select: (response) => {
      const insights = response.data[0];

      if (!insights) {
        throw new Error(`Insights were not found for token ${id}.`);
      }

      return TokenInsightsDTOToView(insights);
    },
  });
}
