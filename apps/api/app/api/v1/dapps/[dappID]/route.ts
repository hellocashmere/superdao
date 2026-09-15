import { parseID } from "../../../../../shared/api/query-params";
import { failure, success } from "../../../../../shared/api/response";
import type { RouteParams } from "../../../../../shared/api/route-params";
import { getDapp } from "../../_fixtures/dapp";

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
 * Serves one generated dapp.
 */
export async function GET(_request: Request, context: RouteParams<"dappID">): Promise<Response> {
	const { dappID } = await context.params;
	const id = parseID(dappID);
	if (id === null) return failure(400, "INVALID_QUERY", "Invalid dapp id.");

	const item: ExploreResource | undefined = getDapp(id);
	return item === undefined ? failure(404, "RESOURCE_NOT_FOUND", "Dapp not found.") : success(item);
}
