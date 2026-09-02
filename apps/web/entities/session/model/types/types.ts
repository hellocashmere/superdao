import type { AuthProvider } from "@/shared/ui/auth-button";

/**
 * Represents the authentication state rendered by client-side widgets.
 */
export type SessionStatus = "anonymous" | "authenticated";

/**
 * Contains session data required by the application UI.
 */
export interface SessionState {
  hasHydrated: boolean;
  provider: AuthProvider | null;
  status: SessionStatus;
  userID: string | null;
}

/**
 * Defines mutations available to session-aware UI.
 */
export interface SessionActions {
  authenticate: (provider: AuthProvider, userID: string) => void;
  resetSession: () => void;
  setHasHydrated: (hasHydrated: boolean) => void;
}

/**
 * Combines session data with mutations consumed by widgets.
 */
export type SessionStore = SessionState & SessionActions;
