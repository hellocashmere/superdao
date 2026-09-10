import { getPaginate } from "../../../../shared/api/pagination";
import { invalidQuery, pagination, scalar, stableSort, validateKeys } from "../../../../shared/api/query-params";
import { success } from "../../../../shared/api/response";
import { GENERATED_ENTITY_COUNT } from "../../../../shared/config/fixtures";

const baseNames = [
	"cashmere.ton",
	"vitalik.eth",
	"0x959...4A35",
	"punk6529.eth",
	"cryptoboss.eth",
	"daoist.eth",
	"builder.eth",
];
const modifiers = ["alpine", "amber", "cosmic", "crystal", "digital", "emerald", "lunar", "neon", "open", "radiant"];
const roles = ["builder", "collector", "curator", "explorer", "founder", "researcher", "voyager"];
const generatedNames = modifiers.flatMap((modifier) => roles.map((role) => `${modifier}-${role}.eth`));
const names = [...baseNames, ...generatedNames];
const avatarHashes = [
	"13f789cec096eaa9226cb1759fc74954",
	"190842423a18e1e6e14e3cc9e06bf656",
	"1f79e197d628f529836a2ddd3d4c93d5",
	"00f38963ebda80fb6bcc422f6d6cd499",
	"03622090ca9f95534d14ace6e6e833e1",
];
const sorts = ["recent", "rank", "balance", "transactions", "twitter"];

interface WalletMetric {
	primary: string;
	secondary: string;
	tertiary: string;
}

interface Wallet {
	id: number;
	name: string;
	avatar: string;
	recent_order: number;
	rank_order: number;
	balance_order: number;
	transactions_order: number;
	twitter_order: number;
	metrics: Record<"rank" | "balance" | "transactions" | "twitter", WalletMetric>;
}

/**
 * Creates deterministic wallet summaries.
 */
function getWallets(): Wallet[] {
	return Array.from(
		{ length: GENERATED_ENTITY_COUNT },
		(_, index): Wallet => ({
			id: index + 1,
			name: names[index] ?? `wallet-${index + 1}.eth`,
			avatar: `/avatars/${avatarHashes[index % avatarHashes.length]}.png`,
			recent_order: index + 1,
			rank_order: ((index + GENERATED_ENTITY_COUNT) % GENERATED_ENTITY_COUNT) + 1,
			balance_order: ((index + GENERATED_ENTITY_COUNT - 5) % GENERATED_ENTITY_COUNT) + 1,
			transactions_order: ((index + GENERATED_ENTITY_COUNT - 10) % GENERATED_ENTITY_COUNT) + 1,
			twitter_order: ((index + GENERATED_ENTITY_COUNT - 15) % GENERATED_ENTITY_COUNT) + 1,
			metrics: {
				rank: {
					primary: `${100 - index}`,
					secondary: `$${Math.max(0.05, 2.2 - index * 0.03).toFixed(2)}M`,
					tertiary: `${Math.max(3, 450 - index * 5)} NFTs`,
				},
				balance: {
					primary: `$${Math.max(0.1, 8.4 - index * 0.1).toFixed(1)}M`,
					secondary: `${8 - (index % 5)} chains`,
					tertiary: `${128 + index * 7} tokens`,
				},
				transactions: {
					primary: `${Math.max(0.1, 24.8 - index * 0.25).toFixed(1)}K`,
					secondary: `${Math.max(1, 1200 - index * 13)} this month`,
					tertiary: `${12 + (index % 9)} dapps`,
				},
				twitter: {
					primary: `${Math.max(1, 982 - index * 11)}K`,
					secondary: `${18 + index}K followers`,
					tertiary: `${Math.max(0.1, 4.8 - index * 0.04).toFixed(1)}% ER`,
				},
			},
		})
	);
}

/**
 * Serves generated wallet summaries.
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
	if (sort !== undefined && !sorts.includes(sort)) return invalidQuery("Unsupported sort.");
	if (order !== undefined && order !== "asc" && order !== "desc") return invalidQuery("Unsupported order.");
	const needle = q?.trim().toLowerCase();
	const orderField = `${sort ?? "recent"}_order` as
		| "recent_order"
		| "rank_order"
		| "balance_order"
		| "transactions_order"
		| "twitter_order";
	let wallets = getWallets().filter((wallet) => needle === undefined || wallet.name.toLowerCase().includes(needle));
	wallets = stableSort(wallets, (left, right) => (order === "desc" ? -1 : 1) * (left[orderField] - right[orderField]));
	const result = getPaginate(wallets, limitOffset);
	return success(result.data, result.metadata);
}
