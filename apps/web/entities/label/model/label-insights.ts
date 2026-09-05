export interface InsightBarDatum {
  label: string;
  value: number;
  displayValue: string;
  fill?: string;
}

export interface TwitterInfluencer {
  name: string;
  username: string;
  followers: string;
  nfts: string;
  balance: string;
  avatar: string;
}

export interface AudienceOverlapCollection {
  name: string;
  avatar: string;
  ownersInAudience: string;
  shareInAudience: string;
  owners: string;
  itemsInAudience: string;
  items: string;
  floorPrice: string;
  chain: "ethereum" | "polygon";
}

export const walletBalanceBars: readonly InsightBarDatum[] = [
  { label: "<100", value: 10000, displayValue: "10k" },
  { label: "100-1000", value: 6000, displayValue: "6k" },
  { label: "1k-10k", value: 3000, displayValue: "3k" },
  { label: "10k+", value: 1000, displayValue: "1k" },
];

export const nftAllocationBars: readonly InsightBarDatum[] = [
  { label: "1-19", value: 10000, displayValue: "10k" },
  { label: "20-39", value: 7000, displayValue: "7k" },
  { label: "40-59", value: 6000, displayValue: "6k" },
  { label: "60-79", value: 3000, displayValue: "3k" },
  { label: "80-99", value: 8000, displayValue: "8k" },
  { label: "100-499", value: 5000, displayValue: "5k" },
  { label: "500+", value: 2000, displayValue: "2k" },
];

export const walletAgeBars: readonly InsightBarDatum[] = [
  { label: "<1 month", value: 23000, displayValue: "23k" },
  { label: "1-6 months", value: 44000, displayValue: "44k" },
  { label: "7-12 months", value: 83000, displayValue: "83k" },
  { label: "1-2 years", value: 52000, displayValue: "52k" },
  { label: "3-4 years", value: 23000, displayValue: "23k" },
  { label: "5-6 years", value: 12000, displayValue: "12k" },
  { label: "7+ years", value: 983, displayValue: "983" },
];

export const superrankBars: readonly InsightBarDatum[] = [
  { label: "<14", value: 630, displayValue: "630", fill: "#9b53ff" },
  { label: "15-29", value: 5200, displayValue: "5.2k", fill: "#e539ac" },
  { label: "30-44", value: 4200, displayValue: "4.2k", fill: "#fc7900" },
  { label: "45-59", value: 6800, displayValue: "6.8k", fill: "#ff9f1a" },
  { label: "60-74", value: 3400, displayValue: "3.4k", fill: "#c0d732" },
  { label: "75-89", value: 5300, displayValue: "5.3k", fill: "#7bd732" },
  { label: "90-100", value: 9800, displayValue: "9.8k", fill: "#32d74b" },
];

export const interestBars: readonly InsightBarDatum[] = [
  { label: "Luxury", value: 97500, displayValue: "97.5k" },
  { label: "Art", value: 43200, displayValue: "43.2k" },
  { label: "Music", value: 12700, displayValue: "12.7k" },
  { label: "Fashion", value: 0, displayValue: "0" },
];

export const personaBars: readonly InsightBarDatum[] = [
  { label: "Voter", value: 37200, displayValue: "37.2k" },
  { label: "Gamer", value: 31500, displayValue: "31.5k" },
  { label: "Early adopter", value: 26400, displayValue: "26.4k" },
  { label: "Developer", value: 22800, displayValue: "22.8k" },
  { label: "NFT trader", value: 17900, displayValue: "17.9k" },
  { label: "Donor", value: 13500, displayValue: "13.5k" },
  { label: "Zombie", value: 11800, displayValue: "11.8k" },
  { label: "Professional", value: 4700, displayValue: "4.7k" },
  { label: "Influencer", value: 2800, displayValue: "2.8k" },
  { label: "Hunter", value: 2600, displayValue: "2.6k" },
  { label: "Passive", value: 983, displayValue: "983" },
  { label: "Non-human", value: 0, displayValue: "0" },
];

export const twitterInfluencers: readonly TwitterInfluencer[] = [
  {
    name: "Nova Lark",
    username: "@novalark",
    followers: "1 158 923",
    nfts: "128",
    balance: "38,934.50",
    avatar: "/avatars/13f789cec096eaa9226cb1759fc74954.png",
  },
  {
    name: "chainmuse.eth",
    username: "@chainmuse",
    followers: "135 382",
    nfts: "93",
    balance: "43,245.18",
    avatar: "/avatars/190842423a18e1e6e14e3cc9e06bf656.png",
  },
  {
    name: "Devon Quill",
    username: "@devonquill",
    followers: "125 323",
    nfts: "42",
    balance: "7,832.38",
    avatar: "/avatars/1f79e197d628f529836a2ddd3d4c93d5.png",
  },
  {
    name: "sable.ton",
    username: "@sabledotton",
    followers: "84 729",
    nfts: "123",
    balance: "0",
    avatar: "/avatars/00f38963ebda80fb6bcc422f6d6cd499.png",
  },
  {
    name: "cashmere.ton",
    username: "@cashmere",
    followers: "72 908",
    nfts: "56",
    balance: "18,402.90",
    avatar: "/avatars/cashmere.png",
  },
];

const overlapSeeds: readonly AudienceOverlapCollection[] = [
  {
    name: "Wrapped Cryptopunks",
    avatar: "/avatars/13f789cec096eaa9226cb1759fc74954.png",
    ownersInAudience: "359",
    shareInAudience: "95%",
    owners: "17.5k",
    itemsInAudience: "159.2k",
    items: "17.5k",
    floorPrice: "64.5",
    chain: "ethereum",
  },
  {
    name: "MetaZellys ETH",
    avatar: "/avatars/190842423a18e1e6e14e3cc9e06bf656.png",
    ownersInAudience: "17.2k",
    shareInAudience: "100%",
    owners: "2.7k",
    itemsInAudience: "17.2k",
    items: "2.7k",
    floorPrice: "3.5",
    chain: "polygon",
  },
  {
    name: "Milady Maker",
    avatar: "/avatars/1f79e197d628f529836a2ddd3d4c93d5.png",
    ownersInAudience: "12",
    shareInAudience: "0.01%",
    owners: "10k",
    itemsInAudience: "11.8k",
    items: "10k",
    floorPrice: "2",
    chain: "ethereum",
  },
  {
    name: "MutantApeYachtClub",
    avatar: "/avatars/00f38963ebda80fb6bcc422f6d6cd499.png",
    ownersInAudience: "48",
    shareInAudience: "7%",
    owners: "19.5k",
    itemsInAudience: "5.8k",
    items: "19.5k",
    floorPrice: "13.19",
    chain: "polygon",
  },
  {
    name: "Otherdeed",
    avatar: "/avatars/03622090ca9f95534d14ace6e6e833e1.png",
    ownersInAudience: "2.9k",
    shareInAudience: "84%",
    owners: "100k",
    itemsInAudience: "4.8k",
    items: "100k",
    floorPrice: "1.521",
    chain: "polygon",
  },
  {
    name: "Nakamigos",
    avatar: "/avatars/3d5787d6b930ec2c91f1a13b23a3472e.png",
    ownersInAudience: "359",
    shareInAudience: "95%",
    owners: "20k",
    itemsInAudience: "1452",
    items: "20k",
    floorPrice: "0.683",
    chain: "ethereum",
  },
  {
    name: "Otherside Vessels",
    avatar: "/avatars/3f9a56d5d753b5b4baf302c1fdebcd30.png",
    ownersInAudience: "17.2k",
    shareInAudience: "100%",
    owners: "36k",
    itemsInAudience: "1526",
    items: "36k",
    floorPrice: "0.36",
    chain: "ethereum",
  },
  {
    name: "Bored Ape Yacht Club",
    avatar: "/avatars/0a2174d82cc30048a9a91a9d91a550fc.png",
    ownersInAudience: "12",
    shareInAudience: "0.01%",
    owners: "10k",
    itemsInAudience: "274",
    items: "10k",
    floorPrice: "60",
    chain: "ethereum",
  },
  {
    name: "Captainz",
    avatar: "/avatars/58751da0f91c121208c1e8bc1f75079f.png",
    ownersInAudience: "48",
    shareInAudience: "7%",
    owners: "10k",
    itemsInAudience: "128",
    items: "10k",
    floorPrice: "6.65",
    chain: "polygon",
  },
  {
    name: "Azuki",
    avatar: "/avatars/58e40e9f0902cd99ee1bd309ec0a4d4a.png",
    ownersInAudience: "2.9k",
    shareInAudience: "84%",
    owners: "10k",
    itemsInAudience: "13",
    items: "10k",
    floorPrice: "14.69",
    chain: "ethereum",
  },
];

export const audienceOverlapCollections: readonly AudienceOverlapCollection[] = Array.from(
  { length: 25 },
  (_, index) => {
    const seed = overlapSeeds[index % overlapSeeds.length]!;

    return {
      ...seed,
      itemsInAudience:
        index < overlapSeeds.length ? seed.itemsInAudience : ["11", "7", "274", "3.4k", "22k", "5.8k"][index % 6]!,
    };
  }
);

export const audienceNotableProjectCollections: readonly AudienceOverlapCollection[] =
  audienceOverlapCollections.filter((_collection, index) => index % 3 === 0);
