/**
 * Organization details displayed throughout the application.
 */
export interface OrganizationView {
	/**
	 * Wallet addresses with administrative access.
	 */
	admins: readonly string[];
	/**
	 * Avatar image URL.
	 */
	avatarUrl: string;
	/**
	 * Supporting explanatory text.
	 */
	description: string;
	/**
	 * Unique entity ID.
	 */
	id: string;
	/**
	 * Organization display name.
	 */
	name: string;
	/**
	 * URL-safe entity ID.
	 */
	slug: string;
}

/**
 * Data required to create an organization.
 */
export interface CreateOrganizationInput {
	/**
	 * Wallet addresses with administrative access.
	 */
	admins?: readonly string[];
	/**
	 * Avatar image URL.
	 */
	avatarUrl?: string;
	/**
	 * Supporting explanatory text.
	 */
	description?: string;
	/**
	 * Display name requested for the new organization.
	 */
	name: string;
	/**
	 * URL-safe entity ID.
	 */
	slug?: string;
}

/**
 * Fields accepted when updating an organization.
 */
export type UpdateOrganizationInput = Partial<Omit<OrganizationView, "id">>;

/**
 * Variables required by the organization update mutation.
 */
export interface UpdateOrganizationVariables {
	changes: UpdateOrganizationInput;
	organizationID: string;
}
