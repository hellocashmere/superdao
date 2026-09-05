"use client";

import type { ComponentPropsWithRef } from "react";
import Link from "next/link";

import { useIntersectionObserver } from "@superdao/hooks";
import { cn } from "@superdao/lib/utils";
import { Avatar, AvatarImage } from "@superdao/ui/components/avatar";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@superdao/ui/components/carousel";
import { Skeleton } from "@superdao/ui/components/skeleton";

import type { WalletPreviewView } from "@/entities/wallet";
import { useGetRecentWallets } from "@/entities/wallet";

export interface RecentWalletsProps extends ComponentPropsWithRef<"section"> {}

/**
 * Renders horizontally scrollable recently viewed wallets.
 */
export function RecentWallets({ className, ref, ...props }: RecentWalletsProps) {
  const walletsQuery = useGetRecentWallets({ limit: 12 });
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
        data-slot="recent-wallets"
        data-state="loading"
        className={cn("relative", className)}
      >
        <div className="flex h-6 items-center justify-between">
          <Skeleton className="h-6 w-18" />
          <div className="flex gap-2">
            <Skeleton className="size-6" />
            <Skeleton className="size-6" />
          </div>
        </div>
        <div className="mt-4 flex gap-3 overflow-hidden pr-24">
          {Array.from({ length: 12 }, (_, index) => (
            <Skeleton
              key={index}
              className="h-10 w-36 shrink-0 rounded-lg"
            />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section
      {...props}
      ref={ref}
      data-slot="recent-wallets"
      data-state={walletsQuery.isFetchingNextPage ? "loading" : "ready"}
      className={cn("relative", className)}
    >
      <div className="flex h-6 items-center justify-between">
        <h2 className="text-xl/6 font-bold select-none">Recent</h2>
      </div>
      <Carousel
        className="mt-4"
        opts={{ align: "start", dragFree: true }}
      >
        <CarouselContent className="ml-0 gap-3">
          {wallets.map((wallet) => (
            <CarouselItem
              key={wallet.id}
              className="basis-auto pl-0"
            >
              <RecentWalletChip wallet={wallet} />
            </CarouselItem>
          ))}
          <div
            ref={loadMoreRef}
            data-slot="recent-wallets-load-more"
            className="h-10 w-px shrink-0"
          />
        </CarouselContent>
        <CarouselPrevious
          aria-label="Previous recent wallets"
          className="-top-10 right-8 bottom-auto left-auto my-0 rounded-lg bg-card text-tabs-foreground"
          size="icon-xs"
        />
        <CarouselNext
          aria-label="Next recent wallets"
          className="-top-10 right-0 bottom-auto my-0 rounded-lg bg-card text-tabs-foreground"
          size="icon-xs"
        />
      </Carousel>
    </section>
  );
}

export interface RecentWalletChipProps extends ComponentPropsWithRef<"a"> {
  /**
   * The preview data rendered by the recent-wallet link.
   */
  wallet: WalletPreviewView;
}

/**
 * Renders a compact recently viewed wallet entry.
 */
export function RecentWalletChip({ className, ref, wallet, ...props }: RecentWalletChipProps) {
  return (
    <Link
      {...props}
      ref={ref}
      href={`/explore/wallets/${encodeURIComponent(wallet.id)}`}
      data-slot="recent-wallet"
      className={cn(
        "flex h-10 shrink-0 items-center gap-3 rounded-lg bg-card py-2 pr-4 pl-3 text-sm/5 font-semibold text-foreground transition-colors outline-none hover:bg-popover focus-visible:ring-2 focus-visible:ring-ring/40",
        className
      )}
    >
      <Avatar size="s">
        <AvatarImage
          src={wallet.avatar}
          alt={wallet.name}
        />
      </Avatar>
      <span>{wallet.name}</span>
    </Link>
  );
}
