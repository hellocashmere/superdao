import { getAvatarUrl } from "../../../../shared/api/avatar-url";
import { GENERATED_ENTITY_COUNT } from "../../../../shared/config/fixtures";

import type { ExploreResourceFixture } from "./types/explore";

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

function create(index: number): ExploreResourceFixture {
	const title = names[index % names.length] ?? "NFT collection";
	return {
		id: index + 1,
		slug: `${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${index + 1}`,
		title: title,
		avatar: getAvatarUrl(avatarHashes[index % avatarHashes.length] ?? ""),
		owners: 1_526 + index * 137,
		active_wallets: 1_200 + index * 113,
		supply: 17_500 + index * 251,
		price: (68 + (index % 10) * 71) / 100,
		chain: index % 3 === 1 ? "polygon" : "ethereum",
		wallet_count: 44_684 + index * 83,
	};
}

/**
 * Returns all deterministic NFT collection fixtures.
 */
export function getNftCollections(): ExploreResourceFixture[] {
	return Array.from({ length: GENERATED_ENTITY_COUNT }, (_, index) => create(index));
}

/**
 * Returns one deterministic NFT collection fixture by ID.
 */
export function getNftCollection(id: number): ExploreResourceFixture | undefined {
	return Number.isInteger(id) && id >= 1 && id <= GENERATED_ENTITY_COUNT ? create(id - 1) : undefined;
}
