import { getAvatarUrl } from "../../../../shared/api/avatar-url";
import { GENERATED_ENTITY_COUNT } from "../../../../shared/config/fixtures";

import type { ExploreResourceFixture } from "./types/explore";

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

function create(index: number): ExploreResourceFixture {
	const title = names[index % names.length] ?? "Token";
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
 * Returns all deterministic token fixtures.
 */
export function getTokens(): ExploreResourceFixture[] {
	return Array.from({ length: GENERATED_ENTITY_COUNT }, (_, index) => create(index));
}

/**
 * Returns one deterministic token fixture by ID.
 */
export function getToken(id: number): ExploreResourceFixture | undefined {
	return Number.isInteger(id) && id >= 1 && id <= GENERATED_ENTITY_COUNT ? create(id - 1) : undefined;
}
