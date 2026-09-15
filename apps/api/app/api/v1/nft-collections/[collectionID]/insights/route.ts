import { failure, success } from "../../../../../../shared/api/response";
import type { RouteParams } from "../../../../../../shared/api/route-params";
import { routeID } from "../../../../../../shared/api/route-params";
import { GENERATED_ENTITY_COUNT } from "../../../../../../shared/config/fixtures";
import { createInsights } from "../../../_fixtures/lib/create-insights";
import type { InsightsFixture } from "../../../_fixtures/types/insights";

interface NftCollectionInsights extends InsightsFixture {
	id: string;
	nft_collection_id: number;
}

/**
 * Serves generated NFT collection analytics.
 */
export async function GET(_request: Request, context: RouteParams<"collectionID">): Promise<Response> {
	const id = await routeID(context.params, "collectionID", "Invalid NFT collection id.");
	if (id instanceof Response) return id;

	const fixture = createInsights(id, GENERATED_ENTITY_COUNT);
	const insights: NftCollectionInsights | undefined =
		fixture === undefined
			? undefined
			: {
					id: `NFT-collection-insight-${id}`,
					nft_collection_id: id,
					...fixture,
				};

	return insights === undefined ? failure(404, "RESOURCE_NOT_FOUND", "Resource not found.") : success(insights);
}
