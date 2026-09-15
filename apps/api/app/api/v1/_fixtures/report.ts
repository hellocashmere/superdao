import { getAvatarUrl } from "../../../../shared/api/avatar-url";
import { DEMO_PROFILE } from "../../../../shared/config/demo-profile";

export const REPORT_ENTITY_COUNT = 100;

interface ReportFixture {
	id: number;
	title: string;
	wallet_count: number;
	wallets: Array<{
		id: number;
		wallet: string;
		avatar: string;
		occurred_at: string;
		rank: number;
		target: "WALLET_CONNECT" | "PAGE_VIEW" | "TARGET_ACTION_MINT";
		source: string;
		labels: string[];
		balance: number;
		nfts: number;
		contacts: Array<"link" | "mirror" | "opensea" | "twitter">;
	}>;
	source_summaries: Array<{
		title: string;
		rows: Array<{ source: string; count: number; percent: number; width: number }>;
	}>;
	conversion_data: Array<{ date: string; page_view: number; wallet_connect: number; mint: number }>;
}

const targets = ["WALLET_CONNECT", "PAGE_VIEW", "TARGET_ACTION_MINT"] as const;
const avatarHashes = [
	"13f789cec096eaa9226cb1759fc74954",
	"190842423a18e1e6e14e3cc9e06bf656",
	"1f79e197d628f529836a2ddd3d4c93d5",
];
const fallbackAvatarHash = "13f789cec096eaa9226cb1759fc74954";

/**
 * Creates the deterministic report directory used for pagination.
 */
export function getReports(): Array<{ id: number; title: string }> {
	return Array.from({ length: REPORT_ENTITY_COUNT }, (_, index) => ({
		id: index + 1,
		title: index === 0 ? DEMO_PROFILE.title : `Reporting account ${index + 1}`,
	}));
}

/**
 * Creates one deterministic reporting dataset directly by ID.
 */
export function getReport(id: number): ReportFixture | undefined {
	if (!Number.isInteger(id) || id < 1 || id > REPORT_ENTITY_COUNT) return undefined;

	return {
		id: id,
		title: id === 1 ? DEMO_PROFILE.title : `Reporting account ${id}`,
		wallet_count: 44_684,
		wallets: Array.from({ length: 50 }, (_, index): ReportFixture["wallets"][number] => ({
			id: index + 1,
			wallet: `wallet-${index + 1}.eth`,
			avatar: getAvatarUrl(avatarHashes[index % avatarHashes.length] ?? fallbackAvatarHash),
			occurred_at: `Apr ${20 - (index % 15)}, 2023`,
			rank: 100 - index,
			target: targets[index % targets.length] ?? "PAGE_VIEW",
			source: index % 2 === 0 ? "Twitter" : "Direct",
			labels: ["Crypto native", index % 2 === 0 ? "Developer" : "Collector"],
			balance: 20_827 + index * 173,
			nfts: 24 + index,
			contacts: index % 2 === 0 ? ["twitter", "opensea"] : ["link", "mirror"],
		})),
		source_summaries: ["Top sources", "Conversions"].map((title, summaryIndex) => ({
			title: title,
			rows: Array.from({ length: 4 }, (_, index) => ({
				source: ["Twitter", "Direct", "Mirror", "Other"][index] ?? "Other",
				count: 1_200 - summaryIndex * 100 - index * 173,
				percent: 45 - index * 9,
				width: 90 - index * 17,
			})),
		})),
		conversion_data: Array.from({ length: 30 }, (_, index) => ({
			date: `2023-04-${String(index + 1).padStart(2, "0")}`,
			page_view: 420 + ((id * 31 + index * 17) % 180),
			wallet_connect: 160 + ((id * 19 + index * 11) % 90),
			mint: 45 + ((id * 13 + index * 7) % 50),
		})),
	};
}
