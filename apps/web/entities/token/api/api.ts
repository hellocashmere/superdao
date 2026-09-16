import type { UseQueryResult } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";

import type { APIResponse } from "@/shared/api";
import type { QueryOptions } from "@/shared/api/tanstack";
import { baseListQuery, baseQuery } from "@/shared/api/tanstack";

import { TokenDTOToView, TokenHighlightsDTOToView, TokenInsightsDTOToView, TokenWalletDTOToView } from "../lib/to-map";
import type { TokenHighlightsView, TokenInsightsView, TokenView, TokenWalletView } from "../model/types/types";

import type { TokenDTO, TokenHighlightsDTO, TokenInsightsDTO, TokenWalletDTO } from "./types/types";

/**
 * Loads tokens for the Explore directory.
 *
 * Endpoint: `GET /tokens`.
 */
export function useGetTokens(): UseQueryResult<readonly TokenView[], Error> {
	return useQuery<APIResponse<readonly TokenDTO[]>, Error, readonly TokenView[]>({
		queryKey: ["tokens"],
		queryFn: () => {
			return baseListQuery<TokenDTO>("/tokens", {
				method: "GET",
			});
		},
		select: (response) => {
			return response.data.map(TokenDTOToView);
		},
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
		queryFn: () => {
			return baseQuery<TokenDTO>(`/tokens/${id}`, {
				method: "GET",
			});
		},
		select: (response) => {
			return TokenDTOToView(response.data);
		},
	});
}

/**
 * Loads highlights for a token audience.
 *
 * Endpoint: `GET /tokens/:id/highlights`.
 */
export function useGetTokenHighlights(id: number, options?: QueryOptions): UseQueryResult<TokenHighlightsView, Error> {
	return useQuery<APIResponse<TokenHighlightsDTO>, Error, TokenHighlightsView>({
		enabled: options?.enabled,
		queryKey: ["tokens", "by-id", id, "highlights"],
		queryFn: () => {
			return baseQuery<TokenHighlightsDTO>(`/tokens/${id}/highlights`, {
				method: "GET",
			});
		},
		select: (response) => {
			return TokenHighlightsDTOToView(response.data);
		},
	});
}

/**
 * Loads wallets for a token audience.
 *
 * Endpoint: `GET /tokens/:id/wallets`.
 */
export function useGetTokenWallets(
	id: number,
	options?: QueryOptions
): UseQueryResult<readonly TokenWalletView[], Error> {
	return useQuery<APIResponse<readonly TokenWalletDTO[]>, Error, readonly TokenWalletView[]>({
		enabled: options?.enabled,
		queryKey: ["tokens", "by-id", id, "wallets"],
		queryFn: () => {
			return baseListQuery<TokenWalletDTO>(`/tokens/${id}/wallets`, {
				method: "GET",
			});
		},
		select: (response) => {
			return response.data.map(TokenWalletDTOToView);
		},
	});
}

/**
 * Loads analytics for a token audience.
 *
 * Endpoint: `GET /tokens/:id/insights`.
 */
export function useGetTokenInsights(id: number, options?: QueryOptions): UseQueryResult<TokenInsightsView, Error> {
	return useQuery<APIResponse<TokenInsightsDTO>, Error, TokenInsightsView>({
		enabled: options?.enabled,
		queryKey: ["tokens", "by-id", id, "insights"],
		queryFn: () => {
			return baseQuery<TokenInsightsDTO>(`/tokens/${id}/insights`, {
				method: "GET",
			});
		},
		select: (response) => {
			return TokenInsightsDTOToView(response.data);
		},
	});
}
