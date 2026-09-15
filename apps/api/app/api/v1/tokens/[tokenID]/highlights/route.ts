import { failure, success } from "../../../../../../shared/api/response";
import type { RouteParams } from "../../../../../../shared/api/route-params";
import { routeID } from "../../../../../../shared/api/route-params";
import { GENERATED_ENTITY_COUNT } from "../../../../../../shared/config/fixtures";
import { createHighlights } from "../../../_fixtures/lib/create-highlights";

interface BalanceDistributionDatum {
	label: string | number;
	value: number;
}

interface HighlightMetric {
	title: string;
	value: number;
	description: string;
	footer_value: number;
	footer_label: string;
	id: "activity" | "balance" | "email" | "influencers" | "nfts" | "twitter";
	info?: string;
}

interface TokenHighlights {
	id: string;
	token_id: number;
	metrics: HighlightMetric[];
	balance_distribution: BalanceDistributionDatum[];
}

/**
 * Serves generated token highlights.
 */
export async function GET(_request: Request, context: RouteParams<"tokenID">): Promise<Response> {
	const id = await routeID(context.params, "tokenID", "Invalid token id.");
	if (id instanceof Response) return id;

	const fixture = createHighlights(id, GENERATED_ENTITY_COUNT);
	const highlights: TokenHighlights | undefined =
		fixture === undefined
			? undefined
			: {
					id: `token-highlight-${id}`,
					token_id: id,
					...fixture,
				};

	return highlights === undefined ? failure(404, "RESOURCE_NOT_FOUND", "Resource not found.") : success(highlights);
}
