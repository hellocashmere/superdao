import { getAvatarUrl } from "../../../../../shared/api/avatar-url";
import { parseID } from "../../../../../shared/api/query-params";
import { failure, success } from "../../../../../shared/api/response";
import type { RouteParams } from "../../../../../shared/api/route-params";
import type { ExploreResource } from "../../../../../shared/api/types";
import { GENERATED_ENTITY_COUNT } from "../../../../../shared/config/fixtures";

const names = ["Uniswap", "OpenSea", "Aave", "Blur", "Lido", "Curve", "1inch", "Zerion", "Zapper", "Mirror"];

const avatarHashes = [
	"cb44db6f71d4a369fcc8632253735afb",
	"13dc38b7e837a16722c6c7b6a695fa46",
	"199f61e6ecd63f52024e2db2f37f1364",
];

/**
 * Creates one deterministic dapp by its id.
 */
function getDapp(id: number): ExploreResource | undefined {
	return Array.from({ length: GENERATED_ENTITY_COUNT }, (_, index): ExploreResource => {
		const name = names[index % names.length] ?? "Dapp";
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
 * Serves one generated dapp.
 */
export async function GET(_request: Request, context: RouteParams<"dappID">): Promise<Response> {
	const { dappID } = await context.params;
	const id = parseID(dappID);
	if (id === null) return failure(400, "INVALID_QUERY", "Invalid dapp id.");
	const item = getDapp(id);
	return item === undefined ? failure(404, "RESOURCE_NOT_FOUND", "Dapp not found.") : success(item);
}
