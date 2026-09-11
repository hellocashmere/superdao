import { CASHMERE_AVATAR_URL, CASHMERE_NAME, getAvatarUrl } from "../../../../../../shared/api/avatar-url";
import { getPaginate } from "../../../../../../shared/api/pagination";
import { invalidQuery, pagination, scalar, stableSort, validateKeys } from "../../../../../../shared/api/query-params";
import { failure, success } from "../../../../../../shared/api/response";
import type { RouteParams } from "../../../../../../shared/api/route-params";
import { routeID } from "../../../../../../shared/api/route-params";
import type {
	AudienceWalletActivity,
	AudienceWalletContact,
	AudienceWalletTag,
} from "../../../../../../shared/api/types";
import { CASHMERE_AUDIENCE_PROFILE } from "../../../../../../shared/config/cashmere-profile";
import { GENERATED_ENTITY_COUNT } from "../../../../../../shared/config/fixtures";

const names = [
	CASHMERE_NAME,
	"vitalik.eth",
	"0x959...4A35",
	"punk6529.eth",
	"cryptoboss.eth",
	"daoist.eth",
	"builder.eth",
	"gm.ton",
];

const avatarHashes = [
	"13f789cec096eaa9226cb1759fc74954",
	"190842423a18e1e6e14e3cc9e06bf656",
	"1f79e197d628f529836a2ddd3d4c93d5",
	"00f38963ebda80fb6bcc422f6d6cd499",
];

const labelSeeds = [
	{ name: "Developer", tone: "pink" },
	{ name: "Culture", tone: "blue" },
	{ name: "ENS", tone: "yellow" },
	{ name: "Crypto native", tone: "green" },
	{ name: "Gamer", tone: "purple" },
	{ name: "Whale", tone: "orange" },
] as const;

const contactSeeds = ["opensea", "mirror", "link", "twitter", "email"] as const;

interface NftCollectionWallet {
	id: number;
	nft_collection_id: number;
	name: string;
	avatar: string;
	rank: number;
	rank_tone: "constructive" | "lime" | "orange";
	age: string;
	age_details?: string;
	labels: AudienceWalletTag[];
	balance: number;
	nfts: number;
	twitter: number | null;
	activity: AudienceWalletActivity[];
	contacts: AudienceWalletContact[];
}

/**
 * Creates generated audience wallets for one NFT collection.
 */
function getNftCollectionsWallets(id: number): NftCollectionWallet[] | undefined {
	if (id > GENERATED_ENTITY_COUNT) return undefined;

	return Array.from({ length: 50 }, (_, index): NftCollectionWallet => {
		const name = names[(id + index) % names.length] ?? "wallet.eth";
		const avatar =
			name === CASHMERE_NAME ? CASHMERE_AVATAR_URL : getAvatarUrl(avatarHashes[(id + index) % avatarHashes.length]);
		return {
			id: index + 1,
			nft_collection_id: id,
			name,
			avatar: avatar,
			rank: 100 - index,
			rank_tone: index < 20 ? "constructive" : index < 40 ? "lime" : "orange",
			age: index % 9 === 0 ? "—" : `${1 + (index % 7)}.${index % 10}y`,
			age_details: index % 9 === 0 ? undefined : `${1 + (index % 7)} years and ${index % 12} months`,
			labels: index % 6 === 0 ? [] : labelSeeds.slice(0, 1 + (index % labelSeeds.length)),
			balance: Math.round(Math.max(0.1, 8.4 - index * 0.12) * 1_000_000),
			nfts: Math.max(3, 450 - index * 7),
			twitter: index % 8 === 0 ? null : Math.max(1, 982 - index * 17) * 1_000,
			activity: Array.from({ length: index % 4 }, (_, activityIndex) => ({
				name: names[(index + activityIndex + 1) % names.length] ?? "wallet.eth",
				avatar: getAvatarUrl(avatarHashes[(index + activityIndex + 1) % avatarHashes.length]),
			})),
			contacts: contactSeeds.slice(0, 2 + (index % 4)),
			...(name === CASHMERE_NAME ? CASHMERE_AUDIENCE_PROFILE : {}),
		};
	});
}

/**
 * Serves generated wallets associated with a NFT collection.
 */
export async function GET(request: Request, context: RouteParams<"collectionID">): Promise<Response> {
	const id = await routeID(context.params, "collectionID", "Invalid NFT collection id.");
	if (id instanceof Response) return id;
	let wallets = getNftCollectionsWallets(id);
	if (wallets === undefined) return failure(404, "RESOURCE_NOT_FOUND", "Resource not found.");

	const params = new URL(request.url).searchParams;
	if (!validateKeys(params, ["q", "label", "limit", "offset", "sort", "order"]))
		return invalidQuery("Unsupported query parameter.");
	const limitOffset = pagination(params);
	const q = scalar(params, "q");
	const sort = scalar(params, "sort");
	const order = scalar(params, "order");
	if (limitOffset === null || [q, sort, order].includes(null)) return invalidQuery("Invalid query parameters.");
	if (sort !== undefined && sort !== "index" && sort !== "rank") return invalidQuery("Unsupported sort.");
	if (order !== undefined && order !== "asc" && order !== "desc") return invalidQuery("Unsupported order.");

	const needle = q?.trim().toLowerCase();
	const labels = params.getAll("label").map((label) => label.toLowerCase());
	wallets = wallets.filter(
		(wallet) =>
			(needle === undefined || wallet.name.toLowerCase().includes(needle)) &&
			(labels.length === 0 || wallet.labels.some((label) => labels.includes(label.name.toLowerCase())))
	);
	wallets = stableSort(wallets, (left, right) => {
		const comparison = (sort ?? "index") === "rank" ? Number(left.rank) - Number(right.rank) : left.id - right.id;
		return order === "desc" ? -comparison : comparison;
	});
	const result = getPaginate(wallets, limitOffset);
	return success(result.data, result.metadata);
}
