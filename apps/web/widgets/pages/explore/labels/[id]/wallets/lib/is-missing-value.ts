/**
 * Checks whether a label wallet table value represents missing data.
 */
export function isMissingValue(value: string) {
  return value === "-" || value === "–" || value === "—";
}
