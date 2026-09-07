/**
 * Builds application paths for the Explore section.
 */
export const exploreRoutes = {
  wallets: () => "/explore/wallets",
  wallet: (walletID: number) => `/explore/wallets/${walletID}`,
  labels: () => "/explore/labels",
  label: (labelID: number) => `/explore/labels/${labelID}`,
  labelWallets: (labelID: number) => `/explore/labels/${labelID}/wallets`,
  labelInsights: (labelID: number) => `/explore/labels/${labelID}/insights`,
  nftCollections: () => "/explore/nft-collections",
  nftCollection: (collectionID: number) => `/explore/nft-collections/${collectionID}`,
  nftCollectionWallets: (collectionID: number) => `/explore/nft-collections/${collectionID}/wallets`,
  nftCollectionInsights: (collectionID: number) => `/explore/nft-collections/${collectionID}/insights`,
  tokens: () => "/explore/tokens",
  token: (tokenID: number) => `/explore/tokens/${tokenID}`,
  tokenWallets: (tokenID: number) => `/explore/tokens/${tokenID}/wallets`,
  tokenInsights: (tokenID: number) => `/explore/tokens/${tokenID}/insights`,
  dapps: () => "/explore/dapps",
  dapp: (dappID: number) => `/explore/dapps/${dappID}`,
  dappWallets: (dappID: number) => `/explore/dapps/${dappID}/wallets`,
  dappInsights: (dappID: number) => `/explore/dapps/${dappID}/insights`,
} as const;
