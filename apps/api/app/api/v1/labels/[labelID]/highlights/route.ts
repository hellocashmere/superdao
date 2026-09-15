import { failure, success } from "../../../../../../shared/api/response";
import type { RouteParams } from "../../../../../../shared/api/route-params";
import { routeID } from "../../../../../../shared/api/route-params";
import { LABEL_ENTITY_COUNT } from "../../../_fixtures/label";
import { createHighlights } from "../../../_fixtures/lib/create-highlights";

interface BalanceDistributionDatum {
	label: string | number;
	value: number;
}

interface LabelHighlightMetric {
	id: "activity" | "balance" | "email" | "influencers" | "nfts" | "twitter";
	title: string;
	value: number;
	description: string;
	footer_value: number;
	footer_label: string;
}

interface LabelHighlights {
	id: string;
	label_id: number;
	metrics: LabelHighlightMetric[];
	balance_distribution: BalanceDistributionDatum[];
}

/**
 * Serves generated label highlights.
 */
export async function GET(_request: Request, context: RouteParams<"labelID">): Promise<Response> {
	const id = await routeID(context.params, "labelID", "Invalid label id.");
	if (id instanceof Response) return id;

	const fixture = createHighlights(id, LABEL_ENTITY_COUNT);
	const highlights: LabelHighlights | undefined =
		fixture === undefined
			? undefined
			: {
					id: `label-highlight-${id}`,
					label_id: id,
					...fixture,
				};

	return highlights === undefined ? failure(404, "RESOURCE_NOT_FOUND", "Resource not found.") : success(highlights);
}
