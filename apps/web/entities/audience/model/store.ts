"use client";

import { createContext, useContext } from "react";

import { useStore } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { createStore } from "zustand/vanilla";

import type { Audience, AudienceState, AudienceStore } from "./types/types";

export const initialAudiences: readonly Audience[] = [
  {
    id: "cashmere-ton",
    name: "cashmere.ton",
  },
];

function createAudienceID(name: string, audiences: readonly Audience[]) {
  const baseID =
    name
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "") || "audience";
  let id = baseID;
  let suffix = 2;

  while (audiences.some((audience) => audience.id === id)) {
    id = `${baseID}-${suffix}`;
    suffix += 1;
  }

  return id;
}

function migrateAudienceState(persistedState: unknown) {
  const persisted = persistedState as Partial<AudienceState> | undefined;
  const audiencesByID = new Map(initialAudiences.map((audience) => [audience.id, audience]));

  if (Array.isArray(persisted?.audiences)) {
    for (const audience of persisted.audiences) {
      if (audience?.id && audience.name) {
        audiencesByID.set(audience.id, audience);
      }
    }
  }

  return { audiences: [...audiencesByID.values()] };
}

/**
 * Creates an isolated persisted audience store.
 */
export function createAudienceStore() {
  return createStore<AudienceStore>()(
    persist(
      (set) => ({
        audiences: initialAudiences,
        hasHydrated: false,
        createAudience: (input) => {
          let createdID = "";

          set((state) => {
            createdID = createAudienceID(input.name, state.audiences);

            return {
              audiences: [
                ...state.audiences,
                {
                  id: createdID,
                  name: input.name.trim(),
                  walletCount: input.walletCount,
                },
              ],
            };
          });

          return createdID;
        },
        resetAudiences: () => set({ audiences: initialAudiences }),
        setHasHydrated: (hasHydrated) => set({ hasHydrated }),
      }),
      {
        name: "superdao:audiences",
        version: 1,
        migrate: migrateAudienceState,
        storage: createJSONStorage(() => localStorage),
        skipHydration: true,
        partialize: ({ audiences }) => ({ audiences }),
      }
    )
  );
}

export type AudienceStoreAPI = ReturnType<typeof createAudienceStore>;

export const AudienceStoreContext = createContext<AudienceStoreAPI | null>(null);

/**
 * Selects reactive state from the nearest audience store.
 */
export function useAudienceStore<T>(selector: (state: AudienceStore) => T) {
  const store = useContext(AudienceStoreContext);

  if (!store) {
    throw new Error("useAudienceStore must be used within AudienceStoreProvider");
  }

  return useStore(store, selector);
}
