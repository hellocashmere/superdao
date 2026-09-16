"use client";

import type { ComponentProps } from "react";
import { useEffect, useState } from "react";

import { createUserStore, UserStoreContext } from "../model/store";

export interface UserStoreProviderProps extends Pick<ComponentProps<typeof UserStoreContext.Provider>, "children"> {}

/**
 * Provides one persisted user-profile store to the rendered application tree.
 */
export function UserStoreProvider({ children }: UserStoreProviderProps) {
	const [store] = useState<ReturnType<typeof createUserStore>>(createUserStore);

	useEffect(() => {
		void Promise.resolve(store.persist.rehydrate()).finally(() => store.getState().setHasHydrated(true));
	}, [store]);

	return <UserStoreContext.Provider value={store}>{children}</UserStoreContext.Provider>;
}
