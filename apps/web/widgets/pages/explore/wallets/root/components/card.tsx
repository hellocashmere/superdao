import type { ComponentPropsWithRef } from "react";
import Link from "next/link";

import { cn } from "@superdao/lib/utils";
import { Avatar, AvatarImage } from "@superdao/ui/components/avatar";

import type { RankedWalletView } from "@/entities/wallet";
import { exploreRoutes } from "@/shared/lib/routes";

export interface WalletCardProps extends ComponentPropsWithRef<"a"> {
  /**
   * The ranked wallet data rendered by the card.
   */
  wallet: RankedWalletView;
}

/**
 * Renders a ranked wallet summary card.
 */
export function WalletCard({ className, ref, wallet, ...props }: WalletCardProps) {
  return (
    <Link
      {...props}
      ref={ref}
      href={exploreRoutes.wallet(wallet.id)}
      data-slot="wallet-card"
      className={cn(
        "flex h-18 min-w-0 items-center gap-4 overflow-hidden rounded-lg bg-card px-5 text-left transition-colors outline-none hover:bg-popover focus-visible:ring-2 focus-visible:ring-ring/40",
        className
      )}
    >
      <Avatar size="l">
        <AvatarImage
          src={wallet.avatar}
          alt={wallet.name}
        />
      </Avatar>
      <span className="min-w-0 flex-1">
        <span className="flex min-w-0 items-center gap-2 text-[15px]/6">
          <span className="truncate font-semibold text-foreground">{wallet.name}</span>
          <span className="shrink-0 text-constructive">{wallet.primaryMetric}</span>
        </span>
        <span className="flex items-center gap-1.5 text-sm/5 text-tabs-foreground">
          <span>{wallet.secondaryMetric}</span>
          <span className="size-0.75 rounded-full bg-tabs-foreground/60" />
          <span>{wallet.tertiaryMetric}</span>
        </span>
      </span>
    </Link>
  );
}

export interface WalletGridProps extends ComponentPropsWithRef<"div"> {
  wallets: readonly RankedWalletView[];
}

/**
 * Renders wallets in the responsive leaderboard grid.
 */
export function WalletGrid({ className, ref, wallets, ...props }: WalletGridProps) {
  return (
    <div
      {...props}
      ref={ref}
      data-slot="wallet-grid"
      className={cn("grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4", className)}
    >
      {wallets.map((wallet) => (
        <WalletCard
          key={wallet.id}
          wallet={wallet}
        />
      ))}
    </div>
  );
}
