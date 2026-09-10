import { failure, success } from "../../../../../../shared/api/response";
import type { RouteParams } from "../../../../../../shared/api/route-params";
import { routeID } from "../../../../../../shared/api/route-params";
import type { BalanceDistributionDatum, HighlightMetric } from "../../../../../../shared/api/types";
import { GENERATED_ENTITY_COUNT } from "../../../../../../shared/config/fixtures";

const metricSeeds = [
	["Active last 30d", "370", "Wallets made transactions", "3%", "of all", "activity"],
	["Total balance", "$ 208.2 M", "On Ethereum & Polygon", "$694.7", "average", "balance"],
	["NFTs owned", "128.4 M", "Total", "95%", "have 10+ NFTs", "nfts"],
	["Email", "3 928", "Contacts available", "4%", "of all", "email"],
	["Twitter", "15 037", "Contacts available", "23%", "of all", "twitter"],
	["Influencers", "29 203", "3k+ Twitter followers", "25%", "of all", "influencers"],
] as const;

const distributionSeeds = [
	[10, 10000],
	[100, 9000],
	[1000, 8000],
	[10000, 7000],
	[100000, 6000],
	[1000000, 5000],
	[10000000, 4000],
	[100000000, 3000],
	[1000000000, 1000],
] as const;

interface LabelHighlights {
	id: string;
	label_id: number;
	metrics: HighlightMetric[];
	balance_distribution: BalanceDistributionDatum[];
}

/**
 * Creates generated highlights for one label.
 */
function getLabelsHighlights(id: number): LabelHighlights | undefined {
	if (id > GENERATED_ENTITY_COUNT) return undefined;

	return {
		id: `label-highlight-${id}`,
		label_id: id,
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
 * Serves generated label highlights.
 */
export async function GET(_request: Request, context: RouteParams<"labelID">): Promise<Response> {
	const id = await routeID(context.params, "labelID", "Invalid label id.");
	if (id instanceof Response) return id;
	const highlights = getLabelsHighlights(id);
	return highlights === undefined ? failure(404, "RESOURCE_NOT_FOUND", "Resource not found.") : success(highlights);
}
