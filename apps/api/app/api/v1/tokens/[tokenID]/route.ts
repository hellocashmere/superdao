import { getAvatarUrl } from "../../../../../shared/api/avatar-url";
import { parseID } from "../../../../../shared/api/query-params";
import { failure, success } from "../../../../../shared/api/response";
import type { RouteParams } from "../../../../../shared/api/route-params";
import type { ExploreResource } from "../../../../../shared/api/types";
import { GENERATED_ENTITY_COUNT } from "../../../../../shared/config/fixtures";

const names = [
	"Ethereum",
	"USD Coin",
	"Tether",
	"Dai",
	"Wrapped Ether",
	"ApeCoin",
	"Uniswap",
	"Chainlink",
	"Polygon",
	"Lido DAO",
];

const avatarHashes = [
	"199f61e6ecd63f52024e2db2f37f1364",
	"25e31f4e1df7b5c0376e9d3c12aae2cd",
	"b52d052299464663127e357ee72393e6",
];

/**
 * Creates one deterministic token by its id.
 */
function getToken(id: number): ExploreResource | undefined {
	return Array.from({ length: GENERATED_ENTITY_COUNT }, (_, index): ExploreResource => {
		const name = names[index % names.length] ?? "Token";
		const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
		return {
			id: index + 1,
			slug: `${slug}-${index + 1}`,
			name: name,
			avatar: getAvatarUrl(avatarHashes[index % avatarHashes.length]),
			owners: 1_526 + index * 137,
			active_wallets: 1_200 + index * 113,
			supply: 17_500 + index * 251,
			price: (68 + (index % 10) * 71) / 100,
			chain: index % 3 === 1 ? "polygon" : "ethereum",
			wallet_count: 44_684 + index * 83,
		};
	}).find((item) => item.id === id);
}

/**
 * Serves one generated token.
 */
export async function GET(_request: Request, context: RouteParams<"tokenID">): Promise<Response> {
	const { tokenID } = await context.params;
	const id = parseID(tokenID);
	if (id === null) return failure(400, "INVALID_QUERY", "Invalid token id.");
	const item = getToken(id);
	return item === undefined ? failure(404, "RESOURCE_NOT_FOUND", "Token not found.") : success(item);
}
