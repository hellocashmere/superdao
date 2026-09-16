import type { DappWalletView } from "@/entities/dapp";

export type WalletContact = DappWalletView["contacts"][number];

/**
 * Builds an external profile URL for a wallet contact type.
 */
export function getContactHref(contact: WalletContact, wallet: DappWalletView) {
	const encodedTitle = encodeURIComponent(wallet.title);

	switch (contact) {
		case "email":
			return `mailto:${wallet.title.replace(/[^a-z0-9]/gi, "").toLowerCase()}@example.com`;
		case "link":
			return `https://etherscan.io/address/${encodedTitle}`;
		case "mirror":
			return `https://mirror.xyz/${encodedTitle}`;
		case "opensea":
			return `https://opensea.io/${encodedTitle}`;
		case "twitter":
			return `https://x.com/${encodedTitle}`;
	}
}
