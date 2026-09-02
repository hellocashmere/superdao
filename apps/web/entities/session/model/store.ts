"use client";

import { createContext, useContext } from "react";

import { useStore } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { createStore } from "zustand/vanilla";

import type { SessionState, SessionStore } from "./types/types";

const defaultSessionState: SessionState = {
  hasHydrated: false,
  provider: null,
  status: "anonymous",
  userID: null,
};

/**
 * Creates an isolated persisted session store for one application tree.
 */
export function createSessionStore() {
  return createStore<SessionStore>()(
    persist(
      (set) => ({
        ...defaultSessionState,
        authenticate: (provider, userID) => set({ provider, status: "authenticated", userID: userID }),
        resetSession: () => set({ provider: null, status: "anonymous", userID: null }),
        setHasHydrated: (hasHydrated) => set({ hasHydrated }),
      }),
      {
        name: "superdao:session",
        version: 1,
        storage: createJSONStorage(() => localStorage),
        skipHydration: true,
        partialize: ({ provider, status, userID }) => ({
          provider,
          status,
          userID: userID,
        }),
      }
    )
  );
}

export type SessionStoreAPI = ReturnType<typeof createSessionStore>;

export const SessionStoreContext = createContext<SessionStoreAPI | null>(null);

/**
 * Selects reactive state from the nearest session store.
 */
export function useSessionStore<T>(selector: (state: SessionStore) => T) {
  const store = useContext(SessionStoreContext);

  if (!store) {
    throw new Error("useSessionStore must be used within SessionStoreProvider");
  }

  return useStore(store, selector);
}
