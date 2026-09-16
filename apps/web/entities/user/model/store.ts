"use client";

import { createContext, useContext } from "react";

import { useStore } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { createStore } from "zustand/vanilla";

import type { UserProfile, UserStore } from "./types/types";

export const initialUsers: readonly UserProfile[] = [
	{
		id: "cashmere",
		name: "Cashmere R.",
		email: "cashmere@example.co",
		avatarUrl: "http://localhost:3001/avatars/cashmere.png",
		wallet: "cashmere.eth",
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
				version: 6,
				migrate: (persistedState) => {
					const state = persistedState as Pick<UserStore, "users">;

					return {
						...state,
						users: state.users.map((user) =>
							user.name === "cashmere.ton" ||
							user.wallet === "cashmere.ton" ||
							user.name === "cashmere.gram" ||
							user.wallet === "cashmere.gram" ||
							user.name === "Cashmere R" ||
							user.wallet === "Cashmere R" ||
							user.wallet === "Cashmere R."
								? {
										...user,
										name: "Cashmere R.",
										wallet: "cashmere.eth",
										avatarUrl: "http://localhost:3001/avatars/cashmere.png",
									}
								: user
						),
					};
				},
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
