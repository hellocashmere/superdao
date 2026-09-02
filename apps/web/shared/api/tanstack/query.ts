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

  const response = await axios.request<T>({
    ...options,
    baseURL: BASE_URL,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    method: options.method ?? "GET",
    url: endpoint,
  });

  return {
    data: response.data,
  };
}
