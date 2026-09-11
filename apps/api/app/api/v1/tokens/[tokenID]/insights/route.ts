import { CASHMERE_AVATAR_URL, CASHMERE_NAME, getAvatarUrl } from "../../../../../../shared/api/avatar-url";
import { failure, success } from "../../../../../../shared/api/response";
import type { RouteParams } from "../../../../../../shared/api/route-params";
import { routeID } from "../../../../../../shared/api/route-params";
import type {
	AudienceOverlap,
	BalanceDistributionDatum,
	ChartDatum,
	Influencer,
	InsightMetric,
	TransactionStat,
} from "../../../../../../shared/api/types";
import { CASHMERE_INFLUENCER_PROFILE } from "../../../../../../shared/config/cashmere-profile";
import { GENERATED_ENTITY_COUNT } from "../../../../../../shared/config/fixtures";

const avatarHashes = [
	"13f789cec096eaa9226cb1759fc74954",
	"190842423a18e1e6e14e3cc9e06bf656",
	"1f79e197d628f529836a2ddd3d4c93d5",
	"00f38963ebda80fb6bcc422f6d6cd499",
];

const names = [CASHMERE_NAME, "vitalik.eth", "punk6529.eth", "cryptoboss.eth", "daoist.eth"];

const collections = ["Wrapped Cryptopunks", "MetaZellys ETH", "Milady Maker", "Nakamigos", "Azuki"];

const balanceDistributionSeeds = [
	[10, 10_000],
	[100, 9_000],
	[1_000, 8_000],
	[10_000, 7_000],
	[100_000, 6_000],
	[1_000_000, 5_000],
	[10_000_000, 4_000],
	[100_000_000, 3_000],
	[1_000_000_000, 1_000],
] as const;

interface TokenInsights {
	id: string;
	token_id: number;
	balance_metrics: InsightMetric[];
	wallet_balance: BalanceDistributionDatum[];
	nft_allocation: ChartDatum[];
	transaction_stats: TransactionStat[];
	contact_metrics: InsightMetric[];
	influencers: Influencer[];
	overlap: AudienceOverlap[];
	superrank: ChartDatum[];
	interests: ChartDatum[];
	personas: ChartDatum[];
}

/**
 * Creates generated analytics for one token.
 */
function getTokensInsights(id: number): TokenInsights | undefined {
	if (id > GENERATED_ENTITY_COUNT) return undefined;
	const walletBalance = balanceDistributionSeeds.map(([label, value]) => ({
		label: label,
		value: value,
	}));
	const influencers = Array.from(
		{ length: 5 },
		(_, index): Influencer => ({
			name: names[index] ?? "Wallet",
			username: `@${(names[index] ?? "wallet").replace(/[^a-z0-9]/gi, "")}`,
			followers: 48_000 + id * 7_311 + index * 19_427,
			nfts: 12 + ((id * 17 + index * 29) % 240),
			balance: 1_200 + ((id * 2_879 + index * 6_317) % 85_000),
			avatar:
				names[index] === CASHMERE_NAME ? CASHMERE_AVATAR_URL : getAvatarUrl(avatarHashes[index % avatarHashes.length]),
			...(names[index] === CASHMERE_NAME ? CASHMERE_INFLUENCER_PROFILE : {}),
		})
	);
	const overlap = Array.from(
		{ length: 25 },
		(_, index): AudienceOverlap => ({
			name: collections[(id + index) % collections.length] ?? "Collection",
			avatar: getAvatarUrl(avatarHashes[index % avatarHashes.length]),
			owners_in_audience: 180 + ((id * 137 + index * 911) % 32_000),
			share_in_audience: 4 + ((id * 17 + index * 13) % 930) / 10,
			owners: 1_600 + ((id * 821 + index * 2_707) % 120_000),
			items_in_audience: 560 + id * 31 + index * 43,
			items: 3_900 + id * 97 + index * 83,
			floor_price: 0.08 + ((id * 31 + index * 19) % 7_500) / 100,
			chain: index % 4 === 1 ? "polygon" : "ethereum",
		})
	);
	const chart = (seeds: ReadonlyArray<readonly [string, number, string?]>): ChartDatum[] =>
		seeds.map(([label, value]) => ({
			label: label,
			value: value,
		}));

	return {
		id: `token-insight-${id}`,
		token_id: id,
		balance_metrics: [
			{
				title: "Total balance",
				value: 208_200_000,
				description: "On Ethereum & Polygon",
				footer_value: 694.7,
				footer_label: "average balance",
			},
			{
				title: "NFTs owned",
				value: 128_402,
				description: "Total",
				footer_value: 95,
				footer_label: "percent of wallets own NFTs",
			},
		],
		wallet_balance: walletBalance,
		nft_allocation: chart([
			["1-19", 10_000, "10k"],
			["20-39", 7_000, "7k"],
			["40-59", 6_000, "6k"],
			["60-79", 3_000, "3k"],
			["80-99", 8_000, "8k"],
			["100-499", 5_000, "5k"],
			["500+", 2_000, "2k"],
		]),
		transaction_stats: [
			{ label: "Count", value: 258_940, tone: "default" },
			{ label: "Volume", value: 370_827.38, tone: "default" },
			{ label: "Income", value: 403_735.5, tone: "positive" },
			{ label: "Outcome", value: -429_040.02, tone: "negative" },
		],
		contact_metrics: [
			{
				title: "Twitter",
				value: 15_037,
				description: "Contacts available",
				footer_value: 23,
				footer_label: "percent of all",
			},
			{
				title: "Email",
				value: 3_928,
				description: "Contacts available",
				footer_value: 4,
				footer_label: "percent of all",
			},
		],
		influencers,
		overlap,
		superrank: chart([
			["<14", 630, "630"],
			["15-29", 5_200, "5.2k"],
			["30-44", 4_200, "4.2k"],
			["45-59", 6_800, "6.8k"],
			["60-74", 3_400, "3.4k"],
			["75-89", 5_300, "5.3k"],
			["90-100", 9_800, "9.8k"],
		]),
		interests: chart([
			["Luxury", 97_500, "97.5k"],
			["Art", 43_200, "43.2k"],
			["Music", 12_700, "12.7k"],
			["Fashion", 0, "0"],
		]),
		personas: chart([
			["Voter", 37_200, "37.2k"],
			["Gamer", 31_500, "31.5k"],
			["Early adopter", 26_400, "26.4k"],
			["Developer", 22_800, "22.8k"],
		]),
	};
}

/**
 * Serves generated token analytics.
 */
export async function GET(_request: Request, context: RouteParams<"tokenID">): Promise<Response> {
	const id = await routeID(context.params, "tokenID", "Invalid token id.");
	if (id instanceof Response) return id;
	const insights = getTokensInsights(id);
	return insights === undefined ? failure(404, "RESOURCE_NOT_FOUND", "Resource not found.") : success(insights);
}
