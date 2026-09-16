import { baseQuery } from "@/shared/api/tanstack";

import "server-only";

import { WalletDetailsDTOToPreviewView } from "../lib/to-map";
import type { WalletPreviewView } from "../model/types/types";

import type { WalletDetailsDTO } from "./types/types";

/**
 * Loads a wallet by its numeric ID for server-side consumers.
 *
 * Endpoint: `GET /wallets/:id`.
 */
export async function getWalletByID(id: number): Promise<WalletPreviewView> {
	const response = await baseQuery<WalletDetailsDTO>(`/wallets/${id}`, {
		method: "GET",
	});

	return WalletDetailsDTOToPreviewView(response.data);
}
