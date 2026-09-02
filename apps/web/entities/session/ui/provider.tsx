"use client";

import type { ComponentProps } from "react";
import { useEffect, useState } from "react";

import { createSessionStore, SessionStoreContext } from "../model/store";

export interface SessionStoreProviderProps extends Pick<
  ComponentProps<typeof SessionStoreContext.Provider>,
  "children"
> {}

/**
 * Provides one persisted session store to the application tree.
 */
export function SessionStoreProvider({ children }: SessionStoreProviderProps) {
  const [store] = useState(createSessionStore);

  useEffect(() => {
    void Promise.resolve(store.persist.rehydrate()).finally(() => store.getState().setHasHydrated(true));
  }, [store]);

  return <SessionStoreContext.Provider value={store}>{children}</SessionStoreContext.Provider>;
}
