import type { ComponentPropsWithRef, ElementType } from "react";

import { LinkIcon, MirrorIcon, OpenseaIcon, TwitterIcon } from "@superdao/icons/outline";
import { cn } from "@superdao/lib/utils";

import type { NftCollectionWalletView } from "@/entities/nft-collection";

type Contact = Exclude<NftCollectionWalletView["contacts"][number], "email">;

const contactIcons: Readonly<Record<Contact, ElementType>> = {
  link: LinkIcon,
  mirror: MirrorIcon,
  opensea: OpenseaIcon,
  twitter: TwitterIcon,
};

const contactLabels: Readonly<Record<Contact, string>> = {
  link: "Website",
  mirror: "Mirror",
  opensea: "OpenSea",
  twitter: "Twitter",
};

function getContactHref(contact: Contact, wallet: NftCollectionWalletView) {
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

export interface CollectionWalletContactsProps extends ComponentPropsWithRef<"div"> {
  wallet: NftCollectionWalletView;
}

/**
 * Renders links to the non-email contact profiles connected to a wallet.
 */
export function CollectionWalletContacts({ className, ref, wallet, ...props }: CollectionWalletContactsProps) {
  return (
    <div
      {...props}
      ref={ref}
      data-slot="nft-collection-wallet-contacts"
      className={cn("flex items-center gap-1 text-[#717a8c]", className)}
    >
      {wallet.contacts
        .filter((contact): contact is Contact => contact !== "email")
        .map((contact) => {
          const Icon = contactIcons[contact];

          return (
            <a
              key={contact}
              href={getContactHref(contact, wallet)}
              target="_blank"
              rel="noreferrer"
              aria-label={`${contactLabels[contact]} contact for ${wallet.name}`}
              title={contactLabels[contact]}
              className="flex size-7 items-center justify-center rounded-md transition-colors outline-none hover:bg-secondary-hover hover:text-foreground focus-visible:bg-secondary-hover focus-visible:text-foreground focus-visible:ring-2 focus-visible:ring-ring/40 active:scale-95"
            >
              <Icon size={16} />
            </a>
          );
        })}
    </div>
  );
}
