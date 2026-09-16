/**
 * Builds application paths for Explore labels.
 */
export const labelRoutes = {
	labels: () => "/explore/labels",
	label: (labelID: number) => `/explore/labels/${labelID}`,
	labelWallets: (labelID: number) => `/explore/labels/${labelID}/wallets`,
	labelInsights: (labelID: number) => `/explore/labels/${labelID}/insights`,
} as const;
