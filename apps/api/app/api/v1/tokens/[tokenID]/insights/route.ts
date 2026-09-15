import { failure, success } from "../../../../../../shared/api/response";
import type { RouteParams } from "../../../../../../shared/api/route-params";
import { routeID } from "../../../../../../shared/api/route-params";
import { GENERATED_ENTITY_COUNT } from "../../../../../../shared/config/fixtures";
import { createInsights } from "../../../_fixtures/lib/create-insights";
import type { InsightsFixture } from "../../../_fixtures/types/insights";

interface TokenInsights extends InsightsFixture {
	id: string;
	token_id: number;
}

/**
 * Serves generated token analytics.
 */
export async function GET(_request: Request, context: RouteParams<"tokenID">): Promise<Response> {
	const id = await routeID(context.params, "tokenID", "Invalid token id.");
	if (id instanceof Response) return id;

	const fixture = createInsights(id, GENERATED_ENTITY_COUNT);
	const insights: TokenInsights | undefined =
		fixture === undefined
			? undefined
			: {
					id: `token-insight-${id}`,
					token_id: id,
					...fixture,
				};

	return insights === undefined ? failure(404, "RESOURCE_NOT_FOUND", "Resource not found.") : success(insights);
}
