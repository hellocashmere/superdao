"use client";

import type { ComponentProps, Dispatch, SetStateAction } from "react";
import { createContext, useContext, useEffect, useState } from "react";

interface OrganizationSelectionValue {
	activeOrganizationID: string | undefined;
	setActiveOrganizationID: Dispatch<SetStateAction<string | undefined>>;
}

const storageKey = "superdao:active-organization-id";
const OrganizationSelectionContext = createContext<OrganizationSelectionValue | undefined>(undefined);

/**
 * Reads the persisted organization selection when browser storage is available.
 */
function getInitialOrganizationID(): string | undefined {
	if (typeof window === "undefined") return undefined;

	try {
		return localStorage.getItem(storageKey) ?? undefined;
	} catch {
		return undefined;
	}
}

export interface OrganizationSelectionProviderProps extends Pick<
	ComponentProps<typeof OrganizationSelectionContext.Provider>,
	"children"
> {}

/**
 * Provides the active organization selection to the application tree.
 */
export function OrganizationSelectionProvider({ children }: OrganizationSelectionProviderProps) {
	const [activeOrganizationID, setActiveOrganizationID] = useState<string | undefined>(getInitialOrganizationID);

	useEffect(() => {
		try {
			if (activeOrganizationID) localStorage.setItem(storageKey, activeOrganizationID);
			else localStorage.removeItem(storageKey);
		} catch {
			// Selection remains usable when browser storage is unavailable.
		}
	}, [activeOrganizationID]);

	return (
		<OrganizationSelectionContext.Provider value={{ activeOrganizationID, setActiveOrganizationID }}>
			{children}
		</OrganizationSelectionContext.Provider>
	);
}

/**
 * Reads and updates the active organization selection.
 */
export function useOrganizationSelection(): OrganizationSelectionValue {
	const selection = useContext(OrganizationSelectionContext);

	if (!selection) throw new Error("useOrganizationSelection must be used within OrganizationSelectionProvider");

	return selection;
}
