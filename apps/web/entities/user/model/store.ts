"use client";

import { createContext, useContext } from "react";

import { useStore } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { createStore } from "zustand/vanilla";

import type { UserProfile, UserStore } from "./types/types";

export const initialUsers: readonly UserProfile[] = [
  {
    id: "cashmere",
    name: "cashmere.ton",
    email: "cashmere@superdao.co",
    avatarUrl: "/avatars/cashmere.png",
    wallet: "cashmere.ton",
  },
];

/**
 * Creates an isolated persisted user-profile store.
 */
export function createUserStore() {
  return createStore<UserStore>()(
    persist(
      (set) => ({
        hasAcceptedCookies: false,
        hasHydrated: false,
        users: initialUsers,
        acceptCookies: () => set({ hasAcceptedCookies: true }),
        resetUsers: () => set({ users: initialUsers }),
        setHasHydrated: (hasHydrated) => set({ hasHydrated }),
        updateUser: (userID, changes) =>
          set((state) => ({
            users: state.users.map((user) => (user.id === userID ? { ...user, ...changes } : user)),
          })),
      }),
      {
        name: "superdao:users",
        version: 2,
        storage: createJSONStorage(() => localStorage),
        skipHydration: true,
        partialize: ({ hasAcceptedCookies, users }) => ({
          hasAcceptedCookies,
          users,
        }),
      }
    )
  );
}

export type UserStoreAPI = ReturnType<typeof createUserStore>;

export const UserStoreContext = createContext<UserStoreAPI | null>(null);

/**
 * Selects reactive state from the nearest user-profile store.
 */
export function useUserStore<T>(selector: (state: UserStore) => T) {
  const store = useContext(UserStoreContext);

  if (!store) {
    throw new Error("useUserStore must be used within UserStoreProvider");
  }

  return useStore(store, selector);
}
