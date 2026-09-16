import { baseQuery } from "@/shared/api/tanstack";

import "server-only";

import { TokenDTOToView } from "../lib/to-map";
import type { TokenView } from "../model/types/types";

import type { TokenDTO } from "./types/types";

/**
 * Loads one token for server-side consumers.
 *
 * Endpoint: `GET /tokens/:id`.
 */
export async function getToken(id: number): Promise<TokenView> {
	const response = await baseQuery<TokenDTO>(`/tokens/${id}`, {
		method: "GET",
	});

	return TokenDTOToView(response.data);
}
