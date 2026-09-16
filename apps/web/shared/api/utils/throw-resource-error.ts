import { notFound } from "next/navigation";

import { isNotFoundError } from "./is-not-found-error";

/**
 * Renders the route not-found boundary for HTTP 404s and rethrows every other failure.
 */
export function throwResourceError(error: unknown): never {
	if (isNotFoundError(error)) {
		notFound();
	}

	throw error;
}
