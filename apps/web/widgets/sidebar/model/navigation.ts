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
}

export const sidebarNavigation: readonly SidebarNavigationItem[] = [
  {
    title: "Explore",
    href: "/",
    icon: DiscoverNavIcon,
    defaultOpen: true,
    children: [
      { title: "Wallets", href: "/explore/wallets" },
      { title: "Labels", href: "/explore/labels" },
      { title: "NFT collections", href: "/explore/nft-collections" },
      { title: "Tokens", href: "/explore/tokens" },
      { title: "Dapps", href: "/explore/dapps" },
    ],
  },
  {
    title: "Audiences",
    href: "/audiences/mirror-xyz",
    icon: GroupNavIcon,
    children: [
      { title: "Lens profiles", href: "/audiences/lens-profiles", meta: "44k" },
      { title: "mirror.xyz", href: "/audiences/mirror-xyz", meta: "20k" },
      {
        title: "Superdao robots",
        href: "/audiences/superdao-robots",
        meta: "24k",
      },
      { title: "Add audience", href: "/audiences/new", meta: "+" },
    ],
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
    children: [{ title: "cashmere.ton", href: "/reporting/cashmere.ton" }],
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
