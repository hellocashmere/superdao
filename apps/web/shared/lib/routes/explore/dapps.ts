/**
 * Builds application paths for Explore dapps.
 */
export const dappRoutes = {
	dapps: () => "/explore/dapps",
	dapp: (dappID: number) => `/explore/dapps/${dappID}`,
	dappWallets: (dappID: number) => `/explore/dapps/${dappID}/wallets`,
	dappInsights: (dappID: number) => `/explore/dapps/${dappID}/insights`,
} as const;
