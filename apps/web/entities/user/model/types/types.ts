/**
 * Represents a user profile rendered by application widgets.
 */
export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  wallet: string;
}

/**
 * Contains user state shared by client-side widgets.
 */
export interface UserState {
  hasAcceptedCookies: boolean;
  hasHydrated: boolean;
  users: readonly UserProfile[];
}

/**
 * Defines mutations available to user-aware UI.
 */
export interface UserActions {
  acceptCookies: () => void;
  resetUsers: () => void;
  setHasHydrated: (hasHydrated: boolean) => void;
  updateUser: (userID: string, changes: Partial<Omit<UserProfile, "id">>) => void;
}

/**
 * Combines user state with mutations consumed by widgets.
 */
export type UserStore = UserState & UserActions;
