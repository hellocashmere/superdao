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
import { GENERATED_ENTITY_COUNT } from "../../../../../../shared/config/fixtures";

const avatarHashes = [
	"13f789cec096eaa9226cb1759fc74954",
	"190842423a18e1e6e14e3cc9e06bf656",
	"1f79e197d628f529836a2ddd3d4c93d5",
	"00f38963ebda80fb6bcc422f6d6cd499",
];

const names = ["cashmere.ton", "vitalik.eth", "punk6529.eth", "cryptoboss.eth", "daoist.eth"];

const collections = ["Wrapped Cryptopunks", "MetaZellys ETH", "Milady Maker", "Nakamigos", "Azuki"];

const balanceDistributionSeeds = [
	[10, 10000],
	[100, 9000],
	[1000, 8000],
	[10000, 7000],
	[100000, 6000],
	[1000000, 5000],
	[10000000, 4000],
	[100000000, 3000],
	[1000000000, 1000],
] as const;

interface DappInsights {
	id: string;
	dapp_id: number;
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
 * Creates generated analytics for one dapp.
 */
function getDappsInsights(id: number): DappInsights | undefined {
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
			followers: `${48000 + id * 7311 + index * 19427}`,
			nfts: `${12 + ((id * 17 + index * 29) % 240)}`,
			balance: (1200 + ((id * 2879 + index * 6317) % 85000)).toFixed(2),
			avatar: `/avatars/${avatarHashes[index % avatarHashes.length]}.png`,
		})
	);
	const overlap = Array.from(
		{ length: 25 },
		(_, index): Overlap => ({
			name: collections[(id + index) % collections.length] ?? "Collection",
			avatar: `/avatars/${avatarHashes[index % avatarHashes.length]}.png`,
			owners_in_audience: `${180 + ((id * 137 + index * 911) % 32000)}`,
			share_in_audience: `${(4 + ((id * 17 + index * 13) % 930) / 10).toFixed(1)}%`,
			owners: `${1600 + ((id * 821 + index * 2707) % 120000)}`,
			items_in_audience: `${560 + id * 31 + index * 43}`,
			items: `${3900 + id * 97 + index * 83}`,
			floor_price: (0.08 + ((id * 31 + index * 19) % 7500) / 100).toFixed(2),
			chain: index % 4 === 1 ? "polygon" : "ethereum",
		})
	);
	const chart = (seeds: ReadonlyArray<readonly [string, number, string]>): ChartDatum[] =>
		seeds.map(([label, value, displayValue]) => ({
			label: label,
			value: value,
			display_value: displayValue,
		}));

	return {
		id: `dapp-insight-${id}`,
		dapp_id: id,
		balance_metrics: [
			{
				title: "Total balance",
				value: "$ 208.2 M",
				description: "On Ethereum & Polygon",
				footer: "$694.7 average balance",
			},
			{ title: "NFTs owned", value: "128 402", description: "Total", footer: "95% of wallets own NFTs" },
		],
		wallet_balance: walletBalance,
		nft_allocation: chart([
			["1-19", 10000, "10k"],
			["20-39", 7000, "7k"],
			["40-59", 6000, "6k"],
			["60-79", 3000, "3k"],
			["80-99", 8000, "8k"],
			["100-499", 5000, "5k"],
			["500+", 2000, "2k"],
		]),
		transaction_stats: [
			{ label: "Count", value: "258 940", tone: "default" },
			{ label: "Volume", value: "$370,827.38", tone: "default" },
			{ label: "Income", value: "+$403,735.50", tone: "positive" },
			{ label: "Outcome", value: "-$429,040.02", tone: "negative" },
		],
		contact_metrics: [
			{ title: "Twitter", value: "15 037", description: "Contacts available", footer: "23% of all" },
			{ title: "Email", value: "3 928", description: "Contacts available", footer: "4% of all" },
		],
		influencers,
		overlap,
		superrank: chart([
			["<14", 630, "630"],
			["15-29", 5200, "5.2k"],
			["30-44", 4200, "4.2k"],
			["45-59", 6800, "6.8k"],
			["60-74", 3400, "3.4k"],
			["75-89", 5300, "5.3k"],
			["90-100", 9800, "9.8k"],
		]),
		interests: chart([
			["Luxury", 97500, "97.5k"],
			["Art", 43200, "43.2k"],
			["Music", 12700, "12.7k"],
			["Fashion", 0, "0"],
		]),
		personas: chart([
			["Voter", 37200, "37.2k"],
			["Gamer", 31500, "31.5k"],
			["Early adopter", 26400, "26.4k"],
			["Developer", 22800, "22.8k"],
		]),
	};
}

/**
 * Serves generated dapp analytics.
 */
export async function GET(_request: Request, context: RouteParams<"dappID">): Promise<Response> {
	const id = await routeID(context.params, "dappID", "Invalid dapp id.");
	if (id instanceof Response) return id;
	const insights = getDappsInsights(id);
	return insights === undefined ? failure(404, "RESOURCE_NOT_FOUND", "Resource not found.") : success(insights);
}
