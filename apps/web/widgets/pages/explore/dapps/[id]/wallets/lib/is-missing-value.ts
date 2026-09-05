/**
 * Checks whether a dapp wallet table value represents missing data.
 */
export function isMissingValue(value: string) {
  return value === "-" || value === "–" || value === "—";
}
