import type { UseQueryResult } from "@tanstack/react-query";
import { useMutation, useQuery } from "@tanstack/react-query";

import type { APIResponse } from "@/shared/api";
import { baseQuery } from "@/shared/api/tanstack";

import { CreateAudienceInputToDTO, SidebarAudienceDTOToView } from "../lib/to-map";
import type { AudienceView, CreateAudienceInput } from "../model/types/types";

import type { SidebarAudienceDTO } from "./types/types";

/**
 * Creates an audience through the backend API.
 */
export function useCreateAudience() {
	return useMutation({
		mutationFn: async (input: CreateAudienceInput): Promise<APIResponse<AudienceView>> => {
			const response = await baseQuery<SidebarAudienceDTO>("/audiences", {
				data: CreateAudienceInputToDTO(input),
				method: "POST",
			});

			return { ...response, data: SidebarAudienceDTOToView(response.data) };
		},
	});
}

/**
 * Selects an audience by ID from the sidebar collection.
 *
 * Endpoint: `GET /audiences`.
 */
export function useGetAudienceByID(id: number): UseQueryResult<AudienceView | undefined, Error> {
	return useQuery<APIResponse<readonly SidebarAudienceDTO[]>, Error, AudienceView | undefined>({
		queryKey: ["audiences", "sidebar"],
		queryFn: () => {
			return baseQuery<readonly SidebarAudienceDTO[]>("/audiences", {
				method: "GET",
			});
		},
		select: (response) => {
			const audience = response.data.find((item) => item.id === id);

			return audience ? SidebarAudienceDTOToView(audience) : undefined;
		},
	});
}

/**
 * Loads audiences displayed in the application sidebar.
 *
 * Endpoint: `GET /audiences`.
 */
export function useGetSidebarAudiences(): UseQueryResult<readonly AudienceView[], Error> {
	return useQuery<APIResponse<readonly SidebarAudienceDTO[]>, Error, readonly AudienceView[]>({
		queryKey: ["audiences", "sidebar"],
		queryFn: () => {
			return baseQuery<readonly SidebarAudienceDTO[]>("/audiences", {
				method: "GET",
			});
		},
		select: (response) => {
			return response.data.map(SidebarAudienceDTOToView);
		},
	});
}
