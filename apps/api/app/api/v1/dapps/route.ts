import { getFilteredRows, getListQuery, getSortedRows } from "../../../../shared/api/list-query";
import { getPaginate } from "../../../../shared/api/pagination";
import { invalidQuery } from "../../../../shared/api/query-params";
import { success } from "../../../../shared/api/response";
import type { ExploreResource } from "../../../../shared/api/types";
import { GENERATED_ENTITY_COUNT } from "../../../../shared/config/fixtures";

const names = ["Uniswap", "OpenSea", "Aave", "Blur", "Lido", "Curve", "1inch", "Zerion", "Zapper", "Mirror"];
const avatarHashes = [
	"cb44db6f71d4a369fcc8632253735afb",
	"13dc38b7e837a16722c6c7b6a695fa46",
	"199f61e6ecd63f52024e2db2f37f1364",
];

/**
 * Creates the deterministic dapp directory.
 */
function getDapps(): ExploreResource[] {
	return Array.from({ length: GENERATED_ENTITY_COUNT }, (_, index) => {
		const name = names[index % names.length] ?? "Dapp";
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
 * Serves the generated dapp directory collection.
 */
export function GET(request: Request): Response {
	const query = getListQuery(request);
	if (query instanceof Response) return query;
	if (query.sort !== undefined && query.sort !== "name") return invalidQuery("Unsupported sort.");

	const filteredDapps = getFilteredRows(getDapps(), query.query, (dapp) => dapp.name);
	const sortedDapps = getSortedRows(filteredDapps, query.sort, query.order, (left, right) =>
		left.name.localeCompare(right.name)
	);
	const result = getPaginate(sortedDapps, query.pagination);

	return success(result.data, result.metadata);
}
