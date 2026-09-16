/**
 * Parses a canonical positive safe integer route segment.
 */
export function parseRouteID(segment: string): number | undefined {
	if (!/^[1-9]\d*$/.test(segment)) return undefined;

	const id = Number(segment);
	return Number.isSafeInteger(id) ? id : undefined;
}
