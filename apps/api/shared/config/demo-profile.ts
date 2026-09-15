/**
 * Provides the demo profile displayed throughout the website's seeded API data.
 */

import { getAvatarUrl } from "../api/avatar-url";

/**
 * Determines whether a generated wallet ID belongs to the demo profile.
 */
export function isDemoProfileWallet(id: number): boolean {
	return (id - 1) % 7 === 0;
}

interface DemoAudienceProfile {
	title: string;
	avatar: string;
	rank: number;
	age: string;
	age_details: string;
	labels: Array<{
		title: string;
		variant: "blue" | "green" | "orange" | "pink" | "purple" | "yellow";
	}>;
	balance: number;
	nfts: number;
	twitter: number;
	activity: Array<{ avatar: string; title: string }>;
	contacts: Array<"email" | "link" | "mirror" | "opensea" | "twitter">;
}

/**
 * Fixed wallet data used for the demo profile across all audience tables.
 */
const audience: DemoAudienceProfile = {
	title: "Cashmere R.",
	avatar: getAvatarUrl("cashmere"),
	rank: 92,
	age: "2.4y",
	age_details: "2 years, 4 months, 12 days",
	labels: [
		{
			title: "Developer",
			variant: "pink",
		},
		{
			title: "Culture",
			variant: "blue",
		},
		{
			title: "ENS",
			variant: "yellow",
		},
		{ title: "Crypto native", variant: "green" },
		{ title: "Gamer", variant: "purple" },
		{ title: "Whale", variant: "orange" },
		{ title: "Influencer", variant: "blue" },
	],
	balance: 20_100_000,
	nfts: 1_000,
	twitter: 33_500,
	activity: [
		{
			title: "Alex P.",
			avatar: getAvatarUrl("13f789cec096eaa9226cb1759fc74954"),
		},
		{
			title: "Sasha R.",
			avatar: getAvatarUrl("190842423a18e1e6e14e3cc9e06bf656"),
		},
		{
			title: "Daniel K.",
			avatar: getAvatarUrl("1f79e197d628f529836a2ddd3d4c93d5"),
		},
		{
			title: "seedling.eth",
			avatar: getAvatarUrl("00f38963ebda80fb6bcc422f6d6cd499"),
		},
		{
			title: "Liora Dean",
			avatar: getAvatarUrl("03622090ca9f95534d14ace6e6e833e1"),
		},
	],
	contacts: ["opensea", "mirror", "link", "twitter"],
};

/**
 * Fixed influencer data used for the demo profile across all insights tables.
 */
const influencer = {
	title: audience.title,
	username: "@cashmere",
	followers: 72_908,
	nfts: audience.nfts,
	balance: 18_402.9,
	avatar: audience.avatar,
};

/**
 * Demo identity and fixture data reused across the website API responses.
 */
export const DEMO_PROFILE = {
	title: audience.title,
	avatar: audience.avatar,
	audience: audience,
	influencer: influencer,
};
