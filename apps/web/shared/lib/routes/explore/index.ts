import { dappRoutes } from "./dapps";
import { labelRoutes } from "./labels";
import { nftCollectionRoutes } from "./nft-collections";
import { tokenRoutes } from "./tokens";
import { walletRoutes } from "./wallets";

/**
 * Builds application paths for the Explore section.
 */
export const exploreRoutes = {
	...walletRoutes,
	...labelRoutes,
	...nftCollectionRoutes,
	...tokenRoutes,
	...dappRoutes,
} as const;
