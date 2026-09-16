import { BASE_URL } from "@/shared/api";

import type { CreateOrganizationDTO, OrganizationDTO, UpdateOrganizationDTO } from "../api/types/types";
import type { CreateOrganizationInput, OrganizationView, UpdateOrganizationInput } from "../model/types/types";

/**
 * Resolves an organization avatar path against the API origin.
 */
function resolveAvatarUrl(path: string): string {
	if (!path || /^https?:\/\//.test(path)) return path;

	return `${BASE_URL?.replace(/\/$/, "") ?? ""}/${path.replace(/^\//, "")}`;
}

/**
 * Maps an organization API record to its UI model.
 */
export function OrganizationDTOToView(dto: OrganizationDTO): OrganizationView {
	return {
		admins: dto.admins,
		avatarUrl: resolveAvatarUrl(dto.avatar_url),
		description: dto.description,
		id: dto.id,
		name: dto.name,
		slug: dto.slug,
	};
}

/**
 * Maps an organization creation model to its API payload.
 */
export function CreateOrganizationInputToDTO(input: CreateOrganizationInput): CreateOrganizationDTO {
	return {
		admins: input.admins,
		avatar_url: input.avatarUrl,
		description: input.description,
		name: input.name,
		slug: input.slug,
	};
}

/**
 * Maps an organization update model to its API payload.
 */
export function UpdateOrganizationInputToDTO(input: UpdateOrganizationInput): UpdateOrganizationDTO {
	return {
		admins: input.admins,
		avatar_url: input.avatarUrl,
		description: input.description,
		name: input.name,
		slug: input.slug,
	};
}
