import { invalidQuery, scalar, validateKeys } from "../../../../shared/api/query-params";
import { success } from "../../../../shared/api/response";

const avatarHashes = [
	"0d285ad92806c93fcc7d680188a0c6e8",
	"8011097d544d3394192a4931205299aa",
	"8553af2b045a6752c135140a88835e32",
];

const seeds = [
	["CryptoKitties", "NFT collection", "/explore/nft-collections", "nft-collection"],
	["cryptoboss.eth", "Wallet", "/explore/wallets/6", "wallet"],
	["cashmere.ton", "Wallet", "/explore/wallets/1", "wallet"],
	["Wrapped Cryptopunks", "NFT collection", "/explore/nft-collections/1/wallets", "nft-collection"],
	["Token investor", "Label", "/explore/labels/14/wallets", "label"],
	["Ethereum", "Token", "/explore/tokens/1/wallets", "token"],
	["Uniswap", "Dapp", "/explore/dapps/1/wallets", "dapp"],
] as const;

interface SearchResult {
	id: string;
	name: string;
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
	return seeds.map(([name, type, href, targetKind], index) => ({
		id: `search-${index + 1}`,
		name: name,
		type: type,
		href: href,
		target_id: index + 1,
		target_kind: targetKind,
		avatar_src: `/avatars/${avatarHashes[index % avatarHashes.length]}.png`,
	}));
}

/**
 * Serves generated search results filtered by query or IDs.
 */
export function GET(request: Request): Response {
	const params = new URL(request.url).searchParams;
	if (!validateKeys(params, ["q", "type", "ids"])) return invalidQuery("Unsupported query parameter.");
	const q = scalar(params, "q");
	const IDs = scalar(params, "ids");
	if (q === null || IDs === null || (q === undefined && IDs === undefined) || (q !== undefined && IDs !== undefined)) {
		return invalidQuery("Provide exactly one of q or ids.");
	}
	const results = getSearchResults();
	if (IDs !== undefined) {
		const requestedIDs = IDs.split(",").map((id) => id.trim());
		return success(requestedIDs.flatMap((id) => results.filter((result) => result.id === id)));
	}
	const needle = q?.trim().toLowerCase() ?? "";
	const types = params.getAll("type").map((type) => type.toLowerCase());
	return success(
		results.filter(
			(result) =>
				`${result.name} ${result.type}`.toLowerCase().includes(needle) &&
				(types.length === 0 || types.includes(result.type.toLowerCase()))
		)
	);
}
