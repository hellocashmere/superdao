import { readdir, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const baseProfiles = [
  ["cashmere.ton", "cashmere.ton", "/avatars/cashmere.png"],
  ["vitalik.eth", "vitalik.eth", "/avatars/13f789cec096eaa9226cb1759fc74954.png"],
  ["0x959...4a35", "0x959...4A35", "/avatars/190842423a18e1e6e14e3cc9e06bf656.png"],
  ["punk6529.eth", "punk6529.eth", "/avatars/1f79e197d628f529836a2ddd3d4c93d5.png"],
  ["0xh9f...9k73", "0xH9f...9K73", "/avatars/00f38963ebda80fb6bcc422f6d6cd499.png"],
  ["cryptoboss.eth", "cryptoboss.eth", "/avatars/03622090ca9f95534d14ace6e6e833e1.png"],
  ["nonstopgamer.eth", "nonstopgamer.eth", "/avatars/3d5787d6b930ec2c91f1a13b23a3472e.png"],
  ["cboss.eth", "cboss.eth", "/avatars/3f9a56d5d753b5b4baf302c1fdebcd30.png"],
  ["0xe8d...4j9h", "0xE8d...4J9h", "/avatars/0a2174d82cc30048a9a91a9d91a550fc.png"],
  ["memelord.eth", "memelord.eth", "/avatars/58751da0f91c121208c1e8bc1f75079f.png"],
  ["degen.ton", "degen.ton", "/avatars/58e40e9f0902cd99ee1bd309ec0a4d4a.png"],
  ["0xh7j...u9h6", "0xH7j...u9h6", "/avatars/0c31cbe0b37ca2f5c0cd057e3ef4fed3.png"],
  ["builder.eth", "builder.eth", "/avatars/620987817996026204ab087b324e4465.png"],
  ["onchain.summer", "onchain.summer", "/avatars/68288521b447c61512f2b519dad476b6.png"],
  ["nounsdao.eth", "nounsdao.eth", "/avatars/0d285ad92806c93fcc7d680188a0c6e8.png"],
  ["0x7b2...91fa", "0x7B2...91Fa", "/avatars/8011097d544d3394192a4931205299aa.png"],
  ["metaverse.eth", "metaverse.eth", "/avatars/8553af2b045a6752c135140a88835e32.png"],
  ["daoist.eth", "daoist.eth", "/avatars/13dc38b7e837a16722c6c7b6a695fa46.png"],
  ["0xa31...de70", "0xA31...dE70", "/avatars/16a336dbd2f769162d56ef6eb90d8f75.png"],
  ["whaleclub.eth", "whaleclub.eth", "/avatars/199f61e6ecd63f52024e2db2f37f1364.png"],
  ["chainrunner.eth", "chainrunner.eth", "/avatars/25e31f4e1df7b5c0376e9d3c12aae2cd.png"],
  ["0xf61...88d2", "0xF61...88D2", "/avatars/b52d052299464663127e357ee72393e6.png"],
  ["based.eth", "based.eth", "/avatars/bd0ad205c2a1919c89917a4cb4edd5f4.png"],
  ["socialgraph.eth", "socialgraph.eth", "/avatars/cb44db6f71d4a369fcc8632253735afb.png"],
  ["0xc04...a2b8", "0xC04...A2B8", "/avatars/cd4e088ebcf6499cd849d5a20f2d5a01.png"],
  ["collectooor.eth", "collectooor.eth", "/avatars/d6cf948a78224634f28f3bddb1a22d1f.png"],
  ["gm.ton", "gm.ton", "/avatars/d850093e58e38e44a4152003d18a060e.png"],
  ["0xd89...6fc1", "0xD89...6Fc1", "/avatars/dbddda90c038310e2d96e4e642c8be6b.png"],
  ["publicgoods.eth", "publicgoods.eth", "/avatars/dbde396050d6172077732d83de635853.png"],
  ["alpha.ton", "alpha.ton", "/avatars/2829f4b7e9841e3f8903815c4a10013c.png"],
  ["ayoemanise", "AyoeManise", "/avatars/16a336dbd2f769162d56ef6eb90d8f75.png"],
];

const profileModifiers = [
  "alpine",
  "amber",
  "cosmic",
  "crystal",
  "digital",
  "emerald",
  "lunar",
  "neon",
  "open",
  "radiant",
];
const profileRoles = ["builder", "collector", "curator", "explorer", "founder", "researcher", "voyager"];
const avatarsDirectoryPath = fileURLToPath(new URL("../../web/public/avatars", import.meta.url));
const generatedAvatarPaths = (await readdir(avatarsDirectoryPath))
  .filter((fileName) => fileName.endsWith(".png") && fileName !== "cashmere.png")
  .sort()
  .map((fileName) => `/avatars/${fileName}`);

const profiles = [
  ...baseProfiles,
  ...profileModifiers.flatMap((modifier, modifierIndex) => {
    return profileRoles.map((role, roleIndex) => {
      const id = `${modifier}-${role}.eth`;
      const avatarIndex = modifierIndex * profileRoles.length + roleIndex;

      return [id, id, generatedAvatarPaths[avatarIndex % generatedAvatarPaths.length]];
    });
  }),
];

const searchResultSeeds = [
  {
    id: "crypto-kitties",
    name: "CryptoKitties",
    type: "NFT collection",
    fallback_href: "/explore/nft-collections",
    avatar_src: "/avatars/0d285ad92806c93fcc7d680188a0c6e8.png",
  },
  {
    id: "cryptoboss.eth",
    name: "cryptoboss.eth",
    type: "Wallet",
    fallback_href: "/explore/wallets",
    avatar_src: "/avatars/8011097d544d3394192a4931205299aa.png",
  },
  {
    id: "cashmere.ton",
    name: "cashmere.ton",
    type: "Wallet",
    fallback_href: "/explore/wallets",
    avatar_src: "/avatars/8553af2b045a6752c135140a88835e32.png",
  },
  {
    id: "wrapped-cryptopunks-1",
    name: "Wrapped Cryptopunks",
    type: "NFT collection",
    fallback_href: "/explore/nft-collections",
    avatar_src: "/avatars/13dc38b7e837a16722c6c7b6a695fa46.png",
  },
  {
    id: "0x959...4a35",
    name: "0x959...4A35",
    type: "Wallet",
    fallback_href: "/explore/wallets",
    avatar_src: "/avatars/16a336dbd2f769162d56ef6eb90d8f75.png",
  },
  {
    id: "mirror-xyz",
    name: "mirror.xyz",
    type: "Audience",
    fallback_href: "/audiences/mirror-xyz",
    glyph: "audience",
  },
  {
    id: "token-investor",
    name: "Token investor",
    type: "Label",
    fallback_href: "/explore/labels",
    glyph: "label",
  },
  {
    id: "ethereum-1",
    name: "Ethereum",
    type: "Token",
    fallback_href: "/explore/tokens",
    avatar_src: "/avatars/199f61e6ecd63f52024e2db2f37f1364.png",
  },
  {
    id: "polygon-9",
    name: "Polygon",
    type: "Token",
    fallback_href: "/explore/tokens",
    avatar_src: "/avatars/25e31f4e1df7b5c0376e9d3c12aae2cd.png",
  },
  {
    id: "music",
    name: "Music",
    type: "Label",
    fallback_href: "/explore/labels",
    glyph: "music",
  },
  {
    id: "nakamigos-6",
    name: "Nakamigos",
    type: "NFT collection",
    fallback_href: "/explore/nft-collections",
    avatar_src: "/avatars/b52d052299464663127e357ee72393e6.png",
  },
  {
    id: "gm.ton",
    name: "gm.ton",
    type: "Wallet",
    fallback_href: "/explore/wallets",
    avatar_src: "/avatars/bd0ad205c2a1919c89917a4cb4edd5f4.png",
  },
  {
    id: "uniswap-1",
    name: "Uniswap",
    type: "Dapp",
    fallback_href: "/explore/dapps",
    avatar_src: "/avatars/cb44db6f71d4a369fcc8632253735afb.png",
  },
  {
    id: "daoist.eth",
    name: "daoist.eth",
    type: "Wallet",
    fallback_href: "/explore/wallets",
    avatar_src: "/avatars/cd4e088ebcf6499cd849d5a20f2d5a01.png",
  },
];

function rotateOrder(index, offset) {
  return ((index - offset + profiles.length) % profiles.length) + 1;
}

const wallets = profiles.map(([_legacyID, name, avatar], index) => ({
  id: index + 1,
  name,
  avatar,
  recent_order: index + 1,
  rank_order: rotateOrder(index, 0),
  balance_order: rotateOrder(index, 5),
  transactions_order: rotateOrder(index, 10),
  twitter_order: rotateOrder(index, 15),
  metrics: {
    rank: {
      primary: String(100 - index),
      secondary: index === 0 ? "$2.2M" : `$${Math.max(0.05, 1.9 - index * 0.04).toFixed(2)}M`,
      tertiary: `${Math.max(3, 450 - index * 7)} NFTs`,
    },
    balance: {
      primary: `$${Math.max(0.1, 8.4 - index * 0.2).toFixed(1)}M`,
      secondary: `${8 - (index % 5)} chains`,
      tertiary: `${128 + index * 7} tokens`,
    },
    transactions: {
      primary: `${Math.max(0.1, 24.8 - index * 0.52).toFixed(1)}K`,
      secondary: `${Math.max(1, 1200 - index * 27)} this month`,
      tertiary: `${12 + (index % 9)} dapps`,
    },
    twitter: {
      primary: `${Math.max(1, 982 - index * 21)}K`,
      secondary: `${18 + index}K followers`,
      tertiary: `${(4.8 - index * 0.05).toFixed(1)}% ER`,
    },
  },
}));

const walletDetails = {
  ids: ["0x959...4A35"],
  superrank: 92,
  last_updated: "Apr 18",
  bio_tooltip: "May be outdated",
  bio: [
    { id: "bio-0", type: "text", value: "#Bitcoin is " },
    {
      id: "bio-1",
      type: "link",
      label: "https://Hope.com",
      href: "https://Hope.com",
      heading: "Hope.com",
      description: "A Bitcoin resource shared by the wallet owner in their public profile.",
    },
    { id: "bio-2", type: "text", value: " | $BTC Hodler | " },
    {
      id: "bio-3",
      type: "link",
      label: "@MicroStrategy",
      href: "https://x.com/MicroStrategy",
      heading: "@MicroStrategy",
      description: "The X profile referenced in this wallet owner’s public Twitter bio.",
    },
    { id: "bio-4", type: "text", value: " Founder & Chairman $MSTR | " },
    {
      id: "bio-5",
      type: "link",
      label: "@MIT",
      href: "https://x.com/MIT",
      heading: "@MIT",
      description: "The MIT profile referenced in this wallet owner’s public Twitter bio.",
    },
    { id: "bio-6", type: "text", value: " Aerospace | crypto native and onchain explorer." },
  ],
  stats: [
    { id: "balance", label: "Balance", value: "$20,827.38" },
    { id: "age", label: "Age", value: "1y 2m 15d" },
    { id: "outgoing-transactions", label: "Outgoing transactions", value: "3 940" },
    { id: "owned-nfts", label: "Owned NFTs", value: "24" },
    { id: "twitter-followers", label: "Twitter followers", value: "1.7k" },
  ],
  activity: [
    ["Nakamigos", "/avatars/13f789cec096eaa9226cb1759fc74954.png"],
    ["ENS domains", "/avatars/190842423a18e1e6e14e3cc9e06bf656.png"],
    ["Art Blocks", "/avatars/1f79e197d628f529836a2ddd3d4c93d5.png"],
    ["Meebits", "/avatars/00f38963ebda80fb6bcc422f6d6cd499.png"],
    ["Azuki", "/avatars/03622090ca9f95534d14ace6e6e833e1.png"],
    ["Potatoz", "/avatars/3d5787d6b930ec2c91f1a13b23a3472e.png"],
    ["Wrapped Cryptopunks", "/avatars/3f9a56d5d753b5b4baf302c1fdebcd30.png"],
    ["Yakuza Pandaz", "/avatars/0a2174d82cc30048a9a91a9d91a550fc.png"],
    ["V1 Cryptopunks", "/avatars/58751da0f91c121208c1e8bc1f75079f.png"],
    ["mfer", "/avatars/58e40e9f0902cd99ee1bd309ec0a4d4a.png"],
    ["BEANZ Official", "/avatars/0c31cbe0b37ca2f5c0cd057e3ef4fed3.png"],
    ["Moo Crew Heroes", "/avatars/620987817996026204ab087b324e4465.png"],
    ["Doodles", "/avatars/68288521b447c61512f2b519dad476b6.png"],
    ["Moonbirds", "/avatars/0d285ad92806c93fcc7d680188a0c6e8.png"],
  ].map(([name, avatar], index) => ({ id: `activity-${index}`, name, avatar })),
  contacts: [
    ["OpenSea", "opensea"],
    ["Zapper", "zapper"],
    ["Etherscan", "etherscan"],
    ["Polygonscan", "polygonscan"],
    ["cashmere_ton", "twitter"],
    ["cashmere.lens", "lens"],
    ["cashmere", "mirror"],
    ["Email", "email"],
  ].map(([label, provider]) => ({ id: `contact-${provider}`, label, provider })),
  labels: [
    ["Developer", "constructive"],
    ["Crypto native", "fuchsia"],
    ["Gamer", "yellow"],
    ["Hacker", "constructive"],
    ["ENS", "blue"],
    ["Whale", "amber"],
    ["Non-human", "cyan"],
    ["Collector", "primary"],
    ["Early adopter", "violet"],
    ["DAO voter", "blue"],
    ["NFT collector", "fuchsia"],
    ["DeFi user", "cyan"],
    ["Builder", "constructive"],
    ["Multisig signer", "amber"],
    ["Governance", "violet"],
    ["Airdrop hunter", "yellow"],
    ["Power user", "primary"],
    ["Trader", "blue"],
    ["Creator", "fuchsia"],
  ].map(([label, tone], index) => ({ id: `label-${index}`, label, tone })),
  similar_wallets: [
    ["cryptoboss.eth", "cryptoboss.eth", "68", "/avatars/8011097d544d3394192a4931205299aa.png"],
    ["0x959...4a35", "0x959D...4A35", "72", "/avatars/8553af2b045a6752c135140a88835e32.png"],
    ["daoist.eth", "0x731g...4b4A", "93", "/avatars/13dc38b7e837a16722c6c7b6a695fa46.png"],
    ["ayoemanise", "AyoeManise", "34", "/avatars/16a336dbd2f769162d56ef6eb90d8f75.png"],
    ["based.eth", "based.eth", "81", "/avatars/199f61e6ecd63f52024e2db2f37f1364.png"],
    ["0xa31...de70", "0xA31...dE70", "89", "/avatars/25e31f4e1df7b5c0376e9d3c12aae2cd.png"],
    ["socialgraph.eth", "socialgraph.eth", "77", "/avatars/b52d052299464663127e357ee72393e6.png"],
    ["gm.ton", "gm.ton", "64", "/avatars/bd0ad205c2a1919c89917a4cb4edd5f4.png"],
  ].map(([walletName, name, score, avatar]) => ({ walletName, name, score, avatar })),
  transactions: {
    title: "Last 30d transactions",
    tooltip: "Made at least one transaction",
    metrics: [
      { id: "outgoing-transactions", label: "Outgoing transactions", value: "258 940", tone: "default" },
      { id: "volume", label: "Volume", value: "$370,827.38", tone: "default" },
      { id: "income", label: "Income", value: "+$403,735.50", tone: "positive" },
      { id: "outcome", label: "Outcome", value: "-$429,040.02", tone: "negative" },
    ],
    transactions: [
      ["Sent", "-0,01 ETH", "Ethereum", "Apr 20, 2023", "negative", "up", "transfer", "/tokens/ethereum.png"],
      [
        "Received",
        "+849,984 USDC",
        "USD Coin (PoS)",
        "Apr 19, 2023",
        "positive",
        "down",
        "transfer",
        "/tokens/usdc.png",
      ],
      ["Contract", "–", "0x949u...98H5", "Apr 14, 2023", "muted", "none", "contract", "/tokens/contract.png"],
      ["Approved", "–", "Tether USD", "Apr 8, 2023", "muted", "none", "approved", "/tokens/tether.png"],
      ["Unknown", "–", "–", "Mar 27, 2023", "muted", "none", "unknown", null],
    ].map(([type, amount, asset, date, tone, direction, kind, assetIcon], index) => ({
      id: `transaction-${index}`,
      type,
      amount,
      asset,
      date,
      tone,
      direction,
      kind,
      asset_icon: assetIcon,
    })),
  },
};

const { activity, contacts, labels, similar_wallets: similarWallets, transactions, ...overview } = walletDetails;
const walletOverviews = wallets.map((wallet, index) => ({ ...overview, id: index + 1, wallet_id: wallet.id }));
const walletActivities = wallets.flatMap((wallet) =>
  activity.map((collection) => ({ ...collection, id: `${wallet.id}-${collection.id}`, wallet_id: wallet.id }))
);
const walletContacts = wallets.flatMap((wallet) =>
  contacts.map((contact) => ({ ...contact, id: `${wallet.id}-${contact.id}`, wallet_id: wallet.id }))
);
const walletLabels = wallets.flatMap((wallet) =>
  labels.map((label) => ({ ...label, id: `${wallet.id}-${label.id}`, wallet_id: wallet.id }))
);
const walletSimilarWallets = wallets.flatMap((wallet) =>
  similarWallets.map(({ walletName, ...similarWallet }) => {
    const matches = wallets.filter((candidate) => candidate.name.toLowerCase() === walletName.toLowerCase());

    if (matches.length !== 1) {
      throw new Error(`Expected exactly one wallet named ${walletName}, received ${matches.length}`);
    }

    return {
      ...similarWallet,
      id: `${wallet.id}-${matches[0].id}`,
      wallet_id: wallet.id,
      similar_wallet_id: matches[0].id,
    };
  })
);
const walletTransactionSummaries = wallets.map((wallet, index) => ({
  ...transactions,
  id: index + 1,
  wallet_id: wallet.id,
}));

const labelDirectory = [
  ["art", "Art", "#D693FF", "interest"],
  ["music", "Music", "#FFDA1A", "interest"],
  ["fashion", "Fashion", "#3A9DFF", "interest"],
  ["luxury", "Luxury", "#5EFAD4", "interest"],
  ["developer", "Developer", "#A8F230", "persona"],
  ["professional", "Professional", "#F23051", "persona"],
  ["early-adopter", "Early adopter", "#91FF8E", "persona"],
  ["whale", "Whale", "#88C3FF", "persona"],
  ["influencer", "Influencer", "#C15CFF", "persona"],
  ["gamer", "Gamer", "#FFDA1A", "persona"],
  ["hunter", "Hunter", "#A8F230", "persona"],
  ["defi-trader", "DeFi trader", "#36BED9", "persona"],
  ["nft-trader", "NFT trader", "#3A9DFF", "persona"],
  ["token-investor", "Token investor", "#32D74B", "persona"],
  ["donor", "Donor", "#FFDA1A", "persona"],
  ["voter", "Voter", "#D693FF", "persona"],
  ["non-human", "Non-human", "#DBDEFF", "persona"],
].map(([slug, name, color, category], index) => ({
  id: index + 1,
  slug,
  name,
  wallet_count: "340k",
  color,
  category,
}));

const labelTagSeeds = [
  { name: "Developer", tone: "pink" },
  { name: "Culture", tone: "blue" },
  { name: "ENS", tone: "yellow" },
  { name: "Crypto native", tone: "green" },
  { name: "Gamer", tone: "purple" },
  { name: "Whale", tone: "orange" },
];
const labelContactSeeds = ["opensea", "mirror", "link", "twitter", "email"];
const AUDIENCE_WALLET_COUNT = 50;

function getAudienceWallets(seed) {
  const [primaryWallet, ...otherWallets] = wallets;
  const offset = seed % otherWallets.length;
  const rotatedWallets = [...otherWallets.slice(offset), ...otherWallets.slice(0, offset)];

  return [primaryWallet, ...rotatedWallets.slice(0, AUDIENCE_WALLET_COUNT - 1)];
}

function createAudienceWallet(wallet, index) {
  return {
    name: wallet.name,
    avatar: wallet.avatar,
    rank: wallet.metrics.rank.primary,
    rank_tone: index < 20 ? "constructive" : index < 40 ? "lime" : "orange",
    age: index % 9 === 0 ? "—" : index % 3 === 0 ? `${14 + index}d` : `${1 + (index % 7)}.${index % 10}y`,
    age_details: index % 9 === 0 ? undefined : `${1 + (index % 7)} years and ${index % 12} months`,
    labels: index % 6 === 0 ? [] : labelTagSeeds.slice(0, 1 + (index % labelTagSeeds.length)),
    balance: wallet.metrics.balance.primary.replace("$", ""),
    nfts: wallet.metrics.rank.tertiary.replace(" NFTs", ""),
    twitter: index % 8 === 0 ? "—" : wallet.metrics.twitter.primary,
    activity: wallets.slice(index + 1, index + 1 + (index % 4)).map((activityWallet) => ({
      name: activityWallet.name,
      avatar: activityWallet.avatar,
    })),
    contacts: labelContactSeeds.slice(0, 2 + (index % 4)),
  };
}

const labelWallets = labelDirectory.flatMap((label, labelIndex) =>
  getAudienceWallets(labelIndex).map((wallet, index) => ({
    ...createAudienceWallet(wallet, index),
    id: labelIndex * AUDIENCE_WALLET_COUNT + index + 1,
    label_id: label.id,
  }))
);

const labelMetrics = [
  {
    title: "Active last 30d",
    value: "370",
    description: "Wallets made transactions",
    footer_value: "3%",
    footer_label: "of all",
    kind: "activity",
    info: "Wallets that completed at least one onchain transaction during the last 30 days.",
  },
  {
    title: "Total balance",
    value: "$ 208.2 M",
    description: "On Ethereum & Polygon",
    footer_value: "$694.7",
    footer_label: "average",
    kind: "balance",
    info: "Combined token balance held by label wallets across Ethereum and Polygon.",
  },
  {
    title: "NFTs owned",
    value: "128.4 M",
    description: "Total",
    footer_value: "95%",
    footer_label: "have 10+ NFTs",
    kind: "nfts",
  },
  {
    title: "Email",
    value: "3 928",
    description: "Contacts available",
    footer_value: "4%",
    footer_label: "of all",
    kind: "email",
  },
  {
    title: "Twitter",
    value: "15 037",
    description: "Contacts available",
    footer_value: "23%",
    footer_label: "of all",
    kind: "twitter",
  },
  {
    title: "Influencers",
    value: "29 203",
    description: "3k+ Twitter followers",
    footer_value: "25%",
    footer_label: "of all",
    kind: "influencers",
  },
];
const labelBalanceDistribution = [
  ["<100", 10000, "10k"],
  ["100-1000", 6000, "6k"],
  ["1k-10k", 3000, "3k"],
  ["10k+", 1000, "1k"],
].map(([label, value, displayValue]) => ({ label, value, display_value: displayValue }));
const labelHighlights = labelDirectory.map((label) => ({
  id: `label-highlight-${label.id}`,
  label_id: label.id,
  metrics: labelMetrics,
  balance_distribution: labelBalanceDistribution,
}));

const chartData = (rows) =>
  rows.map(([label, value, displayValue, fill]) => ({
    label,
    value,
    display_value: displayValue,
    ...(fill ? { fill } : {}),
  }));
const overlapSeeds = [
  ["Wrapped Cryptopunks", "359", "95%", "17.5k", "159.2k", "17.5k", "64.5", "ethereum"],
  ["MetaZellys ETH", "17.2k", "100%", "2.7k", "17.2k", "2.7k", "3.5", "polygon"],
  ["Milady Maker", "12", "0.01%", "10k", "11.8k", "10k", "2", "ethereum"],
  ["MutantApeYachtClub", "48", "7%", "19.5k", "5.8k", "19.5k", "13.19", "polygon"],
  ["Otherdeed", "2.9k", "84%", "100k", "4.8k", "100k", "1.521", "polygon"],
  ["Nakamigos", "359", "95%", "20k", "1452", "20k", "0.683", "ethereum"],
  ["Otherside Vessels", "17.2k", "100%", "36k", "1526", "36k", "0.36", "ethereum"],
  ["Bored Ape Yacht Club", "12", "0.01%", "10k", "274", "10k", "60", "ethereum"],
  ["Captainz", "48", "7%", "10k", "128", "10k", "6.65", "polygon"],
  ["Azuki", "2.9k", "84%", "10k", "13", "10k", "14.69", "ethereum"],
  ["Doodles", "1.8k", "72%", "6.1k", "3.9k", "10k", "4.21", "ethereum"],
  ["Pudgy Penguins", "2.4k", "79%", "5.2k", "4.6k", "8.9k", "8.73", "ethereum"],
  ["Moonbirds", "914", "41%", "6.5k", "1.7k", "10k", "1.82", "ethereum"],
  ["Clone X", "763", "36%", "9.6k", "1.2k", "19.5k", "2.48", "ethereum"],
  ["Cool Cats", "522", "28%", "5.6k", "984", "10k", "0.91", "ethereum"],
  ["World of Women", "1.1k", "53%", "5.5k", "2.2k", "10k", "1.37", "ethereum"],
  ["DeGods", "687", "33%", "4.3k", "1.4k", "8.9k", "3.16", "ethereum"],
  ["CryptoKitties", "3.3k", "88%", "119k", "8.7k", "2m", "0.042", "ethereum"],
  ["ENS", "4.7k", "91%", "671k", "15.3k", "3m", "0.008", "ethereum"],
  ["Art Blocks Curated", "836", "39%", "12.8k", "1.9k", "65k", "0.74", "ethereum"],
  ["The Sandbox", "2.1k", "68%", "23.7k", "5.1k", "166k", "0.19", "polygon"],
  ["Decentraland", "1.4k", "57%", "8.1k", "3.2k", "97k", "0.31", "polygon"],
  ["RTFKT", "472", "24%", "14.2k", "861", "20k", "0.58", "ethereum"],
  ["Checks", "318", "18%", "4.8k", "579", "16k", "0.27", "ethereum"],
  ["Zora", "2.6k", "81%", "192k", "6.8k", "742k", "0.015", "ethereum"],
];
const audienceOverlap = Array.from({ length: 25 }, (_, index) => {
  const [name, ownersInAudience, shareInAudience, owners, itemsInAudience, items, floorPrice, chain] =
    overlapSeeds[index % overlapSeeds.length];
  const wallet = wallets[index % wallets.length];

  return {
    name,
    avatar: wallet.avatar,
    owners_in_audience: ownersInAudience,
    share_in_audience: shareInAudience,
    owners,
    items_in_audience: itemsInAudience,
    items,
    floor_price: floorPrice,
    chain,
  };
});
const labelInsightsTemplate = {
  balance_metrics: [
    {
      title: "Total balance",
      value: "$ 208.2 M",
      description: "On Ethereum & Polygon",
      footer: "$694.7 average balance",
      info: "Combined token balance held by label wallets across Ethereum and Polygon.",
    },
    { title: "NFTs owned", value: "128 402", description: "Total", footer: "95% of wallets own NFTs" },
  ],
  wallet_balance: labelBalanceDistribution,
  nft_allocation: chartData([
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
  twitter_influencers: wallets.slice(0, 5).map((wallet, index) => ({
    name: wallet.name,
    username: `@${wallet.name.replace(/[^a-z0-9]/gi, "")}`,
    followers: ["1 158 923", "135 382", "125 323", "84 729", "72 908"][index],
    nfts: ["128", "93", "42", "123", "56"][index],
    balance: ["38,934.50", "43,245.18", "7,832.38", "0", "18,402.90"][index],
    avatar: wallet.avatar,
  })),
  superrank: chartData([
    ["<14", 630, "630", "#9b53ff"],
    ["15-29", 5200, "5.2k", "#e539ac"],
    ["30-44", 4200, "4.2k", "#fc7900"],
    ["45-59", 6800, "6.8k", "#ff9f1a"],
    ["60-74", 3400, "3.4k", "#c0d732"],
    ["75-89", 5300, "5.3k", "#7bd732"],
    ["90-100", 9800, "9.8k", "#32d74b"],
  ]),
  interests: chartData([
    ["Luxury", 97500, "97.5k"],
    ["Art", 43200, "43.2k"],
    ["Music", 12700, "12.7k"],
    ["Fashion", 0, "0"],
  ]),
  personas: chartData([
    ["Voter", 37200, "37.2k"],
    ["Gamer", 31500, "31.5k"],
    ["Early adopter", 26400, "26.4k"],
    ["Developer", 22800, "22.8k"],
    ["NFT trader", 17900, "17.9k"],
    ["Donor", 13500, "13.5k"],
    ["Zombie", 11800, "11.8k"],
    ["Professional", 4700, "4.7k"],
    ["Influencer", 2800, "2.8k"],
    ["Hunter", 2600, "2.6k"],
    ["Passive", 983, "983"],
    ["Non-human", 0, "0"],
  ]),
  audience_overlap: audienceOverlap,
  notable_projects: audienceOverlap.filter((_collection, index) => index % 3 === 0),
};
const labelInsights = labelDirectory.map((label) => ({
  id: `label-insight-${label.id}`,
  label_id: label.id,
  ...labelInsightsTemplate,
}));

const exploreResourceNames = {
  "nft-collection": [
    "Wrapped Cryptopunks",
    "MetaZellys ETH",
    "Milady Maker",
    "MutantApeYachtClub",
    "Otherdeed",
    "Nakamigos",
    "Otherside Vessels",
    "Bored Ape Yacht Club",
    "Captainz",
    "Azuki",
  ],
  token: [
    "Ethereum",
    "USD Coin",
    "Tether",
    "Dai",
    "Wrapped Ether",
    "ApeCoin",
    "Uniswap",
    "Chainlink",
    "Polygon",
    "Lido DAO",
  ],
  dapp: ["Uniswap", "OpenSea", "Aave", "Blur", "Lido", "Curve", "1inch", "Zerion", "Zapper", "Mirror"],
};
const exploreResourceMetrics = [
  ["1526", "17.5k", "64.5"],
  ["274", "2.7k", "3.5"],
  ["3.4k", "10k", "2"],
  ["11.8k", "19.5k", "13.19"],
  ["22k", "100k", "1.521"],
  ["5.8k", "20k", "0.683"],
  ["11.2k", "36k", "0.36"],
  ["6k", "10k", "60"],
  ["4.8k", "10k", "6.65"],
  ["5k", "10k", "14.69"],
];
const exploreResourceKinds = ["nft-collection", "token", "dapp"];
const canonicalResourceAvatarPaths = {
  "wrapped-cryptopunks-1": "/avatars/13dc38b7e837a16722c6c7b6a695fa46.png",
  "ethereum-1": "/avatars/199f61e6ecd63f52024e2db2f37f1364.png",
  "uniswap-1": "/avatars/cb44db6f71d4a369fcc8632253735afb.png",
};
const exploreResources = exploreResourceKinds.flatMap((kind) =>
  Array.from({ length: 48 }, (_, index) => {
    const seedIndex = index % exploreResourceNames[kind].length;
    const [owners, supply, price] = exploreResourceMetrics[seedIndex];
    const name = exploreResourceNames[kind][seedIndex];
    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    const resourceSlug = `${slug}-${index + 1}`;

    return {
      id: index + 1,
      slug: resourceSlug,
      kind,
      name,
      avatar: canonicalResourceAvatarPaths[resourceSlug] ?? wallets[seedIndex].avatar,
      owners,
      active_wallets: owners,
      supply,
      price,
      chain: seedIndex % 3 === 1 || seedIndex % 3 === 4 ? "polygon" : "ethereum",
      wallet_count: "44 684",
    };
  })
);
const exploreResourceHighlights = exploreResources.map((resource) => ({
  id: resource.id,
  kind: resource.kind,
  resource_id: resource.id,
  metrics: labelMetrics,
  balance_distribution: labelBalanceDistribution,
}));
const exploreResourceWallets = exploreResources.flatMap((resource, resourceIndex) =>
  getAudienceWallets(labelDirectory.length + resourceIndex).map((wallet, index) => ({
    ...createAudienceWallet(wallet, index),
    id: resourceIndex * AUDIENCE_WALLET_COUNT + index + 1,
    kind: resource.kind,
    resource_id: resource.id,
  }))
);

function formatInsightCount(value) {
  if (value < 1000) return String(value);

  const compactValue = value / 1000;
  return `${compactValue >= 10 ? Math.round(compactValue) : compactValue.toFixed(1)}k`;
}

function createResourceInfluencers(resourceIndex) {
  const offset = (resourceIndex * 7 + 5) % wallets.length;

  return Array.from({ length: 5 }, (_, index) => {
    const wallet = wallets[(offset + index * 3) % wallets.length];
    const followers = 48000 + (((resourceIndex + 3) * 7311 + index * 19427) % 980000);
    const balance = 1200 + (((resourceIndex + 5) * 2879 + index * 6317) % 85000);

    return {
      name: wallet.name,
      username: `@${wallet.name.replace(/[^a-z0-9]/gi, "")}`,
      followers: followers.toLocaleString("en-US").replaceAll(",", " "),
      nfts: String(12 + (((resourceIndex + 1) * 17 + index * 29) % 240)),
      balance: balance.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
      avatar: wallet.avatar,
    };
  });
}

function createResourceOverlap(resourceIndex) {
  const offset = ((resourceIndex + 1) * 3) % audienceOverlap.length;

  return audienceOverlap.map((_item, index, items) => {
    const item = items[(index + offset) % items.length];
    const ownersInAudience = 180 + (((resourceIndex + 2) * 137 + index * 911) % 32000);
    const owners = 1600 + (((resourceIndex + 4) * 821 + index * 2707) % 120000);
    const share = 4 + (((resourceIndex + 3) * 17 + index * 13) % 930) / 10;
    const floorPrice = 0.08 + (((resourceIndex + 7) * 31 + index * 19) % 7500) / 100;

    return {
      ...item,
      owners_in_audience: formatInsightCount(ownersInAudience),
      share_in_audience: `${share.toFixed(1).replace(".0", "")}%`,
      owners: formatInsightCount(owners),
      items_in_audience: formatInsightCount(ownersInAudience + 380 + index * 43),
      items: formatInsightCount(owners * 2 + 700 + index * 97),
      floor_price: floorPrice.toFixed(2).replace(/0+$/, "").replace(/\.$/, ""),
    };
  });
}

const exploreResourceInsights = exploreResources.map((resource, resourceIndex) => ({
  id: resource.id,
  kind: resource.kind,
  resource_id: resource.id,
  balance_metrics: labelInsightsTemplate.balance_metrics,
  wallet_balance: labelInsightsTemplate.wallet_balance,
  nft_allocation: labelInsightsTemplate.nft_allocation,
  transaction_stats: labelInsightsTemplate.transaction_stats,
  contact_metrics: labelInsightsTemplate.contact_metrics,
  influencers: createResourceInfluencers(resourceIndex),
  superrank: labelInsightsTemplate.superrank,
  interests: labelInsightsTemplate.interests,
  personas: labelInsightsTemplate.personas,
  overlap: createResourceOverlap(resourceIndex),
}));

function createExploreEntityData(kind, foreignKey) {
  const resources = exploreResources
    .filter((resource) => resource.kind === kind)
    .map(({ kind: _kind, ...resource }) => resource);
  const highlights = exploreResourceHighlights
    .filter((highlight) => highlight.kind === kind)
    .map(({ kind: _kind, resource_id: resourceID, ...highlight }, index) => ({
      ...highlight,
      id: `${kind}-highlight-${index + 1}`,
      [foreignKey]: resourceID,
    }));
  const resourceWallets = exploreResourceWallets
    .filter((wallet) => wallet.kind === kind)
    .map(({ kind: _kind, resource_id: resourceID, ...wallet }, index) => ({
      ...wallet,
      id: index + 1,
      [foreignKey]: resourceID,
    }));
  const insights = exploreResourceInsights
    .filter((insight) => insight.kind === kind)
    .map(({ kind: _kind, resource_id: resourceID, ...insight }, index) => ({
      ...insight,
      id: `${kind}-insight-${index + 1}`,
      [foreignKey]: resourceID,
    }));

  return { highlights, insights, resources, wallets: resourceWallets };
}

const dappData = createExploreEntityData("dapp", "dapp_id");
const nftCollectionData = createExploreEntityData("nft-collection", "nft_collection_id");
const tokenData = createExploreEntityData("token", "token_id");

const searchTargetKinds = {
  Dapp: "dapp",
  Label: "label",
  "NFT collection": "nft-collection",
  Token: "token",
  Wallet: "wallet",
};
const searchCollections = {
  dapp: dappData.resources,
  label: labelDirectory,
  "nft-collection": nftCollectionData.resources,
  token: tokenData.resources,
  wallet: wallets,
};
const searchResultSegments = {
  dapp: "dapps",
  label: "labels",
  "nft-collection": "nft-collections",
  token: "tokens",
  wallet: "wallets",
};
const searchResults = searchResultSeeds.map((result, index) => {
  const { fallback_href: fallbackHref, ...searchResult } = result;
  const targetKind = searchTargetKinds[result.type];
  const isExploreDetail = targetKind && result.type !== "Audience" && result.id !== "crypto-kitties";

  if (!isExploreDetail) {
    return { ...searchResult, id: `search-${index + 1}`, href: fallbackHref };
  }

  const matches = searchCollections[targetKind].filter((resource) => {
    const searchValue = targetKind === "wallet" ? resource.name : resource.slug;
    return searchValue.toLowerCase() === result.id.toLowerCase();
  });

  if (matches.length !== 1) {
    throw new Error(`Expected exactly one ${targetKind} search target for ${result.id}, received ${matches.length}`);
  }

  const target = matches[0];
  const suffix = targetKind === "wallet" ? "" : "/wallets";

  return {
    ...searchResult,
    id: `search-${index + 1}`,
    target_id: target.id,
    target_kind: targetKind,
    href: `/explore/${searchResultSegments[targetKind]}/${target.id}${suffix}`,
  };
});

const databasePath = fileURLToPath(new URL("../db.json", import.meta.url));
await writeFile(
  databasePath,
  `${JSON.stringify(
    {
      wallets,
      "search-results": searchResults,
      "wallet-activities": walletActivities,
      "wallet-contacts": walletContacts,
      "wallet-labels": walletLabels,
      "wallet-overviews": walletOverviews,
      "wallet-similar-wallets": walletSimilarWallets,
      "wallet-transaction-summaries": walletTransactionSummaries,
      labels: labelDirectory,
      "label-wallets": labelWallets,
      "label-highlights": labelHighlights,
      "label-insights": labelInsights,
      dapps: dappData.resources,
      "dapp-highlights": dappData.highlights,
      "dapp-wallets": dappData.wallets,
      "dapp-insights": dappData.insights,
      "nft-collections": nftCollectionData.resources,
      "nft-collection-highlights": nftCollectionData.highlights,
      "nft-collection-wallets": nftCollectionData.wallets,
      "nft-collection-insights": nftCollectionData.insights,
      tokens: tokenData.resources,
      "token-highlights": tokenData.highlights,
      "token-wallets": tokenData.wallets,
      "token-insights": tokenData.insights,
    },
    null,
    2
  )}\n`
);
