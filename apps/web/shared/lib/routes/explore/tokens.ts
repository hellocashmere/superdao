/**
 * Builds application paths for Explore tokens.
 */
export const tokenRoutes = {
	tokens: () => "/explore/tokens",
	token: (tokenID: number) => `/explore/tokens/${tokenID}`,
	tokenWallets: (tokenID: number) => `/explore/tokens/${tokenID}/wallets`,
	tokenInsights: (tokenID: number) => `/explore/tokens/${tokenID}/insights`,
} as const;
