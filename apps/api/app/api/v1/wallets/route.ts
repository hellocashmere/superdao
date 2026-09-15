import { getAvatarUrl } from "../../../../shared/api/avatar-url";
import { getFilteredRows, getListQuery, getSortedRows } from "../../../../shared/api/list-query";
import { getPaginate } from "../../../../shared/api/pagination";
import { invalidQuery } from "../../../../shared/api/query-params";
import { success } from "../../../../shared/api/response";
import { DEMO_PROFILE } from "../../../../shared/config/demo-profile";
import { GENERATED_ENTITY_COUNT } from "../../../../shared/config/fixtures";

const baseNames = [
	DEMO_PROFILE.title,
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
	primary: number;
	secondary: number;
	tertiary: number;
}
interface Wallet {
	id: number;
	title: string;
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
	return Array.from({ length: GENERATED_ENTITY_COUNT }, (_, index): Wallet => {
		const name = names[index] ?? `wallet-${index + 1}.eth`;
		const isDemoProfile = index === 0;

		return {
			id: index + 1,
			title: name,
			avatar: isDemoProfile ? DEMO_PROFILE.avatar : getAvatarUrl(avatarHashes[index % avatarHashes.length] ?? ""),
			recent_order: index + 1,
			rank_order: ((index + GENERATED_ENTITY_COUNT) % GENERATED_ENTITY_COUNT) + 1,
			balance_order: ((index + GENERATED_ENTITY_COUNT - 5) % GENERATED_ENTITY_COUNT) + 1,
			transactions_order: ((index + GENERATED_ENTITY_COUNT - 10) % GENERATED_ENTITY_COUNT) + 1,
			twitter_order: ((index + GENERATED_ENTITY_COUNT - 15) % GENERATED_ENTITY_COUNT) + 1,
			metrics: {
				rank: {
					primary: isDemoProfile ? 92 : 100 - index,
					secondary: isDemoProfile ? 20_100_000 : Math.round(Math.max(0.05, 2.2 - index * 0.03) * 1_000_000),
					tertiary: isDemoProfile ? 1_000 : Math.max(3, 450 - index * 5),
				},
				balance: {
					primary: isDemoProfile ? 20_100_000 : Math.round(Math.max(0.1, 8.4 - index * 0.1) * 1_000_000),
					secondary: 8 - (index % 5),
					tertiary: 128 + index * 7,
				},
				transactions: {
					primary: Math.round(Math.max(0.1, 24.8 - index * 0.25) * 1_000),
					secondary: Math.max(1, 1_200 - index * 13),
					tertiary: 12 + (index % 9),
				},
				twitter: {
					primary: isDemoProfile ? 33_500 : Math.max(1, 982 - index * 11) * 1_000,
					secondary: isDemoProfile ? 72_900 : (18 + index) * 1_000,
					tertiary: Math.max(0.1, 4.8 - index * 0.04),
				},
			},
		};
	});
}

/**
 * Serves generated wallet summaries.
 */
export function GET(request: Request): Response {
	const query = getListQuery(request, { defaultLimit: 20 });
	if (query instanceof Response) return query;
	if (query.sort !== undefined && !sorts.includes(query.sort)) return invalidQuery("Unsupported sort.");
	const orderField = `${query.sort ?? "recent"}_order` as
		| "recent_order"
		| "rank_order"
		| "balance_order"
		| "transactions_order"
		| "twitter_order";
	const filteredWallets = getFilteredRows(getWallets(), query.query, (wallet) => wallet.title);
	const sortedWallets = getSortedRows(
		filteredWallets,
		query.sort ?? "recent",
		query.order,
		(left, right) => left[orderField] - right[orderField]
	);
	const result = getPaginate(sortedWallets, query.pagination);
	return success(result.data, result.metadata);
}
