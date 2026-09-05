export type LabelMetricKind = "activity" | "balance" | "email" | "influencers" | "nfts" | "twitter";

export interface LabelMetric {
  title: string;
  value: string;
  description: string;
  footerValue: string;
  footerLabel: string;
  kind: LabelMetricKind;
  info?: string;
}

export type LabelTagTone = "blue" | "green" | "orange" | "pink" | "purple" | "yellow";

export interface LabelTag {
  name: string;
  tone: LabelTagTone;
}

export interface LabelWalletActivity {
  avatar: string;
  name: string;
}

export type RankTone = "constructive" | "lime" | "orange";

export interface LabelWallet {
  id: number;
  name: string;
  avatar: string;
  rank: string;
  rankTone: RankTone;
  age: string;
  ageDetails?: string;
  labels: readonly LabelTag[];
  balance: string;
  nfts: string;
  twitter: string;
  activity: readonly LabelWalletActivity[];
  contacts: readonly ("email" | "link" | "mirror" | "opensea" | "twitter")[];
}

export const labelMetrics: readonly LabelMetric[] = [
  {
    title: "Active last 30d",
    value: "370",
    description: "Wallets made transactions",
    footerValue: "3%",
    footerLabel: "of all",
    kind: "activity",
    info: "Wallets that completed at least one onchain transaction during the last 30 days.",
  },
  {
    title: "Total balance",
    value: "$ 208.2 M",
    description: "On Ethereum & Polygon",
    footerValue: "$694.7",
    footerLabel: "average",
    kind: "balance",
    info: "Combined token balance held by label wallets across Ethereum and Polygon.",
  },
  {
    title: "NFTs owned",
    value: "128.4 M",
    description: "Total",
    footerValue: "95%",
    footerLabel: "have 10+ NFTs",
    kind: "nfts",
  },
  {
    title: "Email",
    value: "3 928",
    description: "Contacts available",
    footerValue: "4%",
    footerLabel: "of all",
    kind: "email",
  },
  {
    title: "Twitter",
    value: "15 037",
    description: "Contacts available",
    footerValue: "23%",
    footerLabel: "of all",
    kind: "twitter",
  },
  {
    title: "Influencers",
    value: "29 203",
    description: "3k+ Twitter followers",
    footerValue: "25%",
    footerLabel: "of all",
    kind: "influencers",
  },
];

const developerLabels: readonly LabelTag[] = [
  { name: "Developer", tone: "pink" },
  { name: "Culture", tone: "blue" },
  { name: "ENS", tone: "yellow" },
  { name: "Crypto native", tone: "green" },
  { name: "Gamer", tone: "purple" },
  { name: "Whale", tone: "orange" },
  { name: "Influencer", tone: "blue" },
];

function walletActivity(name: string, avatar: string): LabelWalletActivity {
  return { avatar, name };
}

const labelWalletSeeds: readonly LabelWallet[] = [
  {
    id: 1,
    name: "cashmere.ton",
    avatar: "/avatars/cashmere.png",
    rank: "92",
    rankTone: "constructive",
    age: "2.4y",
    ageDetails: "2 years, 4 months, 12 days",
    labels: developerLabels,
    balance: "20.1M",
    nfts: "1k",
    twitter: "33.5k",
    activity: [
      walletActivity("Alex P.", "/avatars/13f789cec096eaa9226cb1759fc74954.png"),
      walletActivity("Sasha R.", "/avatars/190842423a18e1e6e14e3cc9e06bf656.png"),
      walletActivity("Daniel K.", "/avatars/1f79e197d628f529836a2ddd3d4c93d5.png"),
      walletActivity("seedling.eth", "/avatars/00f38963ebda80fb6bcc422f6d6cd499.png"),
      walletActivity("Liora Dean", "/avatars/03622090ca9f95534d14ace6e6e833e1.png"),
    ],
    contacts: ["opensea", "mirror", "link", "twitter"],
  },
  {
    id: 2,
    name: "Nia Calder",
    avatar: "/avatars/13f789cec096eaa9226cb1759fc74954.png",
    rank: "78",
    rankTone: "constructive",
    age: "7.1y",
    labels: [
      { name: "Early adopter", tone: "orange" },
      { name: "Luxury", tone: "green" },
      { name: "New", tone: "pink" },
    ],
    balance: "23",
    nfts: "230",
    twitter: "34.5k",
    activity: [
      walletActivity("seedling.eth", "/avatars/00f38963ebda80fb6bcc422f6d6cd499.png"),
      walletActivity("Liora Dean", "/avatars/03622090ca9f95534d14ace6e6e833e1.png"),
    ],
    contacts: ["opensea", "mirror", "link", "twitter"],
  },
  {
    id: 3,
    name: "tessellate.eth",
    avatar: "/avatars/190842423a18e1e6e14e3cc9e06bf656.png",
    rank: "76",
    rankTone: "constructive",
    age: "128d",
    labels: [],
    balance: "43.4k",
    nfts: "33k",
    twitter: "43.4k",
    activity: [
      walletActivity("Mira Chen", "/avatars/3d5787d6b930ec2c91f1a13b23a3472e.png"),
      walletActivity("paperboat.eth", "/avatars/3f9a56d5d753b5b4baf302c1fdebcd30.png"),
    ],
    contacts: ["opensea", "mirror", "link"],
  },
  {
    id: 4,
    name: "Noah Vale",
    avatar: "/avatars/1f79e197d628f529836a2ddd3d4c93d5.png",
    rank: "64",
    rankTone: "lime",
    age: "14d",
    labels: [{ name: "Collector", tone: "green" }],
    balance: "22.3k",
    nfts: "33k",
    twitter: "22.3k",
    activity: [walletActivity("northstar.eth", "/avatars/0a2174d82cc30048a9a91a9d91a550fc.png")],
    contacts: ["opensea", "mirror", "link", "twitter"],
  },
  {
    id: 5,
    name: "pixelpilot.eth",
    avatar: "/avatars/00f38963ebda80fb6bcc422f6d6cd499.png",
    rank: "63",
    rankTone: "lime",
    age: "—",
    labels: developerLabels,
    balance: "2.4k",
    nfts: "0",
    twitter: "2.4k",
    activity: [
      walletActivity("Imani Wells", "/avatars/58751da0f91c121208c1e8bc1f75079f.png"),
      walletActivity("lucidframe.eth", "/avatars/58e40e9f0902cd99ee1bd309ec0a4d4a.png"),
    ],
    contacts: ["opensea", "mirror", "link", "twitter"],
  },
  {
    id: 6,
    name: "Mira Chen",
    avatar: "/avatars/03622090ca9f95534d14ace6e6e833e1.png",
    rank: "47",
    rankTone: "orange",
    age: "2d",
    labels: [{ name: "Collector", tone: "green" }],
    balance: "749.9k",
    nfts: "2",
    twitter: "—",
    activity: [],
    contacts: ["opensea", "mirror", "link"],
  },
  {
    id: 7,
    name: "basalt.ton",
    avatar: "/avatars/3d5787d6b930ec2c91f1a13b23a3472e.png",
    rank: "31",
    rankTone: "orange",
    age: "839d",
    labels: [{ name: "Gamer", tone: "purple" }],
    balance: "53.3k",
    nfts: "94",
    twitter: "183",
    activity: [walletActivity("gamer.eth", "/avatars/620987817996026204ab087b324e4465.png")],
    contacts: ["opensea", "twitter"],
  },
  {
    id: 8,
    name: "Zoya Field",
    avatar: "/avatars/3f9a56d5d753b5b4baf302c1fdebcd30.png",
    rank: "29",
    rankTone: "orange",
    age: "1.2y",
    labels: [{ name: "Crypto native", tone: "green" }],
    balance: "0",
    nfts: "20",
    twitter: "503",
    activity: [walletActivity("collector.eth", "/avatars/68288521b447c61512f2b519dad476b6.png")],
    contacts: ["mirror", "link", "twitter"],
  },
  {
    id: 9,
    name: "northstar.eth",
    avatar: "/avatars/0a2174d82cc30048a9a91a9d91a550fc.png",
    rank: "18",
    rankTone: "orange",
    age: "2.3y",
    labels: [{ name: "ENS", tone: "yellow" }],
    balance: "12.3M",
    nfts: "387",
    twitter: "48k",
    activity: [walletActivity("atlasguild.eth", "/avatars/0d285ad92806c93fcc7d680188a0c6e8.png")],
    contacts: ["opensea", "mirror", "link", "twitter"],
  },
  {
    id: 10,
    name: "Imani Wells",
    avatar: "/avatars/58751da0f91c121208c1e8bc1f75079f.png",
    rank: "16",
    rankTone: "orange",
    age: "11y",
    labels: [{ name: "Luxury", tone: "green" }],
    balance: "100",
    nfts: "15",
    twitter: "—",
    activity: [],
    contacts: ["opensea", "link"],
  },
  {
    id: 11,
    name: "lucidframe.eth",
    avatar: "/avatars/58e40e9f0902cd99ee1bd309ec0a4d4a.png",
    rank: "12",
    rankTone: "orange",
    age: "1.8y",
    labels: [{ name: "Early adopter", tone: "orange" }],
    balance: "84.2k",
    nfts: "63",
    twitter: "9.2k",
    activity: [walletActivity("socialgraph.eth", "/avatars/8011097d544d3394192a4931205299aa.png")],
    contacts: ["opensea", "mirror", "twitter"],
  },
  {
    id: 12,
    name: "Rowan Pike",
    avatar: "/avatars/0c31cbe0b37ca2f5c0cd057e3ef4fed3.png",
    rank: "9",
    rankTone: "orange",
    age: "421d",
    labels: [{ name: "Developer", tone: "pink" }],
    balance: "7.8k",
    nfts: "31",
    twitter: "1.3k",
    activity: [],
    contacts: ["link", "twitter"],
  },
];

export const labelWallets: readonly LabelWallet[] = Array.from({ length: 60 }, (_, index) => {
  const seed = labelWalletSeeds[index % labelWalletSeeds.length]!;
  const pageOffset = Math.floor(index / labelWalletSeeds.length);
  const generatedName = `0x${(0xabc000 + index * 7919)
    .toString(16)
    .slice(-6)}...${(0xdef0 + index * 37).toString(16).slice(-4)}`;

  return {
    ...seed,
    id: index + 1,
    name: index < labelWalletSeeds.length ? seed.name : generatedName,
    rank: String(Math.max(1, Number(seed.rank) - pageOffset * 3)),
  };
});

export const balanceDistribution = [
  { range: "<100", wallets: 10000, label: "10k" },
  { range: "100-1000", wallets: 6000, label: "6k" },
  { range: "1k-10k", wallets: 3000, label: "3k" },
  { range: "10k+", wallets: 1000, label: "1k" },
] as const;
