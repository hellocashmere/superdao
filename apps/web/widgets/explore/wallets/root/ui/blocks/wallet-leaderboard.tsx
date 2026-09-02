"use client";

import type { ComponentPropsWithRef } from "react";
import { useState } from "react";

import { useIntersectionObserver } from "@superdao/hooks";
import { CrownBoldIcon } from "@superdao/icons/bold";
import { DollarIcon, TransactionIcon, TwitterIcon } from "@superdao/icons/outline";
import { cn } from "@superdao/lib/utils";
import { Card } from "@superdao/ui/components/card";
import { Skeleton } from "@superdao/ui/components/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@superdao/ui/components/tabs";

import type { WalletFilter } from "@/entities/wallet";
import { useGetWalletsByFilter } from "@/entities/wallet";

import { WalletGrid } from "../components/wallet-card";

const walletFilters: ReadonlyArray<{
  value: WalletFilter;
  label: string;
  icon: typeof CrownBoldIcon;
}> = [
  {
    value: "rank",
    label: "Rank",
    icon: CrownBoldIcon,
  },
  {
    value: "balance",
    label: "Balance",
    icon: DollarIcon,
  },
  {
    value: "transactions",
    label: "Transactions",
    icon: TransactionIcon,
  },
  {
    value: "twitter",
    label: "Twitter",
    icon: TwitterIcon,
  },
] as const;

export interface WalletLeaderboardProps extends ComponentPropsWithRef<"section"> {}

/**
 * Renders wallet ranking controls and ranked wallet cards.
 */
export function WalletLeaderboard({ className, ref, ...props }: WalletLeaderboardProps) {
  const [activeFilter, setActiveFilter] = useState<WalletFilter>("rank");
  const walletsQuery = useGetWalletsByFilter({
    filter: activeFilter,
    limit: 20,
  });
  const wallets = walletsQuery.data?.items ?? [];
  const hasMore = walletsQuery.data?.hasMore ?? false;
  const [loadMoreRef] = useIntersectionObserver({
    rootMargin: "3px",
    onChange: (isIntersecting) => {
      if (isIntersecting && hasMore && !walletsQuery.isFetchingNextPage) {
        void walletsQuery.fetchNextPage();
      }
    },
  });

  if (walletsQuery.error) throw walletsQuery.error;

  if (walletsQuery.isPending) {
    return (
      <section
        {...props}
        ref={ref}
        data-slot="wallet-leaderboard"
        data-state="loading"
        className={cn(className)}
      >
        <Skeleton className="h-6 w-29" />
        <div className="mt-4 flex h-8 gap-3">
          {Array.from({ length: 4 }, (_, index) => (
            <Skeleton
              key={index}
              className="h-8 w-27"
            />
          ))}
        </div>
        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 20 }, (_, index) => (
            <Card
              key={index}
              className="flex h-18 flex-row items-center gap-4 rounded-lg px-5 py-3 ring-0"
            >
              <Skeleton className="size-10 shrink-0 rounded-full" />
              <div className="min-w-0 flex-1 space-y-1">
                <Skeleton className="h-6 w-4/5" />
                <Skeleton className="h-5 w-3/5" />
              </div>
            </Card>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section
      {...props}
      ref={ref}
      data-slot="wallet-leaderboard"
      data-state={walletsQuery.isFetchingNextPage ? "loading" : "ready"}
      className={cn("group/wallet-leaderboard", className)}
    >
      <h2 className="text-xl/6 font-bold">Top wallets</h2>
      <Tabs
        value={activeFilter}
        onValueChange={(value) => setActiveFilter(value as WalletFilter)}
        className="mt-4 gap-5"
      >
        <TabsList
          variant="subnavigation"
          className="no-scrollbar max-w-full justify-start overflow-x-auto"
        >
          {walletFilters.map((filter) => {
            const Icon = filter.icon;

            return (
              <TabsTrigger
                key={filter.value}
                value={filter.value}
              >
                <Icon />
                {filter.label}
              </TabsTrigger>
            );
          })}
        </TabsList>
        <TabsContent
          value={activeFilter}
          className="transition-opacity group-data-[state=loading]/wallet-leaderboard:opacity-60"
        >
          <WalletGrid wallets={wallets} />
          <div
            ref={loadMoreRef}
            data-slot="wallet-leaderboard-load-more"
            className="h-px"
          />
        </TabsContent>
      </Tabs>
    </section>
  );
}
