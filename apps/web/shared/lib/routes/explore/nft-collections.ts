/**
 * Builds application paths for Explore NFT collections.
 */
export const nftCollectionRoutes = {
	nftCollections: () => "/explore/nft-collections",
	nftCollection: (collectionID: number) => `/explore/nft-collections/${collectionID}`,
	nftCollectionWallets: (collectionID: number) => `/explore/nft-collections/${collectionID}/wallets`,
	nftCollectionInsights: (collectionID: number) => `/explore/nft-collections/${collectionID}/insights`,
} as const;
