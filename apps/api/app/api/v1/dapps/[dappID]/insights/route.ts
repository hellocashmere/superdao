import { failure, success } from "../../../../../../shared/api/response";
import type { RouteParams } from "../../../../../../shared/api/route-params";
import { routeID } from "../../../../../../shared/api/route-params";
import { GENERATED_ENTITY_COUNT } from "../../../../../../shared/config/fixtures";
import { createInsights } from "../../../_fixtures/lib/create-insights";
import type { InsightsFixture } from "../../../_fixtures/types/insights";

interface DappInsights extends InsightsFixture {
	id: string;
	dapp_id: number;
}

/**
 * Serves generated dapp analytics.
 */
export async function GET(_request: Request, context: RouteParams<"dappID">): Promise<Response> {
	const id = await routeID(context.params, "dappID", "Invalid dapp id.");
	if (id instanceof Response) return id;

	const fixture = createInsights(id, GENERATED_ENTITY_COUNT);
	const insights: DappInsights | undefined =
		fixture === undefined
			? undefined
			: {
					id: `dapp-insight-${id}`,
					dapp_id: id,
					...fixture,
				};

	return insights === undefined ? failure(404, "RESOURCE_NOT_FOUND", "Resource not found.") : success(insights);
}
