/**
 * Organization details displayed throughout the application.
 */
export interface Organization {
  admins: readonly string[];
  avatarUrl: string;
  description?: string;
  id: string;
  name: string;
  slug: string;
}

/**
 * Data required to create an organization.
 */
export interface CreateOrganizationInput {
  admins?: readonly string[];
  avatarUrl?: string;
  description?: string;
  name: string;
  slug?: string;
}

/**
 * Persisted state owned by the organization store.
 */
export interface OrganizationState {
  activeOrganizationID: string;
  hasHydrated: boolean;
  organizations: readonly Organization[];
}

/**
 * Mutations supported by the organization store.
 */
export interface OrganizationActions {
  createOrganization: (input: CreateOrganizationInput) => string;
  resetOrganizations: () => void;
  setActiveOrganization: (organizationID: string) => void;
  setHasHydrated: (hasHydrated: boolean) => void;
  updateOrganization: (organizationID: string, changes: Partial<Omit<Organization, "id">>) => void;
}

/**
 * Complete state and action contract for organizations.
 */
export type OrganizationStore = OrganizationState & OrganizationActions;
