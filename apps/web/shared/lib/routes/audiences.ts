/**
 * Builds application paths for saved audiences.
 */
export const audienceRoutes = {
	audience: (audienceID: string) => `/audiences/${audienceID}`,
	wallets: (audienceID: string) => `/audiences/${audienceID}/wallets`,
	insights: (audienceID: string) => `/audiences/${audienceID}/insights`,
} as const;
