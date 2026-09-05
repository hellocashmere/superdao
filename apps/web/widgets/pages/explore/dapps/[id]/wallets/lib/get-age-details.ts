import { isMissingValue } from "./is-missing-value";

/**
 * Expands compact wallet age into a human-readable description.
 */
export function getAgeDetails(value: string) {
  if (isMissingValue(value)) return "Age unavailable";

  const yearsMatch = value.match(/^(\d+)(?:\.(\d+))?y$/);

  if (yearsMatch) {
    const years = Number(yearsMatch[1]);
    const months = yearsMatch[2] ? Math.round(Number(`0.${yearsMatch[2]}`) * 12) : 0;
    const yearLabel = `${years} ${years === 1 ? "year" : "years"}`;

    return months > 0 ? `${yearLabel}, ${months} ${months === 1 ? "month" : "months"}` : yearLabel;
  }

  const daysMatch = value.match(/^(\d+)d$/);

  if (daysMatch) {
    const days = Number(daysMatch[1]);
    return `${days} ${days === 1 ? "day" : "days"} since first activity`;
  }

  return `Wallet age: ${value}`;
}
