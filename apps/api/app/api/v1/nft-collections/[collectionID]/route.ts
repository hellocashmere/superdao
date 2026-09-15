import { parseID } from "../../../../../shared/api/query-params";
import { failure, success } from "../../../../../shared/api/response";
import type { RouteParams } from "../../../../../shared/api/route-params";
import { getNftCollection } from "../../_fixtures/nft-collection";

interface ExploreResource {
	id: number;
	slug: string;
	title: string;
	avatar: string;
	owners: number;
	active_wallets: number;
	supply: number;
	price: number;
	chain: "ethereum" | "polygon";
	wallet_count: number;
}

/**
 * Serves one generated NFT collection.
 */
export async function GET(_request: Request, context: RouteParams<"collectionID">): Promise<Response> {
	const { collectionID } = await context.params;
	const id = parseID(collectionID);
	if (id === null) return failure(400, "INVALID_QUERY", "Invalid NFT collection id.");
	const item: ExploreResource | undefined = getNftCollection(id);
	return item === undefined ? failure(404, "RESOURCE_NOT_FOUND", "NFT collection not found.") : success(item);
}
