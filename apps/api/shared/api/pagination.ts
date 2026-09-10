/**
 * Describes the requested offset-based page.
 */
export interface PaginationOptions {
	/**
	 * Maximum number of records returned in one page.
	 */
	limit: number;

	/**
	 * Zero-based position of the first record in the page.
	 */
	offset: number;
}

/**
 * Describes the position and size of a returned offset-based page.
 */
export interface PaginationMetadata {
	/**
	 * Offset for the next page, or null when the current page is the last one.
	 */
	next_offset: number | null;

	/**
	 * Offset used to retrieve the current page.
	 */
	offset: number;

	/**
	 * Number of records requested for the current page.
	 */
	page_size: number;

	/**
	 * Total number of records available before pagination.
	 */
	total: number;

	/**
	 * Total number of pages available for the requested page size.
	 */
	total_pages: number;
}

/**
 * Contains an offset-based page and metadata for requesting adjacent pages.
 */
export interface PaginationResult<Row> {
	/**
	 * Records included in the current page.
	 */
	data: Row[];

	/**
	 * Metadata that describes the current page and the next available offset.
	 */
	metadata: PaginationMetadata;
}

/**
 * Creates the agreed offset-pagination response metadata and page slice.
 */
export function getPaginate<Row extends object>(rows: readonly Row[], opts: PaginationOptions): PaginationResult<Row> {
	const offset = opts.offset;
	const limit = opts.limit;

	return {
		data: rows.slice(offset, offset + limit),
		metadata: {
			offset,
			page_size: limit,
			total: rows.length,
			total_pages: rows.length === 0 ? 0 : Math.ceil(rows.length / limit),
			next_offset: offset + limit < rows.length ? offset + limit : null,
		},
	};
}
