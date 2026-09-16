import { baseQuery } from "@/shared/api/tanstack";

import "server-only";

import { DappDTOToView } from "../lib/to-map";
import type { DappView } from "../model/types/types";

import type { DappDTO } from "./types/types";

/**
 * Loads one dapp for server-side consumers.
 *
 * Endpoint: `GET /dapps/:id`.
 */
export async function getDapp(id: number): Promise<DappView> {
	const response = await baseQuery<DappDTO>(`/dapps/${id}`, {
		method: "GET",
	});

	return DappDTOToView(response.data);
}
