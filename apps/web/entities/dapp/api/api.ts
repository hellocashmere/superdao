import type { UseQueryResult } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";

import type { APIResponse } from "@/shared/api";
import type { QueryOptions } from "@/shared/api/tanstack";
import { baseListQuery, baseQuery } from "@/shared/api/tanstack";

import { DappDTOToView, DappHighlightsDTOToView, DappInsightsDTOToView, DappWalletDTOToView } from "../lib/to-map";
import type { DappHighlightsView, DappInsightsView, DappView, DappWalletView } from "../model/types/types";

import type { DappDTO, DappHighlightsDTO, DappInsightsDTO, DappWalletDTO } from "./types/types";

/**
 * Loads dapps for the Explore directory.
 *
 * Endpoint: `GET /dapps`.
 */
export function useGetDapps(): UseQueryResult<readonly DappView[], Error> {
	return useQuery<APIResponse<readonly DappDTO[]>, Error, readonly DappView[]>({
		queryKey: ["dapps"],
		queryFn: () => {
			return baseListQuery<DappDTO>("/dapps", {
				method: "GET",
			});
		},
		select: (response) => {
			return response.data.map(DappDTOToView);
		},
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
		queryFn: () => {
			return baseQuery<DappDTO>(`/dapps/${id}`, {
				method: "GET",
			});
		},
		select: (response) => {
			return DappDTOToView(response.data);
		},
	});
}

/**
 * Loads highlights for a dapp audience.
 *
 * Endpoint: `GET /dapps/:id/highlights`.
 */
export function useGetDappHighlights(id: number, options?: QueryOptions): UseQueryResult<DappHighlightsView, Error> {
	return useQuery<APIResponse<DappHighlightsDTO>, Error, DappHighlightsView>({
		enabled: options?.enabled,
		queryKey: ["dapps", "by-id", id, "highlights"],
		queryFn: () => {
			return baseQuery<DappHighlightsDTO>(`/dapps/${id}/highlights`, {
				method: "GET",
			});
		},
		select: (response) => {
			return DappHighlightsDTOToView(response.data);
		},
	});
}

/**
 * Loads wallets for a dapp audience.
 *
 * Endpoint: `GET /dapps/:id/wallets`.
 */
export function useGetDappWallets(
	id: number,
	options?: QueryOptions
): UseQueryResult<readonly DappWalletView[], Error> {
	return useQuery<APIResponse<readonly DappWalletDTO[]>, Error, readonly DappWalletView[]>({
		enabled: options?.enabled,
		queryKey: ["dapps", "by-id", id, "wallets"],
		queryFn: () => {
			return baseListQuery<DappWalletDTO>(`/dapps/${id}/wallets`, {
				method: "GET",
			});
		},
		select: (response) => {
			return response.data.map(DappWalletDTOToView);
		},
	});
}

/**
 * Loads analytics for a dapp audience.
 *
 * Endpoint: `GET /dapps/:id/insights`.
 */
export function useGetDappInsights(id: number, options?: QueryOptions): UseQueryResult<DappInsightsView, Error> {
	return useQuery<APIResponse<DappInsightsDTO>, Error, DappInsightsView>({
		enabled: options?.enabled,
		queryKey: ["dapps", "by-id", id, "insights"],
		queryFn: () => {
			return baseQuery<DappInsightsDTO>(`/dapps/${id}/insights`, {
				method: "GET",
			});
		},
		select: (response) => {
			return DappInsightsDTOToView(response.data);
		},
	});
}
