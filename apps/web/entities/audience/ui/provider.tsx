"use client";

import type { ComponentProps } from "react";
import { useEffect, useState } from "react";

import { AudienceStoreContext, createAudienceStore } from "../model/store";

export interface AudienceStoreProviderProps extends Pick<
  ComponentProps<typeof AudienceStoreContext.Provider>,
  "children"
> {}

/**
 * Provides one persisted audience store to the application tree.
 */
export function AudienceStoreProvider({ children }: AudienceStoreProviderProps) {
  const [store] = useState(createAudienceStore);

  useEffect(() => {
    void Promise.resolve(store.persist.rehydrate()).finally(() => store.getState().setHasHydrated(true));
  }, [store]);

  return <AudienceStoreContext.Provider value={store}>{children}</AudienceStoreContext.Provider>;
}
