import { CASHMERE_AVATAR_URL, CASHMERE_NAME } from "../api/avatar-url";
import type { AudienceWalletActivity, AudienceWalletContact, AudienceWalletTag, Influencer } from "../api/types";

export interface CashmereAudienceProfile {
	name: string;
	avatar: string;
	rank: number;
	rank_tone: "constructive";
	age: string;
	age_details: string;
	labels: AudienceWalletTag[];
	balance: number;
	nfts: number;
	twitter: number;
	activity: AudienceWalletActivity[];
	contacts: AudienceWalletContact[];
}

/**
 * Fixed wallet data for the product author across all audience tables.
 */
export const CASHMERE_AUDIENCE_PROFILE: CashmereAudienceProfile = {
	name: CASHMERE_NAME,
	avatar: CASHMERE_AVATAR_URL,
	rank: 92,
	rank_tone: "constructive",
	age: "2.4y",
	age_details: "2 years, 4 months, 12 days",
	labels: [
		{
			name: "Developer",
			tone: "pink",
		},
		{
			name: "Culture",
			tone: "blue",
		},
		{
			name: "ENS",
			tone: "yellow",
		},
		{ name: "Crypto native", tone: "green" },
		{ name: "Gamer", tone: "purple" },
		{ name: "Whale", tone: "orange" },
		{ name: "Influencer", tone: "blue" },
	],
	balance: 20_100_000,
	nfts: 1_000,
	twitter: 33_500,
	activity: [
		{
			name: "Alex P.",
			avatar: "http://localhost:3001/avatars/13f789cec096eaa9226cb1759fc74954.png",
		},
		{
			name: "Sasha R.",
			avatar: "http://localhost:3001/avatars/190842423a18e1e6e14e3cc9e06bf656.png",
		},
		{
			name: "Daniel K.",
			avatar: "http://localhost:3001/avatars/1f79e197d628f529836a2ddd3d4c93d5.png",
		},
		{
			name: "seedling.eth",
			avatar: "http://localhost:3001/avatars/00f38963ebda80fb6bcc422f6d6cd499.png",
		},
		{
			name: "Liora Dean",
			avatar: "http://localhost:3001/avatars/03622090ca9f95534d14ace6e6e833e1.png",
		},
	],
	contacts: ["opensea", "mirror", "link", "twitter"],
};

/**
 * Fixed influencer data for the product author across all insights tables.
 */
export const CASHMERE_INFLUENCER_PROFILE: Influencer = {
	name: CASHMERE_NAME,
	username: "@cashmere",
	followers: 72_908,
	nfts: CASHMERE_AUDIENCE_PROFILE.nfts,
	balance: 18_402.9,
	avatar: CASHMERE_AVATAR_URL,
};
