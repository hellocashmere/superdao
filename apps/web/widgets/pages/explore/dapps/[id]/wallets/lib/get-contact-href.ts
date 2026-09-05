import type { DappWalletView } from "@/entities/dapp";

export type WalletContact = DappWalletView["contacts"][number];

/**
 * Builds an external profile URL for a wallet contact type.
 */
export function getContactHref(contact: WalletContact, wallet: DappWalletView) {
  const identifier = encodeURIComponent(wallet.name);

  switch (contact) {
    case "email":
      return `mailto:${wallet.name.replace(/[^a-z0-9]/gi, "").toLowerCase()}@example.com`;
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
