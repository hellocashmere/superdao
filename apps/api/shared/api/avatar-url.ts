/**
 * Reads the public API URL used when building asset links.
 */
function getApiUrl(): string {
	const apiUrl = process.env.API_URL?.trim();

	return apiUrl ? apiUrl.replace(/\/$/, "") : "";
}

/**
 * Builds the public API URL for an avatar stored by the API.
 */
export function getAvatarUrl(hash: string): string {
	const assetHash = hash.trim();
	if (!assetHash) throw new Error("Avatar asset identifier is required.");

	return `${getApiUrl()}/avatars/${assetHash}.png`;
}

/**
 * Builds the public API URL for a token asset stored by the API.
 */
export function getTokenUrl(name: "contract" | "ethereum" | "tether" | "usdc"): string {
	return `${getApiUrl()}/tokens/${name}.png`;
}
