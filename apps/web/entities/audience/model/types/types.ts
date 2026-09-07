/**
 * Audience details persisted by the client application.
 */
export interface Audience {
  id: string;
  name: string;
  walletCount?: number;
}

/**
 * Data required to create an audience.
 */
export interface CreateAudienceInput {
  name: string;
  walletCount: number;
}

/**
 * Persisted state owned by the audience store.
 */
export interface AudienceState {
  audiences: readonly Audience[];
  hasHydrated: boolean;
}

/**
 * Mutations supported by the audience store.
 */
export interface AudienceActions {
  createAudience: (input: CreateAudienceInput) => string;
  resetAudiences: () => void;
  setHasHydrated: (hasHydrated: boolean) => void;
}

/**
 * Complete state and action contract for audiences.
 */
export type AudienceStore = AudienceState & AudienceActions;
