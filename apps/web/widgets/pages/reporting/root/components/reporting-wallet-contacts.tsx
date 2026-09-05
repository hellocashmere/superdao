import type { ComponentPropsWithRef, ElementType } from "react";

import { LinkIcon, MirrorIcon, OpenseaIcon, TwitterIcon } from "@superdao/icons/outline";
import { cn } from "@superdao/lib/utils";

import type { ReportingContact, ReportingWallet } from "../model/reporting-data";

const contactIcons: Readonly<Record<ReportingContact, ElementType>> = {
  link: LinkIcon,
  mirror: MirrorIcon,
  opensea: OpenseaIcon,
  twitter: TwitterIcon,
};

const contactLabels: Readonly<Record<ReportingContact, string>> = {
  link: "Explorer",
  mirror: "Mirror",
  opensea: "OpenSea",
  twitter: "Twitter",
};

function getContactHref(contact: ReportingContact, wallet: ReportingWallet) {
  const identifier = encodeURIComponent(wallet.wallet);

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

export interface ReportingWalletContactsProps extends ComponentPropsWithRef<"div"> {
  wallet: ReportingWallet;
}

/** Renders the external profiles connected to a reporting wallet. */
export function ReportingWalletContacts({ className, ref, wallet, ...props }: ReportingWalletContactsProps) {
  return (
    <div
      {...props}
      ref={ref}
      data-slot="reporting-wallet-contacts"
      className={cn("flex items-center gap-1 text-[#717a8c]", className)}
    >
      {wallet.contacts.map((contact) => {
        const Icon = contactIcons[contact];
        const label = contactLabels[contact];

        return (
          <a
            key={contact}
            href={getContactHref(contact, wallet)}
            target="_blank"
            rel="noreferrer"
            aria-label={`${label} contact for ${wallet.wallet}`}
            title={label}
            className="flex size-7 items-center justify-center rounded-md transition-colors outline-none hover:bg-secondary-hover hover:text-foreground focus-visible:bg-secondary-hover focus-visible:text-foreground focus-visible:ring-2 focus-visible:ring-ring/40 active:scale-95"
          >
            <Icon size={16} />
          </a>
        );
      })}
    </div>
  );
}
