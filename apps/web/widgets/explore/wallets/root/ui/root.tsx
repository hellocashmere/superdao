import type { ComponentPropsWithRef } from "react";

import { cn } from "@superdao/lib/utils";

import { Container } from "@/shared/ui/container";
import { PageBody } from "@/shared/ui/page-layout";

import { RecentWallets } from "./blocks/recent-wallets";
import { WalletLeaderboard } from "./blocks/wallet-leaderboard";
import { WalletsHeader } from "./blocks/wallets-header";

export interface ExploreWalletsPageProps extends ComponentPropsWithRef<"div"> {}

/**
 * Composes the Explore Wallets discovery and leaderboard page.
 */
export function ExploreWalletsPage({ className, ref, ...props }: ExploreWalletsPageProps) {
  return (
    <Container
      {...props}
      ref={ref}
      data-page="explore-wallets"
      data-view="list"
      className={cn("flex min-h-0 flex-1 flex-col", className)}
    >
      <WalletsHeader />
      <PageBody className="pb-10">
        <RecentWallets className="pt-4" />
        <WalletLeaderboard className="mt-10" />
      </PageBody>
    </Container>
  );
}
