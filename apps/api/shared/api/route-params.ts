import { invalidQuery, parseID } from "./query-params";

export interface RouteParams<Key extends string> {
	params: Promise<Record<Key, string>>;
}

/**
 * Reads a dynamic route parameter as a canonical positive numeric identifier.
 */
export async function routeID<Key extends string>(
	params: Promise<Record<Key, string>>,
	key: Key,
	message: string
): Promise<number | Response> {
	const values = await params;
	const value = values[key];
	const id = value === undefined ? null : parseID(value);
	return id === null ? invalidQuery(message) : id;
}
