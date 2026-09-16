import type { NftCollectionWalletView } from "@/entities/nft-collection";

export type WalletContact = NftCollectionWalletView["contacts"][number];

/**
 * Builds an external profile URL for a wallet contact type.
 */
export function getContactHref(contact: WalletContact, wallet: NftCollectionWalletView) {
	const encodedName = encodeURIComponent(wallet.title);

	switch (contact) {
		case "email":
			return `mailto:${wallet.title.replace(/[^a-z0-9]/gi, "").toLowerCase()}@example.com`;
		case "link":
			return `https://etherscan.io/address/${encodedName}`;
		case "mirror":
			return `https://mirror.xyz/${encodedName}`;
		case "opensea":
			return `https://opensea.io/${encodedName}`;
		case "twitter":
			return `https://x.com/${encodedName}`;
	}
}
