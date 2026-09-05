export function isMissingTokenWalletValue(value: string) {
  return value === "-" || value === "–" || value === "—";
}
