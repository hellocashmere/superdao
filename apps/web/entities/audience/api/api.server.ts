import { baseQuery } from "@/shared/api/tanstack";

import "server-only";

import { SidebarAudienceDTOToView } from "../lib/to-map";
import type { AudienceView } from "../model/types/types";

import type { SidebarAudienceDTO } from "./types/types";

/**
 * Loads an audience by its identifier for server-rendered route metadata.
 *
 * Endpoint: `GET /audiences`.
 */
export async function getAudienceByID(id: number): Promise<AudienceView | undefined> {
	try {
		const response = await baseQuery<readonly SidebarAudienceDTO[]>("/audiences", {
			method: "GET",
		});
		const audience = response.data.find((item) => item.id === id);

		return audience === undefined ? undefined : SidebarAudienceDTOToView(audience);
	} catch {
		return undefined;
	}
}
