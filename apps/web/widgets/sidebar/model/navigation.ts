import type { ComponentType } from "react";

import type { IconProps } from "@superdao/icons";
import {
	CampaignsNavIcon,
	DiscoverNavIcon,
	GroupNavIcon,
	MembersNavIcon,
	SettingsNavIcon,
	TopNavIcon,
} from "@superdao/icons/nav";

import { exploreRoutes } from "@/shared/lib/routes";

export interface SidebarNavigationChild {
	title: string;
	href: string;
	meta?: string;
}

export interface SidebarNavigationItem {
	title: string;
	href: string;
	icon: ComponentType<IconProps>;
	children?: readonly SidebarNavigationChild[];
	defaultOpen?: boolean;
	kind?: "audiences";
}

export const sidebarNavigation: readonly SidebarNavigationItem[] = [
	{
		title: "Explore",
		href: "/",
		icon: DiscoverNavIcon,
		defaultOpen: true,
		children: [
			{ title: "Wallets", href: exploreRoutes.wallets() },
			{ title: "Labels", href: exploreRoutes.labels() },
			{ title: "NFT collections", href: exploreRoutes.nftCollections() },
			{ title: "Tokens", href: exploreRoutes.tokens() },
			{ title: "Dapps", href: exploreRoutes.dapps() },
		],
	},
	{
		title: "Audiences",
		href: "/audiences",
		icon: GroupNavIcon,
		children: [],
		kind: "audiences",
	},
	{
		title: "Campaigns",
		href: "/campaigns",
		icon: CampaignsNavIcon,
	},
	{
		title: "Reporting",
		href: "/reporting",
		icon: TopNavIcon,
		children: [
			{
				title: "Cashmere R.",
				href: "/reporting/666",
			},
		],
	},
	{
		title: "Members",
		href: "/members",
		icon: MembersNavIcon,
	},
	{
		title: "Settings",
		href: "/settings",
		icon: SettingsNavIcon,
	},
];
