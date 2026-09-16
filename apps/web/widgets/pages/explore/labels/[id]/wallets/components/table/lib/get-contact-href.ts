import type { LabelWalletView } from "@/entities/label";

export type WalletContact = Exclude<LabelWalletView["contacts"][number], "email">;

/**
 * Builds an external profile URL for a label wallet contact type.
 */
export function getContactHref(contact: WalletContact, wallet: LabelWalletView) {
	const encodedName = encodeURIComponent(wallet.title);

	switch (contact) {
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
