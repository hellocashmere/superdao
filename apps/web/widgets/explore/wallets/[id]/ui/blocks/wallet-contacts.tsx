"use client";

import type { ComponentPropsWithRef, ElementType } from "react";

import { EtherscanBoldIcon, OpenseaBoldIcon } from "@superdao/icons/bold";
import { LensIcon, MailLockedIcon, MirrorIcon, PolygonIcon, TwitterIcon, ZapperIcon } from "@superdao/icons/outline";
import { Button } from "@superdao/ui/components/button";
import { Skeleton } from "@superdao/ui/components/skeleton";

import type { WalletContactProvider } from "@/entities/wallet";
import { useGetWalletContacts } from "@/entities/wallet";

import { WalletIDCard } from "../components/wallet-id-card";

const contactIcons: Record<WalletContactProvider, ElementType> = {
  email: MailLockedIcon,
  etherscan: EtherscanBoldIcon,
  lens: LensIcon,
  mirror: MirrorIcon,
  opensea: OpenseaBoldIcon,
  polygonscan: PolygonIcon,
  twitter: TwitterIcon,
  zapper: ZapperIcon,
};

export interface WalletContactsProps extends Omit<ComponentPropsWithRef<typeof WalletIDCard>, "title"> {
  /**
   * ID of the wallet whose contacts are rendered.
   */
  id: string;
}

/**
 * Renders the wallet contact and external-profile actions.
 */
export function WalletContacts({ className, id, ref, ...props }: WalletContactsProps) {
  const contactsQuery = useGetWalletContacts(id);

  if (contactsQuery.error) throw contactsQuery.error;
  if (contactsQuery.isPending) {
    return (
      <WalletIDCard
        {...props}
        ref={ref}
        title="Contacts"
        data-state="loading"
        className={className}
      >
        <div className="-mx-2 mt-4 grid gap-x-15 gap-y-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 8 }, (_, index) => (
            <Skeleton
              key={index}
              className="h-8 w-full"
            />
          ))}
        </div>
      </WalletIDCard>
    );
  }

  return (
    <WalletIDCard
      {...props}
      ref={ref}
      title="Contacts"
      data-state="ready"
      className={className}
    >
      <div className="-mx-2 mt-4 grid gap-x-15 gap-y-4 sm:grid-cols-2 lg:grid-cols-4">
        {contactsQuery.data.map((contact) => {
          const Icon = contactIcons[contact.provider];

          return (
            <Button
              key={contact.id}
              variant="ghost"
              size="sm"
              className="h-8 w-full cursor-pointer justify-start gap-2 rounded-lg px-2 text-sm/5 font-semibold hover:bg-sidebar-accent"
            >
              <Icon
                size={20}
                className="size-5 text-tabs-foreground"
              />
              {contact.label}
            </Button>
          );
        })}
      </div>
    </WalletIDCard>
  );
}
