import type { PaginationOptions } from "./pagination";
import { invalidQuery, pagination, scalar, stableSort, validateKeys } from "./query-params";

export type ListOrder = "asc" | "desc";

/**
 * Contains validated common query parameters for a collection endpoint.
 */
export interface ListQuery {
	query?: string;
	pagination: PaginationOptions;
	sort?: string;
	order?: ListOrder;
	/** Repeated values accepted by this endpoint (for example audience labels). */
	repeated: Record<string, string[]>;
	/** Additional endpoint-specific scalar values validated for duplicate conflicts. */
	values: Record<string, string | undefined>;
}

export interface ListQueryOptions {
	defaultLimit: number;
	keys?: readonly string[];
	repeatedKeys?: readonly string[];
}

/**
 * Reads and validates query parameters shared by standard list endpoints.
 *
 * Missing pagination values use the directory defaults.
 */
export function getListQuery(request: Request, options: ListQueryOptions = { defaultLimit: 16 }): ListQuery | Response {
	const params = new URL(request.url).searchParams;
	const keys = options.keys ?? ["q", "limit", "offset", "sort", "order"];
	const allowedKeys = [...new Set([...keys, ...(options.repeatedKeys ?? [])])];

	if (!validateKeys(params, allowedKeys)) {
		return invalidQuery("Unsupported query parameter.");
	}

	const paginationOptions = pagination(params, options.defaultLimit);
	const query = scalar(params, "q");
	const sort = scalar(params, "sort");
	const order = scalar(params, "order");

	if (paginationOptions === null || query === null || sort === null || order === null) {
		return invalidQuery();
	}

	if (order !== undefined && order !== "asc" && order !== "desc") {
		return invalidQuery("Unsupported order.");
	}

	const repeated: Record<string, string[]> = {};
	for (const key of options.repeatedKeys ?? []) repeated[key] = params.getAll(key);
	const values: Record<string, string | undefined> = {};
	for (const key of keys) {
		if (["q", "limit", "offset", "sort", "order"].includes(key)) continue;
		const value = scalar(params, key);
		if (value === null) return invalidQuery();
		values[key] = value;
	}

	return {
		query: query,
		pagination: paginationOptions,
		sort: sort,
		order: order,
		repeated,
		values,
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
