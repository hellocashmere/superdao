import type { PaginationOptions } from "./pagination";
import { invalidQuery, pagination, scalar, stableSort, validateKeys } from "./query-params";

const listQueryKeys = ["q", "limit", "offset", "sort", "order"] as const;

export type ListOrder = "asc" | "desc";

/**
 * Contains validated common query parameters for a collection endpoint.
 */
export interface ListQuery {
	query?: string;
	pagination: PaginationOptions;
	sort?: string;
	order?: ListOrder;
}

/**
 * Reads and validates query parameters shared by standard list endpoints.
 *
 * Both limit and offset are required.
 */
export function getListQuery(request: Request): ListQuery | Response {
	const params = new URL(request.url).searchParams;

	if (!validateKeys(params, listQueryKeys)) {
		return invalidQuery("Unsupported query parameter.");
	}

	const paginationOptions = pagination(params);
	const query = scalar(params, "q");
	const sort = scalar(params, "sort");
	const order = scalar(params, "order");

	if (paginationOptions === null || query === null || sort === null || order === null) {
		return invalidQuery();
	}

	if (order !== undefined && order !== "asc" && order !== "desc") {
		return invalidQuery("Unsupported order.");
	}

	return {
		query: query,
		pagination: paginationOptions,
		sort: sort,
		order: order,
	};
}

/**
 * Filters rows by a case-insensitive text query.
 */
export function getFilteredRows<Row>(
	rows: readonly Row[],
	query: string | undefined,
	getSearchValue: (row: Row) => string
): Row[] {
	const needle = query?.trim().toLowerCase();

	return rows.filter((row) => needle === undefined || getSearchValue(row).toLowerCase().includes(needle));
}

/**
 * Stably sorts rows when a sort parameter is present.
 */
export function getSortedRows<Row extends { id: number | string }>(
	rows: readonly Row[],
	sort: string | undefined,
	order: ListOrder | undefined,
	compare: (left: Row, right: Row) => number
): Row[] {
	if (sort === undefined) return [...rows];

	return stableSort(rows, (left, right) => {
		const direction = order === "desc" ? -1 : 1;
		return direction * compare(left, right);
	});
}
