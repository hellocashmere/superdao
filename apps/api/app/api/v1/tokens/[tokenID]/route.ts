import { parseID } from "../../../../../shared/api/query-params";
import { failure, success } from "../../../../../shared/api/response";
import type { RouteParams } from "../../../../../shared/api/route-params";
import { getToken } from "../../_fixtures/token";

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
 * Serves one generated token.
 */
export async function GET(_request: Request, context: RouteParams<"tokenID">): Promise<Response> {
	const { tokenID } = await context.params;
	const id = parseID(tokenID);
	if (id === null) return failure(400, "INVALID_QUERY", "Invalid token id.");

	const item: ExploreResource | undefined = getToken(id);

	return item === undefined ? failure(404, "RESOURCE_NOT_FOUND", "Token not found.") : success(item);
}
