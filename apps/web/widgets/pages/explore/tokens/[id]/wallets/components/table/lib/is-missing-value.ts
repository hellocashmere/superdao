/**
 * Checks whether a token wallet table value represents missing data.
 */
export function isMissingValue(value: number | string | null): value is null | "-" | "–" | "—" {
	return value === null || value === "-" || value === "–" || value === "—";
}
