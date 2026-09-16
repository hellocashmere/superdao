/**
 * Builds application paths for Explore wallets.
 */
export const walletRoutes = {
	wallets: () => "/explore/wallets",
	wallet: (walletID: number) => `/explore/wallets/${walletID}`,
} as const;
