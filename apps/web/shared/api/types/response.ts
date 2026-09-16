/**
 * Normalized response returned by the shared API client.
 */
export interface APIResponse<T> {
	/**
	 * Payload returned by the requested endpoint.
	 */
	data: T;

	/**
	 * Optional metadata returned by collection endpoints.
	 */
	metadata?: APIPaginationMetadata;
}

/**
 * Offset pagination metadata returned by API collection endpoints.
 */
export interface APIPaginationMetadata {
	/**
	 * Offset of the next page, or `null` when the current page is the last one.
	 */
	next_offset: number | null;

	/**
	 * Zero-based offset of the current page within the full collection.
	 */
	offset: number;

	/**
	 * Maximum number of records included in the current page.
	 */
	page_size: number;

	/**
	 * Total number of records available across all pages.
	 */
	total: number;

	/**
	 * Total number of pages available for the current page size.
	 */
	total_pages: number;
}
