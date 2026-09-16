/**
 * API pagination parameters shared by list endpoints.
 */
export interface PaginationQuery {
	limit?: number;
	offset?: number;
}

/**
 * A page of API entities.
 */
/**
 * Accumulated data returned by an infinite query.
 */
export interface InfiniteView<T> {
	hasMore: boolean;
	items: readonly T[];
}
