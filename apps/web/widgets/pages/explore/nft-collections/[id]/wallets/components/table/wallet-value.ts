export function isMissingCollectionWalletValue(value: string) {
  return value === "-" || value === "–" || value === "—";
}
