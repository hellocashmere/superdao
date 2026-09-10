import { parseID } from "../../../../../shared/api/query-params";
import { failure, success } from "../../../../../shared/api/response";
import type { RouteParams } from "../../../../../shared/api/route-params";
import { GENERATED_ENTITY_COUNT } from "../../../../../shared/config/fixtures";

const names = [
	"cashmere.ton",
	"vitalik.eth",
	"0x959...4A35",
	"punk6529.eth",
	"cryptoboss.eth",
	"daoist.eth",
	"builder.eth",
];

const avatarHashes = [
	"13f789cec096eaa9226cb1759fc74954",
	"190842423a18e1e6e14e3cc9e06bf656",
	"1f79e197d628f529836a2ddd3d4c93d5",
];

interface Wallet {
	id: number;
	name: string;
	avatar: string;
	ids: string[];
	superrank: number;
	last_updated: string;
	bio_tooltip: string;
	bio: Array<{ id: string; type: "text"; value: string }>;
	stats: Array<{ id: string; label: string; value: string }>;
}

/**
 * Creates one deterministic wallet with overview data.
 */
function getWallet(id: number): Wallet | undefined {
	if (id > GENERATED_ENTITY_COUNT) return undefined;
	const name = names[(id - 1) % names.length] ?? `wallet-${id}.eth`;
	return {
		id: id,
		name: name,
		avatar: `/avatars/${avatarHashes[(id - 1) % avatarHashes.length]}.png`,
		ids: [name],
		superrank: 92 - ((id - 1) % 20),
		last_updated: "Apr 18",
		bio_tooltip: "May be outdated",
		bio: Array.from({ length: 2 }, (_, index) => ({
			id: `bio-${index}`,
			type: "text",
			value: index === 0 ? "Crypto native and onchain explorer. " : "Building communities.",
		})),
		stats: [
			{ id: "balance", label: "Balance", value: "$20,827.38" },
			{ id: "age", label: "Age", value: "1y 2m 15d" },
			{ id: "outgoing-transactions", label: "Outgoing transactions", value: "3 940" },
			{ id: "owned-nfts", label: "Owned NFTs", value: "24" },
			{ id: "twitter-followers", label: "Twitter followers", value: "1.7k" },
		],
	};
}

/**
 * Serves one generated wallet.
 */
export async function GET(_request: Request, context: RouteParams<"walletID">): Promise<Response> {
	const { walletID } = await context.params;
	const id = parseID(walletID);
	if (id === null) return failure(400, "INVALID_QUERY", "Invalid wallet id.");
	const wallet = getWallet(id);
	return wallet === undefined ? failure(404, "RESOURCE_NOT_FOUND", "Wallet not found.") : success(wallet);
}
