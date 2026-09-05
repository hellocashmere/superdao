import type { LabelWallet } from "@/entities/label";

export type WalletContact = Exclude<LabelWallet["contacts"][number], "email">;

/**
 * Builds an external profile URL for a wallet contact type.
 */
export function getContactHref(contact: WalletContact, wallet: LabelWallet) {
  const identifier = encodeURIComponent(wallet.name);

  switch (contact) {
    case "link":
      return `https://etherscan.io/address/${identifier}`;
    case "mirror":
      return `https://mirror.xyz/${identifier}`;
    case "opensea":
      return `https://opensea.io/${identifier}`;
    case "twitter":
      return `https://x.com/${identifier}`;
  }
}
