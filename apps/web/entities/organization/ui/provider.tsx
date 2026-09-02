"use client";

import type { ComponentProps } from "react";
import { useEffect, useState } from "react";

import { createOrganizationStore, OrganizationStoreContext } from "../model/store";

export interface OrganizationStoreProviderProps extends Pick<
  ComponentProps<typeof OrganizationStoreContext.Provider>,
  "children"
> {}

/** Provides one persisted organization store to the application tree. */
export function OrganizationStoreProvider({ children }: OrganizationStoreProviderProps) {
  const [store] = useState(createOrganizationStore);

  useEffect(() => {
    void Promise.resolve(store.persist.rehydrate()).finally(() => store.getState().setHasHydrated(true));
  }, [store]);

  return <OrganizationStoreContext.Provider value={store}>{children}</OrganizationStoreContext.Provider>;
}
