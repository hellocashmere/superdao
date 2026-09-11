import { getAvatarUrl } from "../../../../../shared/api/avatar-url";
import { parseID } from "../../../../../shared/api/query-params";
import { failure, success } from "../../../../../shared/api/response";
import type { RouteParams } from "../../../../../shared/api/route-params";
import type { ExploreResource } from "../../../../../shared/api/types";
import { GENERATED_ENTITY_COUNT } from "../../../../../shared/config/fixtures";

const names = [
	"Wrapped Cryptopunks",
	"MetaZellys ETH",
	"Milady Maker",
	"MutantApeYachtClub",
	"Otherdeed",
	"Nakamigos",
	"Otherside Vessels",
	"Bored Ape Yacht Club",
	"Captainz",
	"Azuki",
];

const avatarHashes = [
	"13dc38b7e837a16722c6c7b6a695fa46",
	"b52d052299464663127e357ee72393e6",
	"0d285ad92806c93fcc7d680188a0c6e8",
];

/**
 * Creates one deterministic NFT collection by its id.
 */
function getNftCollection(id: number): ExploreResource | undefined {
	return Array.from({ length: GENERATED_ENTITY_COUNT }, (_, index): ExploreResource => {
		const name = names[index % names.length] ?? "NftCollection";
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
 * Serves one generated NFT collection.
 */
export async function GET(_request: Request, context: RouteParams<"collectionID">): Promise<Response> {
	const { collectionID } = await context.params;
	const id = parseID(collectionID);
	if (id === null) return failure(400, "INVALID_QUERY", "Invalid NFT collection id.");
	const item = getNftCollection(id);
	return item === undefined ? failure(404, "RESOURCE_NOT_FOUND", "NFT collection not found.") : success(item);
}
