import type { UseQueryResult } from "@tanstack/react-query";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import type { APIResponse } from "@/shared/api";
import { baseQuery } from "@/shared/api/tanstack";

import { CreateOrganizationInputToDTO, OrganizationDTOToView, UpdateOrganizationInputToDTO } from "../lib/to-map";
import type { CreateOrganizationInput, OrganizationView, UpdateOrganizationVariables } from "../model/types/types";

import type { OrganizationDTO } from "./types/types";

const organizationsQueryKey = ["organizations"] as const;

/**
 * Loads all organizations from the backend API.
 */
export function useGetOrganizations(): UseQueryResult<readonly OrganizationView[], Error> {
	return useQuery<APIResponse<readonly OrganizationDTO[]>, Error, readonly OrganizationView[]>({
		queryKey: organizationsQueryKey,
		queryFn: () => baseQuery<readonly OrganizationDTO[]>("/organizations"),
		select: (response) => response.data.map(OrganizationDTOToView),
	});
}

/**
 * Selects an organization by ID from the organization collection.
 *
 * Endpoint: `GET /organizations`.
 */
export function useGetOrganizationByID(id: string | undefined): UseQueryResult<OrganizationView | undefined, Error> {
	return useQuery<APIResponse<readonly OrganizationDTO[]>, Error, OrganizationView | undefined>({
		queryKey: organizationsQueryKey,
		queryFn: () => baseQuery<readonly OrganizationDTO[]>("/organizations"),
		select: (response) => {
			const organization = response.data.find((item) => item.id === id);

			return organization ? OrganizationDTOToView(organization) : undefined;
		},
	});
}

/**
 * Creates an organization and refreshes the organization list.
 */
export function useCreateOrganization() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (input: CreateOrganizationInput): Promise<OrganizationView> => {
			const response = await baseQuery<OrganizationDTO>("/organizations", {
				data: CreateOrganizationInputToDTO(input),
				method: "POST",
			});
			return OrganizationDTOToView(response.data);
		},
		onSuccess: async () => queryClient.invalidateQueries({ queryKey: organizationsQueryKey }),
	});
}

/**
 * Updates an organization and refreshes the organization list.
 */
export function useUpdateOrganization() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async ({ organizationID, changes }: UpdateOrganizationVariables): Promise<OrganizationView> => {
			const response = await baseQuery<OrganizationDTO>(`/organizations/${organizationID}`, {
				data: UpdateOrganizationInputToDTO(changes),
				method: "PATCH",
			});
			return OrganizationDTOToView(response.data);
		},
		onSuccess: async () => queryClient.invalidateQueries({ queryKey: organizationsQueryKey }),
	});
}
