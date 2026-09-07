import type { LabelWallet } from "@/entities/label";

export type WalletContact = Exclude<LabelWallet["contacts"][number], "email">;

/**
 * Builds an external profile URL for a wallet contact type.
 */
export function getContactHref(contact: WalletContact, wallet: LabelWallet) {
  const encodedName = encodeURIComponent(wallet.name);

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
