import { getAvatarUrl } from "../../../../shared/api/avatar-url";
import { getFilteredRows, getListQuery } from "../../../../shared/api/list-query";
import { invalidQuery } from "../../../../shared/api/query-params";
import { success } from "../../../../shared/api/response";
import { DEMO_PROFILE } from "../../../../shared/config/demo-profile";

const avatarHashes = [
	"0d285ad92806c93fcc7d680188a0c6e8",
	"8011097d544d3394192a4931205299aa",
	"8553af2b045a6752c135140a88835e32",
];
const fallbackAvatarHash = "0d285ad92806c93fcc7d680188a0c6e8";

const seeds = [
	["CryptoKitties", "NFT collection", "/explore/nft-collections/1/wallets", "nft-collection", 1],
	["cryptoboss.eth", "Wallet", "/explore/wallets/6", "wallet", 6],
	[DEMO_PROFILE.title, "Wallet", "/explore/wallets/1", "wallet", 1],
	["Wrapped Cryptopunks", "NFT collection", "/explore/nft-collections/1/wallets", "nft-collection", 1],
	["Token investor", "Label", "/explore/labels/14/wallets", "label", 14],
	["Ethereum", "Token", "/explore/tokens/1/wallets", "token", 1],
	["Uniswap", "Dapp", "/explore/dapps/1/wallets", "dapp", 1],
] as const;

interface SearchResult {
	id: string;
	title: string;
	type: string;
	href: string;
	target_id?: number;
	target_kind?: "dapp" | "label" | "nft-collection" | "token" | "wallet";
	avatar_src?: string;
	glyph?: "audience" | "label" | "music";
}

/**
 * Creates deterministic global search results.
 */
function getSearchResults(): SearchResult[] {
	return seeds.map(([title, type, href, targetKind, targetID], index) => ({
		id: `search-${index + 1}`,
		title: title,
		type: type,
		href: href,
		target_id: targetID,
		target_kind: targetKind,
		avatar_src:
			targetKind === "wallet" && targetID === 1
				? DEMO_PROFILE.avatar
				: getAvatarUrl(avatarHashes[index % avatarHashes.length] ?? fallbackAvatarHash),
	}));
}

/**
 * Serves generated search results filtered by query or IDs.
 */
export function GET(request: Request): Response {
	const query = getListQuery(request, { defaultLimit: 16, keys: ["q", "ids"], repeatedKeys: ["type"] });
	if (query instanceof Response) return query;
	const ids = query.values.ids;
	if ((query.query === undefined && ids === undefined) || (query.query !== undefined && ids !== undefined)) {
		return invalidQuery("Provide exactly one of q or ids.");
	}
	const results = getSearchResults();
	if (ids !== undefined) {
		const requestedIDs = ids
			.split(",")
			.map((id) => id.trim())
			.filter(Boolean);
		return success(requestedIDs.flatMap((id) => results.filter((result) => result.id === id)));
	}
	const types = (query.repeated.type ?? []).map((type) => type.toLowerCase());
	const filteredResults = getFilteredRows(results, query.query, (result) => `${result.title} ${result.type}`);
	return success(filteredResults.filter((result) => types.length === 0 || types.includes(result.type.toLowerCase())));
}
