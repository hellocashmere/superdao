export type ReportingContact = "link" | "mirror" | "opensea" | "twitter";

export type ReportingAction = "WALLET_CONNECT" | "PAGE_VIEW" | "TARGET_ACTION_MINT";

export interface ReportingAccount {
  id: number;
  name: string;
  walletCount: string;
}

export interface ReportingWallet {
  id: number;
  wallet: string;
  avatar: string;
  occurredAt: string;
  rank: number;
  target: ReportingAction;
  source: string;
  labels: readonly string[];
  balance: string;
  nfts: string;
  contacts: readonly ReportingContact[];
}

export type ReportingPeriod = "All time" | "Custom period" | "Today" | "Last 7 days" | "Last 30 days";

export interface ReportingDateRange {
  from: Date | undefined;
  to?: Date;
}

type ReportingWalletSeed = Omit<ReportingWallet, "occurredAt">;

const reportingAccounts: readonly ReportingAccount[] = [
  {
    id: 666,
    name: "cashmere.ton",
    walletCount: "44 684",
  },
];

/**
 * Returns the reporting account with the requested numeric ID.
 */
export function getReportingAccount(id: number): ReportingAccount | undefined {
  return reportingAccounts.find((account) => account.id === id);
}

const reportingWalletSeeds: readonly ReportingWalletSeed[] = [
  {
    id: 1,
    wallet: "cashmere.ton",
    avatar: "/avatars/cashmere.png",
    rank: 92,
    target: "WALLET_CONNECT",
    source: "Superdao",
    labels: ["Collector"],
    balance: "20.1M",
    nfts: "1k",
    contacts: ["opensea", "mirror", "link", "twitter"],
  },
  {
    id: 2,
    wallet: "Nia Calder",
    avatar: "/avatars/190842423a18e1e6e14e3cc9e06bf656.png",
    rank: 92,
    target: "PAGE_VIEW",
    source: "optic_campaign",
    labels: ["Early adopter", "Luxury", "New"],
    balance: "23.0",
    nfts: "230",
    contacts: ["opensea", "mirror", "link", "twitter"],
  },
  {
    id: 3,
    wallet: "tessellate.eth",
    avatar: "/avatars/1f79e197d628f529836a2ddd3d4c93d5.png",
    rank: 92,
    target: "TARGET_ACTION_MINT",
    source: "Facebook",
    labels: ["Early adopter", "New"],
    balance: "43.4k",
    nfts: "33k",
    contacts: ["opensea", "mirror", "link"],
  },
  {
    id: 4,
    wallet: "Noah Vale",
    avatar: "/avatars/00f38963ebda80fb6bcc422f6d6cd499.png",
    rank: 92,
    target: "WALLET_CONNECT",
    source: "Twitter",
    labels: ["Collector"],
    balance: "22.3k",
    nfts: "33k",
    contacts: ["opensea", "mirror", "link", "twitter"],
  },
  {
    id: 5,
    wallet: "pixelpilot.eth",
    avatar: "/avatars/03622090ca9f95534d14ace6e6e833e1.png",
    rank: 78,
    target: "WALLET_CONNECT",
    source: "Twitter",
    labels: ["Farcaster", "Influencer", "Art", "Hunter", "Whale", "DeFi"],
    balance: "2.4k",
    nfts: "0",
    contacts: ["opensea", "mirror", "link"],
  },
  {
    id: 6,
    wallet: "Mira Chen",
    avatar: "/avatars/3d5787d6b930ec2c91f1a13b23a3472e.png",
    rank: 78,
    target: "PAGE_VIEW",
    source: "optic_campaign",
    labels: ["Collector"],
    balance: "749.9k",
    nfts: "2",
    contacts: ["opensea", "mirror", "link", "twitter"],
  },
  {
    id: 7,
    wallet: "basalt.ton",
    avatar: "/avatars/3f9a56d5d753b5b4baf302c1fdebcd30.png",
    rank: 78,
    target: "WALLET_CONNECT",
    source: "optic_campaign",
    labels: ["Developer", "Culture", "ENS", "Gamer"],
    balance: "53.3k",
    nfts: "15",
    contacts: ["opensea", "mirror", "link"],
  },
  {
    id: 8,
    wallet: "Zoya Field",
    avatar: "/avatars/0a2174d82cc30048a9a91a9d91a550fc.png",
    rank: 78,
    target: "PAGE_VIEW",
    source: "Superdao",
    labels: ["Luxury", "New"],
    balance: "0",
    nfts: "20",
    contacts: ["opensea", "mirror", "link"],
  },
  {
    id: 9,
    wallet: "northstar.eth",
    avatar: "/avatars/58751da0f91c121208c1e8bc1f75079f.png",
    rank: 64,
    target: "PAGE_VIEW",
    source: "Superdao",
    labels: ["Collector"],
    balance: "0",
    nfts: "0",
    contacts: ["opensea", "mirror", "link"],
  },
  {
    id: 10,
    wallet: "lucidframe.eth",
    avatar: "/avatars/58e40e9f0902cd99ee1bd309ec0a4d4a.png",
    rank: 64,
    target: "TARGET_ACTION_MINT",
    source: "Twitter",
    labels: ["Collector"],
    balance: "12.3M",
    nfts: "94",
    contacts: ["opensea", "mirror", "link", "twitter"],
  },
];

const reportingReferenceDate = Date.UTC(2026, 7, 28, 12);
const dayInMilliseconds = 24 * 60 * 60 * 1000;

export const reportingWallets: readonly ReportingWallet[] = Array.from({ length: 48 }, (_, index) => {
  const seed = reportingWalletSeeds[index % reportingWalletSeeds.length]!;

  return {
    ...seed,
    id: index + 1,
    wallet: index < reportingWalletSeeds.length ? seed.wallet : `${seed.wallet}-${index + 1}`,
    occurredAt: new Date(reportingReferenceDate - index * dayInMilliseconds).toISOString(),
  };
});

export const actionOptions = ["TARGET_ACTION_MINT", "WALLET_CONNECT", "PAGE_VIEW"] as const;
export const reportingActionLabels: Readonly<Record<ReportingAction, string>> = {
  PAGE_VIEW: "Page viewed",
  TARGET_ACTION_MINT: "Minted",
  WALLET_CONNECT: "Wallet connected",
};
export const sourceOptions = ["Twitter", "Superdao", "optic_campaign", "Google", "hashmail_campaign"] as const;
export const labelOptions = [
  "Developer",
  "Crypto native",
  "Gamer",
  "DeFi",
  "Art",
  "Luxury",
  "Fashion",
  "Music",
  "ENS",
  "Influencer",
  "Hunter",
  "Whale",
  "Farcaster",
] as const;

export const sourceSummaries = [
  {
    title: "Page views",
    rows: [
      ["N/A", "110k", "54.588%", 100],
      ["Layer3", "47.9k", "23.794%", 42],
      ["referral", "24.1k", "11.964%", 22],
      ["joinfire.xyz", "11.9k", "5.926%", 11],
      ["email", "6.48k", "3.214%", 6],
      ["superdao", "398", "0.198%", 1],
      ["mint.joinfire.xyz", "238", "0.118%", 1],
      ["twitter", "82", "0.041%", 1],
      ["hypelab", "65", "0.032%", 1],
      ["form.typeform.com", "36", "0.018%", 1],
      ["app.joinfire.xyz", "33", "0.016%", 1],
      ["discord", "29", "0.014%", 1],
      ["paragraph.xyz", "24", "0.012%", 1],
      ["mirror.xyz", "19", "0.009%", 1],
      ["google", "16", "0.008%", 1],
      ["newsletter", "12", "0.006%", 1],
      ["telegram", "9", "0.004%", 1],
    ],
  },
  {
    title: "Wallet connections",
    rows: [
      ["N/A", "21k", "58.003%", 100],
      ["Layer3", "7.36k", "20.384%", 35],
      ["referral", "4.53k", "12.527%", 22],
      ["joinfire.xyz", "2.5k", "6.924%", 12],
      ["email", "635", "1.758%", 3],
      ["mint.joinfire.xyz", "78", "0.216%", 1],
      ["superdao", "13", "0.118%", 1],
      ["twitter", "11", "0.041%", 1],
      ["app.joinfire.xyz", "7", "0.032%", 1],
      ["hypelab", "6", "0.018%", 1],
      ["discord", "5", "0.014%", 1],
      ["paragraph.xyz", "4", "0.012%", 1],
      ["mirror.xyz", "4", "0.011%", 1],
      ["google", "3", "0.008%", 1],
      ["newsletter", "2", "0.006%", 1],
      ["telegram", "1", "0.003%", 1],
    ],
  },
  {
    title: "Mints",
    rows: [
      ["N/A", "7.7k", "59.449%", 100],
      ["Layer3", "2.64k", "20.419%", 34],
      ["referral", "1.87k", "14.449%", 24],
      ["joinfire.xyz", "632", "4.488%", 8],
      ["email", "94", "0.726%", 2],
      ["mint.joinfire.xyz", "7", "0.054%", 1],
      ["twitter", "2", "0.015%", 1],
      ["form.typeform.com", "1", "0.008%", 1],
      ["app.joinfire.xyz", "1", "0.008%", 1],
      ["hypelab", "1", "0.008%", 1],
      ["discord", "1", "0.008%", 1],
      ["paragraph.xyz", "1", "0.008%", 1],
      ["mirror.xyz", "1", "0.008%", 1],
      ["newsletter", "1", "0.008%", 1],
    ],
  },
] as const;

export const conversionData = [
  ["22 Mar", 0, 2, 0],
  ["23 Mar", 6, 8, 2],
  ["24 Mar", 7, 14, 2],
  ["25 Mar", 10, 17, 6],
  ["26 Mar", 6, 13, 3],
  ["27 Mar", 6, 13, 3],
  ["28 Mar", 7, 15, 6],
  ["29 Mar", 14, 21, 12],
  ["30 Mar", 8, 16, 7],
  ["31 Mar", 16, 28, 14],
  ["1 Apr", 13, 26, 12],
  ["2 Apr", 12, 25, 11],
  ["3 Apr", 15, 24, 13],
  ["4 Apr", 13, 23, 11],
  ["5 Apr", 12, 22, 10],
  ["6 Apr", 18, 25, 16],
  ["7 Apr", 13, 20, 12],
  ["8 Apr", 8, 14, 8],
  ["9 Apr", 4, 11, 3],
  ["10 Apr", 5, 12, 4],
  ["11 Apr", 4, 11, 3],
  ["12 Apr", 8, 14, 7],
  ["17 Apr", 16, 12, 14],
  ["18 Apr", 38, 21, 32],
  ["19 Apr", 40, 23, 34],
  ["20 Apr", 37, 18, 32],
  ["21 Apr", 43, 24, 36],
  ["22 Apr", 27, 10, 24],
  ["23 Apr", 4, 14, 3],
  ["24 Apr", 8, 18, 6],
  ["25 Apr", 14, 23, 12],
  ["26 Apr", 9, 19, 8],
  ["27 Apr", 17, 29, 15],
  ["28 Apr", 16, 28, 14],
  ["29 Apr", 20, 26, 16],
].map(([date, pageView, walletConnect, mint]) => ({
  date,
  pageView,
  walletConnect,
  mint,
}));
