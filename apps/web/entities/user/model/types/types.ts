/**
 * Represents a user profile rendered by application widgets.
 */
export interface UserProfile {
	/**
	 * Unique entity ID.
	 */
	id: string;
	/**
	 * User profile display name.
	 */
	name: string;
	/**
	 * Email address.
	 */
	email: string;
	/**
	 * Avatar image URL.
	 */
	avatarUrl: string;
	/**
	 * Wallet address.
	 */
	wallet: string;
}

/**
 * Contains user state shared by client-side widgets.
 */
export interface UserState {
	/**
	 * Whether the user accepted cookie storage.
	 */
	hasAcceptedCookies: boolean;
	/**
	 * Whether persisted state has hydrated.
	 */
	hasHydrated: boolean;
	/**
	 * User profiles available in client state.
	 */
	users: readonly UserProfile[];
}

/**
 * Defines mutations available to user-aware UI.
 */
export interface UserActions {
	/**
	 * Records cookie consent.
	 */
	acceptCookies: () => void;
	/**
	 * Restores the initial user state.
	 */
	resetUsers: () => void;
	/**
	 * Records that persisted state has hydrated.
	 */
	setHasHydrated: (hasHydrated: boolean) => void;
	/**
	 * Updates a user profile.
	 */
	updateUser: (userID: string, changes: Partial<Omit<UserProfile, "id">>) => void;
}

/**
 * Combines user state with mutations consumed by widgets.
 */
export type UserStore = UserState & UserActions;
