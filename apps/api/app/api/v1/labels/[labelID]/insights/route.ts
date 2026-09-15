import { failure, success } from "../../../../../../shared/api/response";
import type { RouteParams } from "../../../../../../shared/api/route-params";
import { routeID } from "../../../../../../shared/api/route-params";
import { LABEL_ENTITY_COUNT } from "../../../_fixtures/label";
import { createInsights } from "../../../_fixtures/lib/create-insights";
import type { InsightsFixture } from "../../../_fixtures/types/insights";

interface LabelInsights extends InsightsFixture {
	id: string;
	label_id: number;
}

/**
 * Serves generated label analytics.
 */
export async function GET(_request: Request, context: RouteParams<"labelID">): Promise<Response> {
	const id = await routeID(context.params, "labelID", "Invalid label id.");
	if (id instanceof Response) return id;

	const fixture = createInsights(id, LABEL_ENTITY_COUNT);
	const insights: LabelInsights | undefined =
		fixture === undefined
			? undefined
			: {
					id: `label-insight-${id}`,
					label_id: id,
					...fixture,
				};

	return insights === undefined ? failure(404, "RESOURCE_NOT_FOUND", "Resource not found.") : success(insights);
}
