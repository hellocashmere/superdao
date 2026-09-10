import type { PaginationOptions } from "./pagination";
import { failure } from "./response";

/**
 * Parses a canonical positive integer resource identifier.
 */
export function parseID(value: string): number | null {
	if (!/^[1-9]\d*$/.test(value) || !Number.isSafeInteger(Number(value))) {
		return null;
	}

	return Number(value);
}

/**
 * Verifies that a request contains only keys supported by an endpoint.
 */
export function validateKeys(params: URLSearchParams, keys: readonly string[]): boolean {
	return [...params.keys()].every((key) => keys.includes(key));
}

/**
 * Reads a scalar query value while rejecting conflicting duplicate values.
 */
export function scalar(params: URLSearchParams, key: string): string | null | undefined {
	const values = params.getAll(key);

	if (values.length > 1 && new Set(values).size > 1) {
		return null;
	}

	return values[0];
}

/**
 * Parses strict offset pagination bounded to the public API limits.
 */
export function pagination(params: URLSearchParams): PaginationOptions | null {
	const limitValue = scalar(params, "limit");
	const offsetValue = scalar(params, "offset");
	const limit = limitValue === undefined ? NaN : Number(limitValue);
	const offset = offsetValue === undefined ? NaN : Number(offsetValue);

	if (!Number.isInteger(limit) || limit < 1 || limit > 100 || !Number.isInteger(offset) || offset < 0) {
		return null;
	}

	return { limit, offset };
}

/**
 * Creates the standardized invalid-query API response.
 */
export function invalidQuery(message = "Invalid query parameters."): Response {
	return failure(400, "INVALID_QUERY", message);
}

/**
 * Sorts fixture values stably and uses their numeric IDs to break ties.
 */
export function stableSort<Row extends { id: number | string }>(
	rows: readonly Row[],
	compare: (left: Row, right: Row) => number
): Row[] {
	return [...rows].sort((left, right) => {
		const IDComparison = Number(left.id) - Number(right.id);
		return compare(left, right) || IDComparison;
	});
}
