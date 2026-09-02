"use client";

import { createContext, useContext } from "react";

import { useStore } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { createStore } from "zustand/vanilla";

import type { CreateOrganizationInput, Organization, OrganizationState, OrganizationStore } from "./types/types";

export const initialOrganizations: readonly Organization[] = [
  {
    admins: ["0x95987f247317823BD2334265AcebE6A87d4b4A35", "0xD67B249f202E7171DF1efd6fa8719Afc0D155CBE"],
    id: "acme",
    name: "Acme Inc.",
    slug: "acme",
    avatarUrl: "/avatars/acme.svg",
  },
  {
    admins: [],
    id: "cashmere-engineering-university",
    name: "Cashmere Engineering University",
    slug: "cashmere-engineering-university",
    avatarUrl: "/avatars/cashmere.png",
  },
];

function createOrganizationID(name: string) {
  const slug = name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  return `${slug || "organization"}-${crypto.randomUUID().slice(0, 8)}`;
}

function migrateOrganizationState(persistedState: unknown) {
  const persisted = persistedState as Partial<OrganizationState> | undefined;
  const organizationsByID = new Map(initialOrganizations.map((organization) => [organization.id, organization]));

  if (Array.isArray(persisted?.organizations)) {
    for (const organization of persisted.organizations) {
      if (organization?.id && organization.name) {
        organizationsByID.set(organization.id, organization);
      }
    }
  }

  const organizations = [...organizationsByID.values()];
  const persistedActiveOrganizationID = persisted?.activeOrganizationID;
  const activeOrganizationID = organizations.some((organization) => organization.id === persistedActiveOrganizationID)
    ? persistedActiveOrganizationID!
    : initialOrganizations[0]!.id;

  return { activeOrganizationID, organizations };
}

/** Creates an isolated persisted organization store. */
export function createOrganizationStore() {
  return createStore<OrganizationStore>()(
    persist(
      (set) => ({
        activeOrganizationID: initialOrganizations[0]!.id,
        hasHydrated: false,
        organizations: initialOrganizations,
        createOrganization: (input) => {
          const id = createOrganizationID(input.name);
          const organization: Organization = {
            admins: input.admins ?? [],
            id,
            name: input.name.trim(),
            slug: input.slug?.trim() ?? "",
            avatarUrl: input.avatarUrl ?? "",
            description: input.description?.trim() ?? "",
          };

          set((state) => ({
            activeOrganizationID: id,
            organizations: [...state.organizations, organization],
          }));

          return id;
        },
        resetOrganizations: () =>
          set({
            activeOrganizationID: initialOrganizations[0]!.id,
            organizations: initialOrganizations,
          }),
        setActiveOrganization: (activeOrganizationID) =>
          set((state) =>
            state.organizations.some((organization) => organization.id === activeOrganizationID)
              ? { activeOrganizationID }
              : state
          ),
        setHasHydrated: (hasHydrated) => set({ hasHydrated }),
        updateOrganization: (organizationID, changes) =>
          set((state) => ({
            organizations: state.organizations.map((organization) =>
              organization.id === organizationID ? { ...organization, ...changes } : organization
            ),
          })),
      }),
      {
        name: "superdao:organizations",
        version: 3,
        migrate: migrateOrganizationState,
        storage: createJSONStorage(() => localStorage),
        skipHydration: true,
        partialize: ({ activeOrganizationID, organizations }) => ({
          activeOrganizationID,
          organizations,
        }),
      }
    )
  );
}

export type OrganizationStoreApi = ReturnType<typeof createOrganizationStore>;

export const OrganizationStoreContext = createContext<OrganizationStoreApi | null>(null);

/**
 * Selects reactive state from the nearest organization store.
 */
export function useOrganizationStore<T>(selector: (state: OrganizationStore) => T) {
  const store = useContext(OrganizationStoreContext);

  if (!store) {
    throw new Error("useOrganizationStore must be used within OrganizationStoreProvider");
  }

  return useStore(store, selector);
}
