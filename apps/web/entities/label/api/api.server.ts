import { baseQuery } from "@/shared/api/tanstack";

import "server-only";

import { LabelDTOToView } from "../lib/to-map";
import type { LabelView } from "../model/types/types";

import type { LabelDTO } from "./types/types";

/**
 * Loads a label by its backend-provided ID for server-side consumers.
 *
 * Endpoint: `GET /labels/:id`.
 */
export async function getLabelDetails(id: number): Promise<LabelView> {
	const response = await baseQuery<LabelDTO>(`/labels/${id}`, {
		method: "GET",
	});

	return LabelDTOToView(response.data);
}
