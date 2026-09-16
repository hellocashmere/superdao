import type { AxiosRequestConfig } from "axios";
import axios from "axios";

import type { APIResponse } from "../types/response";

export const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

/**
 * Executes an API request and normalizes its payload to `APIResponse<T>`.
 *
 * The base URL is configured with `NEXT_PUBLIC_API_URL`.
 */
export async function baseQuery<T>(endpoint: string, options: AxiosRequestConfig = {}): Promise<APIResponse<T>> {
	if (!BASE_URL) {
		throw new Error("NEXT_PUBLIC_API_URL is not configured.");
	}

	const response = await axios.request<APIResponse<T>>({
		...options,
		baseURL: `${BASE_URL.replace(/\/$/, "")}/api/v1`,
		method: options.method ?? "GET",
		url: endpoint,
	});

	return response.data;
}

/**
 * Loads every page from an offset-paginated collection endpoint.
 */
export async function baseListQuery<T>(
	endpoint: string,
	options: AxiosRequestConfig = {}
): Promise<APIResponse<readonly T[]>> {
	const items: T[] = [];
	let offset: number | null = 0;
	let metadata: APIResponse<readonly T[]>["metadata"];

	while (offset !== null) {
		const response: APIResponse<readonly T[]> = await baseQuery<readonly T[]>(endpoint, {
			...options,
			params: {
				...options.params,
				limit: 100,
				offset: offset,
			},
		});

		items.push(...response.data);
		metadata ??= response.metadata;
		offset = response.metadata?.next_offset ?? null;
	}

	return metadata === undefined ? { data: items } : { data: items, metadata };
}
