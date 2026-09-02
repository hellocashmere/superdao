"use client";

import type { ComponentPropsWithRef } from "react";

import { DropdownBoldIcon } from "@superdao/icons/bold";
import { CopyIcon } from "@superdao/icons/outline";
import { cn } from "@superdao/lib/utils";
import { Avatar, AvatarImage } from "@superdao/ui/components/avatar";
import { Card } from "@superdao/ui/components/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@superdao/ui/components/dropdown-menu";
import { toast } from "@superdao/ui/components/toast";
import { Skeleton } from "@superdao/ui/components/skeleton";

import { useGetWalletHeader } from "@/entities/wallet";

import { WalletBioHoverCard } from "../components/wallet-bio-hover-card";
import { WalletInfoTooltip } from "../components/wallet-info-tooltip";

export interface WalletIDHeaderProps extends ComponentPropsWithRef<typeof Card> {
  /**
   * Identifier of the wallet whose header is rendered.
   */
  id: string;
}

/**
 * Renders wallet identity, social bio, and primary statistics.
 */
export function WalletIDHeader({ className, id, ref, ...props }: WalletIDHeaderProps) {
  const walletHeaderQuery = useGetWalletHeader(id);

  if (walletHeaderQuery.error) throw walletHeaderQuery.error;

  if (walletHeaderQuery.isPending) {
    return (
      <Card
        {...props}
        ref={ref}
        data-slot="wallet-id-header"
        data-state="loading"
        className={cn("gap-0 rounded-lg bg-card px-5 pt-4 pb-5 ring-0", className)}
      >
        <div className="flex min-h-16 items-start gap-5">
          <Skeleton className="size-16 shrink-0 rounded-full" />
          <div className="min-w-0 flex-1 pt-1">
            <Skeleton className="h-6 w-40" />
            <Skeleton className="mt-2 h-5 w-28" />
          </div>
          <Skeleton className="h-4.5 w-28" />
        </div>
        <Skeleton className="mt-5 h-5 w-36" />
        <Skeleton className="mt-2 h-6 w-3/4" />
        <div className="mt-5 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5">
          {Array.from({ length: 5 }, (_, index) => (
            <div key={index}>
              <Skeleton className="h-4.5 w-20" />
              <Skeleton className="mt-1 h-5.25 w-20" />
            </div>
          ))}
        </div>
      </Card>
    );
  }

  const details = walletHeaderQuery.data;
  async function copyWalletID(id: string) {
    try {
      await navigator.clipboard.writeText(id);
      toast.add({
        title: "Wallet identifier copied",
        description: "The identifier has been copied to your clipboard.",
        type: "success",
      });
    } catch {
      toast.add({
        title: "Couldn't copy wallet identifier",
        description: "Check your browser permissions and try again.",
        type: "error",
      });
    }
  }

  return (
    <Card
      {...props}
      ref={ref}
      data-slot="wallet-id-header"
      data-state="ready"
      className={cn("gap-0 rounded-lg bg-card px-5 pt-4 pb-5 ring-0", className)}
    >
      <div className="flex min-h-16 items-start gap-5">
        <Avatar className="data-[size=m]:size-16">
          <AvatarImage
            src={details.wallet.avatar}
            alt={details.wallet.name}
          />
        </Avatar>
        <div className="min-w-0 flex-1 pt-1">
          <div className="flex items-center gap-2">
            <h1 className="truncate text-xl/6 font-bold">{details.wallet.name}</h1>
            <DropdownMenu>
              <DropdownMenuTrigger
                aria-label="Copy wallet identifier"
                className="shrink-0 text-muted-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
              >
                <DropdownBoldIcon size={16} />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48">
                {details.ids.map((id) => (
                  <DropdownMenuItem
                    key={id}
                    className="h-10 cursor-pointer justify-between gap-3 rounded-none px-3 text-[15px]/6 font-semibold"
                    onClick={() => {
                      void copyWalletID(id);
                    }}
                  >
                    <span>{id}</span>
                    <CopyIcon />
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="mt-2 flex items-center gap-2">
            <span className="rounded-lg border-2 border-constructive bg-constructive/15 px-1.5 py-px text-[13px]/[18px] font-semibold text-constructive">
              {details.superrank}
            </span>
            <span className="text-sm/5 font-semibold text-tabs-foreground">Superrank</span>
          </div>
        </div>
        <span className="text-[13px]/[18px] text-muted-foreground">Last updated {details.lastUpdated}</span>
      </div>

      <div className="mt-5">
        <div className="flex items-center gap-1.5 text-[13px]/[18px] font-semibold text-muted-foreground">
          Twitter bio
          <WalletInfoTooltip label={details.bioTooltip} />
        </div>
        <p className="mt-1 text-[15px]/6">
          {details.bio.map((segment) =>
            segment.type === "link" ? (
              <WalletBioHoverCard
                key={segment.id}
                href={segment.href}
                heading={segment.heading}
                description={segment.description}
              >
                {segment.label}
              </WalletBioHoverCard>
            ) : (
              segment.value
            )
          )}
        </p>
      </div>

      <dl className="mt-5 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5">
        {details.stats.map((stat) => (
          <div key={stat.id}>
            <dt className="text-[13px]/[18px] font-semibold text-muted-foreground">{stat.label}</dt>
            <dd className="mt-1 text-[17px]/[21px] font-bold">{stat.value}</dd>
          </div>
        ))}
      </dl>
    </Card>
  );
}
