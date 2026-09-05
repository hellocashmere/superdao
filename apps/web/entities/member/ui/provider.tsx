"use client";

import type { ComponentProps } from "react";
import { useEffect, useState } from "react";

import { createMemberStore, MemberStoreContext } from "../model/store";

export interface MemberStoreProviderProps extends Pick<
  ComponentProps<typeof MemberStoreContext.Provider>,
  "children"
> {}

/** Provides one persisted organization-member store to the application tree. */
export function MemberStoreProvider({ children }: MemberStoreProviderProps) {
  const [store] = useState(createMemberStore);

  useEffect(() => {
    void Promise.resolve(store.persist.rehydrate()).finally(() => store.getState().setHasHydrated(true));
  }, [store]);

  return <MemberStoreContext.Provider value={store}>{children}</MemberStoreContext.Provider>;
}
