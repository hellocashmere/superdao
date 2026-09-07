import type { DappWalletView } from "@/entities/dapp";

export type WalletContact = DappWalletView["contacts"][number];

/**
 * Builds an external profile URL for a wallet contact type.
 */
export function getContactHref(contact: WalletContact, wallet: DappWalletView) {
  const encodedName = encodeURIComponent(wallet.name);

  switch (contact) {
    case "email":
      return `mailto:${wallet.name.replace(/[^a-z0-9]/gi, "").toLowerCase()}@example.com`;
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
