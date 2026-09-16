import type { UseQueryResult } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";

import type { APIResponse } from "@/shared/api";
import type { QueryOptions } from "@/shared/api/tanstack";
import { baseListQuery, baseQuery } from "@/shared/api/tanstack";

import { LabelDTOToView, LabelHighlightsDTOToView, LabelInsightsDTOToView, LabelWalletDTOToView } from "../lib/to-map";
import type { LabelHighlightsView, LabelInsightsView, LabelView, LabelWalletView } from "../model/types/types";

import type { LabelDTO, LabelHighlightsDTO, LabelInsightsDTO, LabelWalletDTO } from "./types/types";

/**
 * Loads labels for the discovery directory.
 *
 * Endpoint: `GET /labels`.
 */
export function useGetLabels(): UseQueryResult<readonly LabelView[], Error> {
	return useQuery<APIResponse<readonly LabelDTO[]>, Error, readonly LabelView[]>({
		queryKey: ["labels"],
		queryFn: () => {
			return baseListQuery<LabelDTO>("/labels", {
				method: "GET",
			});
		},
		select: (response) => {
			return response.data.map(LabelDTOToView);
		},
	});
}

/**
 * Selects a label by slug from the label collection.
 *
 * Endpoint: `GET /labels`.
 */
export function useGetLabelBySlug(slug: string): UseQueryResult<LabelView | undefined, Error> {
	return useQuery<APIResponse<readonly LabelDTO[]>, Error, LabelView | undefined>({
		queryKey: ["labels"],
		queryFn: () => {
			return baseListQuery<LabelDTO>("/labels", {
				method: "GET",
			});
		},
		select: (response) => {
			const label = response.data.find((item) => item.slug === slug);

			return label ? LabelDTOToView(label) : undefined;
		},
	});
}

/**
 * Loads a label by its backend-provided ID.
 *
 * Endpoint: `GET /labels/:id`.
 */
export function useGetLabelDetails(id: number): UseQueryResult<LabelView, Error> {
	return useQuery<APIResponse<LabelDTO>, Error, LabelView>({
		queryKey: ["labels", "by-id", id],
		queryFn: () => {
			return baseQuery<LabelDTO>(`/labels/${id}`, {
				method: "GET",
			});
		},
		select: (response) => {
			return LabelDTOToView(response.data);
		},
	});
}

/**
 * Loads summary metrics and a balance distribution for a label.
 *
 * Endpoint: `GET /labels/:id/highlights`.
 */
export function useGetLabelHighlights(id: number, options?: QueryOptions): UseQueryResult<LabelHighlightsView, Error> {
	return useQuery<APIResponse<LabelHighlightsDTO>, Error, LabelHighlightsView>({
		enabled: options?.enabled,
		queryKey: ["labels", "by-id", id, "highlights"],
		queryFn: () => {
			return baseQuery<LabelHighlightsDTO>(`/labels/${id}/highlights`, {
				method: "GET",
			});
		},
		select: (response) => {
			return LabelHighlightsDTOToView(response.data);
		},
	});
}

/**
 * Loads wallets associated with a label.
 *
 * Endpoint: `GET /labels/:id/wallets`.
 */
export function useGetLabelWallets(
	id: number,
	options?: QueryOptions
): UseQueryResult<readonly LabelWalletView[], Error> {
	return useQuery<APIResponse<readonly LabelWalletDTO[]>, Error, readonly LabelWalletView[]>({
		enabled: options?.enabled,
		queryKey: ["labels", "by-id", id, "wallets"],
		queryFn: () => {
			return baseListQuery<LabelWalletDTO>(`/labels/${id}/wallets`, {
				method: "GET",
			});
		},
		select: (response) => {
			return response.data.map(LabelWalletDTOToView);
		},
	});
}

/**
 * Loads analytics displayed in the label Insights tab.
 *
 * Endpoint: `GET /labels/:id/insights`.
 */
export function useGetLabelInsights(id: number, options?: QueryOptions): UseQueryResult<LabelInsightsView, Error> {
	return useQuery<APIResponse<LabelInsightsDTO>, Error, LabelInsightsView>({
		enabled: options?.enabled,
		queryKey: ["labels", "by-id", id, "insights"],
		queryFn: () => {
			return baseQuery<LabelInsightsDTO>(`/labels/${id}/insights`, {
				method: "GET",
			});
		},
		select: (response) => {
			return LabelInsightsDTOToView(response.data);
		},
	});
}
