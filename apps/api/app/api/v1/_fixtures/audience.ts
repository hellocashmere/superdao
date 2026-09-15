import { getAvatarUrl } from "../../../../shared/api/avatar-url";
import { DEMO_PROFILE } from "../../../../shared/config/demo-profile";

interface AudienceWalletFixture {
	id: number;
	title: string;
	avatar: string;
	rank: number;
	age: string;
	age_details?: string;
	labels: Array<{
		title: string;
		variant: "blue" | "green" | "orange" | "pink" | "purple" | "yellow";
	}>;
	balance: number;
	nfts: number;
	twitter: number | null;
	activity: Array<{ avatar: string; title: string }>;
	contacts: Array<"email" | "link" | "mirror" | "opensea" | "twitter">;
}

const names = [
	DEMO_PROFILE.title,
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
const fallbackAvatarHash = "13f789cec096eaa9226cb1759fc74954";
const labelSeeds = [
	{ title: "Developer", variant: "pink" },
	{ title: "Culture", variant: "blue" },
	{ title: "ENS", variant: "yellow" },
	{ title: "Crypto native", variant: "green" },
	{ title: "Gamer", variant: "purple" },
	{ title: "Whale", variant: "orange" },
] as const;
const contactSeeds = ["opensea", "mirror", "link", "twitter", "email"] as const;

/**
 * Creates the shared deterministic audience wallet rows for one resource.
 */
export function getAudienceWallets(id: number, resourceCount: number): AudienceWalletFixture[] | undefined {
	if (id > resourceCount) return undefined;

	return Array.from({ length: 50 }, (_, index): AudienceWalletFixture => {
		const seedIndex = (id + index) % names.length;
		const isDemoProfile = seedIndex === 0;
		const title = names[seedIndex] ?? "wallet.eth";
		const avatar = isDemoProfile
			? DEMO_PROFILE.avatar
			: getAvatarUrl(avatarHashes[(id + index) % avatarHashes.length] ?? fallbackAvatarHash);

		return {
			id: index + 1,
			title: title,
			avatar: avatar,
			rank: 100 - index,
			age: index % 9 === 0 ? "—" : `${1 + (index % 7)}.${index % 10}y`,
			age_details: index % 9 === 0 ? undefined : `${1 + (index % 7)} years and ${index % 12} months`,
			labels: index % 6 === 0 ? [] : labelSeeds.slice(0, 1 + (index % labelSeeds.length)),
			balance: Math.round(Math.max(0.1, 8.4 - index * 0.12) * 1_000_000),
			nfts: Math.max(3, 450 - index * 7),
			twitter: index % 8 === 0 ? null : Math.max(1, 982 - index * 17) * 1_000,
			activity: Array.from({ length: index % 4 }, (_, activityIndex) => ({
				title: names[(index + activityIndex + 1) % names.length] ?? "wallet.eth",
				avatar: getAvatarUrl(avatarHashes[(index + activityIndex + 1) % avatarHashes.length] ?? fallbackAvatarHash),
			})),
			contacts: contactSeeds.slice(0, 2 + (index % 4)),
			...(isDemoProfile ? DEMO_PROFILE.audience : {}),
		};
	});
}
