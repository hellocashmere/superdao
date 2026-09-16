/**
 * Organization record returned by the API.
 */
export interface OrganizationDTO {
	admins: readonly string[];
	avatar_url: string;
	description: string;
	id: string;
	name: string;
	slug: string;
}

/**
 * Organization creation payload sent to the API.
 */
export interface CreateOrganizationDTO {
	admins?: readonly string[];
	avatar_url?: string;
	description?: string;
	name: string;
	slug?: string;
}

/**
 * Organization update payload sent to the API.
 */
export interface UpdateOrganizationDTO {
	admins?: readonly string[];
	avatar_url?: string;
	description?: string;
	name?: string;
	slug?: string;
}
