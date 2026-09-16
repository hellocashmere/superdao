"use client";

import { createContext, useContext } from "react";

import { useStore } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { createStore } from "zustand/vanilla";

import type { SearchStore } from "./types/types";

/**
 * Creates an isolated persisted search store for one application tree.
 */
export function createSearchStore() {
	return createStore<SearchStore>()(
		persist(
			(set) => ({
				hasHydrated: false,
				recentSearchIDs: [],
				addRecentSearch: (searchID) =>
					set((state) => ({
						recentSearchIDs: [searchID, ...state.recentSearchIDs.filter((id) => id !== searchID)].slice(0, 11),
					})),
				setHasHydrated: (hasHydrated) => set({ hasHydrated }),
			}),
			{
				name: "superdao:search",
				version: 1,
				storage: createJSONStorage(() => localStorage),
				skipHydration: true,
				partialize: ({ recentSearchIDs }) => ({ recentSearchIDs }),
			}
		)
	);
}

export type SearchStoreAPI = ReturnType<typeof createSearchStore>;

export const SearchStoreContext = createContext<SearchStoreAPI | null>(null);

/**
 * Selects reactive state from the nearest search store.
 */
export function useSearchStore<T>(selector: (state: SearchStore) => T) {
	const store = useContext(SearchStoreContext);

	if (!store) {
		throw new Error("useSearchStore must be used within SearchStoreProvider");
	}

	return useStore(store, selector);
}
