/**
 * Reads the public API URL used when building asset links.
 */
function getApiUrl(): string {
	const apiUrl = process.env.API_URL;

	if (!apiUrl) {
		throw new Error("API_URL is not configured.");
	}

	return apiUrl.replace(/\/$/, "");
}

export const CASHMERE_NAME = "cashmere.gram";
export const CASHMERE_AVATAR_URL = `${getApiUrl()}/avatars/cashmere.png`;

/**
 * Builds the public API URL for an avatar stored by the API.
 */
export function getAvatarUrl(hash: string | undefined): string {
	return `${getApiUrl()}/avatars/${hash ?? "cashmere"}.png`;
}

/**
 * Builds the public API URL for a token asset stored by the API.
 */
export function getTokenUrl(name: "contract" | "ethereum" | "tether" | "usdc"): string {
	return `${getApiUrl()}/tokens/${name}.png`;
}
