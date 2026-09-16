/**
 * Checks whether a label wallet value represents missing table data.
 */
export function isMissingValue(value: number | string | null): value is null | "-" | "–" | "—" {
	return value === null || value === "-" || value === "–" || value === "—";
}
