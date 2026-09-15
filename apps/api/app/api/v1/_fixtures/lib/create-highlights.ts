import type { HighlightsFixture } from "../types/highlights";

const metricSeeds = [
	["Active last 30d", 370, "Wallets made transactions", 3, "percent of all", "activity"],
	["Total balance", 208_200_000, "On Ethereum & Polygon", 694.7, "average", "balance"],
	["NFTs owned", 128_400_000, "Total", 95, "percent have 10+ NFTs", "nfts"],
	["Email", 3_928, "Contacts available", 4, "percent of all", "email"],
	["Twitter", 15_037, "Contacts available", 23, "percent of all", "twitter"],
	["Influencers", 29_203, "3000+ Twitter followers", 25, "percent of all", "influencers"],
] as const;
const distributionSeeds = [
	["<100", 10_000],
	["100-1000", 6_000],
	["1k-10k", 3_000],
	["10k+", 1_000],
] as const;

/**
 * Creates the shared deterministic highlights payload for a valid resource ID.
 */
export function createHighlights(id: number, resourceCount: number): HighlightsFixture | undefined {
	if (id > resourceCount) return undefined;

	return {
		metrics: metricSeeds.map(([title, value, description, footerValue, footerLabel, metricID]) => ({
			title: title,
			value: value,
			description: description,
			footer_value: footerValue,
			footer_label: footerLabel,
			id: metricID,
		})),
		balance_distribution: distributionSeeds.map(([label, value]) => ({ label, value })),
	};
}
