"use client";

import type { ComponentPropsWithRef } from "react";
import Link from "next/link";

import { Avatar, AvatarImage } from "@superdao/ui/components/avatar";
import { Skeleton } from "@superdao/ui/components/skeleton";

import { useGetSimilarWallets } from "@/entities/wallet";
import { exploreRoutes } from "@/shared/lib/routes";

import { WalletIDCard } from "./card";

export interface WalletSimilarWalletsProps extends Omit<ComponentPropsWithRef<typeof WalletIDCard>, "title"> {
  /**
   * ID of the wallet for which similar wallets are rendered.
   */
  walletID: number;
}

/**
 * Renders wallets with similar activity and classification signals.
 */
export function WalletSimilarWallets({ className, ref, walletID, ...props }: WalletSimilarWalletsProps) {
  const similarWalletsQuery = useGetSimilarWallets(walletID);

  if (similarWalletsQuery.error) throw similarWalletsQuery.error;
  if (similarWalletsQuery.isPending) {
    return (
      <WalletIDCard
        {...props}
        ref={ref}
        title="Similar wallets"
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
      title="Similar wallets"
      data-state="ready"
      className={className}
    >
      <div className="-mx-3 mt-4 grid gap-x-15 gap-y-3 sm:grid-cols-2 lg:grid-cols-4">
        {similarWalletsQuery.data.map((similarWallet) => (
          <Link
            key={similarWallet.id}
            href={exploreRoutes.wallet(similarWallet.id)}
            className="flex h-9 w-full cursor-pointer items-center gap-3 rounded-lg px-3 text-left text-sm/5 outline-none hover:bg-sidebar-accent focus-visible:ring-2 focus-visible:ring-ring/40"
          >
            <Avatar className="data-[size=m]:size-5">
              <AvatarImage
                src={similarWallet.avatar}
                alt={similarWallet.name}
              />
            </Avatar>
            <span className="truncate font-semibold">{similarWallet.name}</span>
            <span className="text-constructive">{similarWallet.score}</span>
          </Link>
        ))}
      </div>
    </WalletIDCard>
  );
}
