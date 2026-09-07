"use client";

import type { ComponentPropsWithRef } from "react";

import { Avatar, AvatarImage } from "@superdao/ui/components/avatar";
import { Skeleton } from "@superdao/ui/components/skeleton";

import { useGetWalletActivity } from "@/entities/wallet";

import { WalletIDCard } from "./card";

export interface WalletActivityProps extends Omit<ComponentPropsWithRef<typeof WalletIDCard>, "title"> {
  /**
   * ID of the wallet whose activity is rendered.
   */
  walletID: number;
}

/**
 * Renders NFT collections associated with the wallet.
 */
export function WalletActivity({ className, ref, walletID, ...props }: WalletActivityProps) {
  const activityQuery = useGetWalletActivity(walletID);

  if (activityQuery.error) throw activityQuery.error;
  if (activityQuery.isPending) {
    return (
      <WalletIDCard
        {...props}
        ref={ref}
        title="Activity"
        data-state="loading"
        className={className}
      >
        <div className="-mx-3 mt-4 grid gap-x-15 gap-y-3 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 8 }, (_, index) => (
            <Skeleton
              key={index}
              className="h-9 w-full"
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
      title="Activity"
      data-state="ready"
      className={className}
    >
      <div className="-mx-3 mt-4 grid gap-x-15 gap-y-3 sm:grid-cols-2 lg:grid-cols-4">
        {activityQuery.data.map((collection) => (
          <button
            key={collection.id}
            className="flex h-9 w-full cursor-pointer items-center gap-3 rounded-lg px-3 text-left text-sm/5 font-semibold outline-none hover:bg-sidebar-accent focus-visible:ring-2 focus-visible:ring-ring/40"
            type="button"
          >
            <Avatar className="data-[size=m]:size-5">
              <AvatarImage
                src={collection.avatar}
                alt={collection.name}
              />
            </Avatar>
            <span className="truncate">{collection.name}</span>
          </button>
        ))}
      </div>
    </WalletIDCard>
  );
}
