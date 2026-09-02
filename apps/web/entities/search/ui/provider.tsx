"use client";

import type { ComponentProps } from "react";
import { useEffect, useState } from "react";

import { createSearchStore, SearchStoreContext } from "../model/store";

export interface SearchStoreProviderProps extends Pick<
  ComponentProps<typeof SearchStoreContext.Provider>,
  "children"
> {}

/**
 * Provides one persisted search store to the application tree.
 */
export function SearchStoreProvider({ children }: SearchStoreProviderProps) {
  const [store] = useState(createSearchStore);

  useEffect(() => {
    void Promise.resolve(store.persist.rehydrate()).finally(() => store.getState().setHasHydrated(true));
  }, [store]);

  return <SearchStoreContext.Provider value={store}>{children}</SearchStoreContext.Provider>;
}
