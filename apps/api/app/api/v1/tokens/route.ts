import { getPaginate } from "../../../../shared/api/pagination";
import { invalidQuery, pagination, scalar, stableSort, validateKeys } from "../../../../shared/api/query-params";
import { success } from "../../../../shared/api/response";
import type { ExploreResource } from "../../../../shared/api/types";
import { GENERATED_ENTITY_COUNT } from "../../../../shared/config/fixtures";

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
 * Creates the deterministic token directory.
 */
function getTokens(): ExploreResource[] {
	return Array.from({ length: GENERATED_ENTITY_COUNT }, (_, index) => {
		const name = names[index % names.length] ?? "Token";
		const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
		return {
			id: index + 1,
			slug: `${slug}-${index + 1}`,
			name: name,
			avatar: `/avatars/${avatarHashes[index % avatarHashes.length]}.png`,
			owners: `${1526 + index * 137}`,
			active_wallets: `${1200 + index * 113}`,
			supply: `${17500 + index * 251}`,
			price: (0.68 + (index % 10) * 0.71).toFixed(2),
			chain: index % 3 === 1 ? "polygon" : "ethereum",
			wallet_count: `${44684 + index * 83}`,
		};
	});
}

/**
 * Serves the generated token directory collection.
 */
export function GET(request: Request): Response {
	const params = new URL(request.url).searchParams;
	if (!validateKeys(params, ["q", "limit", "offset", "sort", "order"]))
		return invalidQuery("Unsupported query parameter.");
	const limitOffset = pagination(params);
	const q = scalar(params, "q");
	const sort = scalar(params, "sort");
	const order = scalar(params, "order");
	if (limitOffset === null || [q, sort, order].includes(null)) return invalidQuery("Invalid query parameters.");
	if (sort !== undefined && sort !== "name") return invalidQuery("Unsupported sort.");
	if (order !== undefined && order !== "asc" && order !== "desc") return invalidQuery("Unsupported order.");
	const needle = q?.trim().toLowerCase();
	let tokens = getTokens().filter((token) => needle === undefined || token.name.toLowerCase().includes(needle));
	if (sort !== undefined)
		tokens = stableSort(tokens, (left, right) => (order === "desc" ? -1 : 1) * left.name.localeCompare(right.name));
	const result = getPaginate(tokens, limitOffset);
	return success(result.data, result.metadata);
}
