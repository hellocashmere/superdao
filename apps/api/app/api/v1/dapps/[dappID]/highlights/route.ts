import { failure, success } from "../../../../../../shared/api/response";
import type { RouteParams } from "../../../../../../shared/api/route-params";
import { routeID } from "../../../../../../shared/api/route-params";
import { GENERATED_ENTITY_COUNT } from "../../../../../../shared/config/fixtures";
import { createHighlights } from "../../../_fixtures/lib/create-highlights";

interface BalanceDistributionDatum {
	label: string | number;
	value: number;
}

interface DappHighlightMetric {
	id: "activity" | "balance" | "email" | "influencers" | "nfts" | "twitter";
	title: string;
	value: number;
	description: string;
	footer_value: number;
	footer_label: string;
}

interface DappHighlights {
	id: string;
	dapp_id: number;
	metrics: DappHighlightMetric[];
	balance_distribution: BalanceDistributionDatum[];
}

/**
 * Serves generated dapp highlights.
 */
export async function GET(_request: Request, context: RouteParams<"dappID">): Promise<Response> {
	const id = await routeID(context.params, "dappID", "Invalid dapp id.");
	if (id instanceof Response) return id;

	const fixture = createHighlights(id, GENERATED_ENTITY_COUNT);
	const highlights: DappHighlights | undefined =
		fixture === undefined
			? undefined
			: {
					id: `dapp-highlight-${id}`,
					dapp_id: id,
					...fixture,
				};

	return highlights === undefined ? failure(404, "RESOURCE_NOT_FOUND", "Resource not found.") : success(highlights);
}
