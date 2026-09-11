import { failure, success } from "../../../../../../shared/api/response";
import type { RouteParams } from "../../../../../../shared/api/route-params";
import { routeID } from "../../../../../../shared/api/route-params";
import type { BalanceDistributionDatum, HighlightMetric } from "../../../../../../shared/api/types";
import { GENERATED_ENTITY_COUNT } from "../../../../../../shared/config/fixtures";

const metricSeeds = [
	["Active last 30d", 370, "Wallets made transactions", 3, "percent of all", "activity"],
	["Total balance", 208_200_000, "On Ethereum & Polygon", 694.7, "average", "balance"],
	["NFTs owned", 128_400_000, "Total", 95, "percent have 10+ NFTs", "nfts"],
	["Email", 3_928, "Contacts available", 4, "percent of all", "email"],
	["Twitter", 15_037, "Contacts available", 23, "percent of all", "twitter"],
	["Influencers", 29_203, "3000+ Twitter followers", 25, "percent of all", "influencers"],
] as const;

const distributionSeeds = [
	[10, 10_000],
	[100, 9_000],
	[1_000, 8_000],
	[10_000, 7_000],
	[100_000, 6_000],
	[1_000_000, 5_000],
	[10_000_000, 4_000],
	[100_000_000, 3_000],
	[1_000_000_000, 1_000],
] as const;

interface DappHighlights {
	id: string;
	dapp_id: number;
	metrics: HighlightMetric[];
	balance_distribution: BalanceDistributionDatum[];
}

/**
 * Creates generated highlights for one dapp.
 */
function getDappsHighlights(id: number): DappHighlights | undefined {
	if (id > GENERATED_ENTITY_COUNT) return undefined;

	return {
		id: `dapp-highlight-${id}`,
		dapp_id: id,
		metrics: metricSeeds.map(([title, value, description, footerValue, footerLabel, kind]) => ({
			title: title,
			value: value,
			description: description,
			footer_value: footerValue,
			footer_label: footerLabel,
			kind: kind,
		})),
		balance_distribution: distributionSeeds.map(([label, value]) => ({
			label: label,
			value: value,
		})),
	};
}

/**
 * Serves generated dapp highlights.
 */
export async function GET(_request: Request, context: RouteParams<"dappID">): Promise<Response> {
	const id = await routeID(context.params, "dappID", "Invalid dapp id.");
	if (id instanceof Response) return id;

	const highlights = getDappsHighlights(id);

	return highlights === undefined ? failure(404, "RESOURCE_NOT_FOUND", "Resource not found.") : success(highlights);
}
