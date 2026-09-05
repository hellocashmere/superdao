"use client";

import type { ComponentPropsWithRef } from "react";
import { useRouter } from "next/navigation";

import { ArrowLeftIcon } from "@superdao/icons/outline";
import { cn } from "@superdao/lib/utils";
import { Button } from "@superdao/ui/components/button";

import { WalletSearch } from "@/features/wallet-search";
import { Container } from "@/shared/ui/container";
import { PageBody, PageHeader } from "@/shared/ui/page-layout";

import { WalletActivity } from "./components/activity";
import { WalletContacts } from "./components/contacts";
import { WalletIDHeader } from "./components/header";
import { WalletLabels } from "./components/labels";
import { WalletSimilarWallets } from "./components/similar-wallets";
import { WalletTransactions } from "./components/transactions";

export interface ExploreWalletDetailsPageProps extends ComponentPropsWithRef<"div"> {
  /**
   * The route identifier of the wallet to display.
   */
  id: string;
}

/**
 * Renders the detail page for the wallet identifier in the current URL.
 */
export function ExploreWalletDetailsPage({ className, id, ref, ...props }: ExploreWalletDetailsPageProps) {
  const router = useRouter();

  return (
    <Container
      {...props}
      ref={ref}
      data-page="explore-wallet-details"
      data-slot="wallet-details"
      className={cn("flex min-h-0 flex-1 flex-col", className)}
    >
      <PageHeader className="flex min-h-18 items-center justify-between gap-4">
        <Button
          variant="ghost"
          className="h-auto gap-3 rounded-none p-0 text-2xl/7 font-bold hover:bg-transparent active:translate-y-0 active:bg-transparent"
          type="button"
          onClick={() => router.push("/explore/wallets")}
        >
          <ArrowLeftIcon className="size-6 text-tabs-foreground" />
          Wallets
        </Button>
        <WalletSearch />
      </PageHeader>

      <PageBody className="space-y-5 pb-16">
        <WalletIDHeader id={id} />
        <WalletContacts id={id} />
        <WalletLabels id={id} />
        <WalletActivity id={id} />
        <WalletTransactions id={id} />
        <WalletSimilarWallets id={id} />
      </PageBody>
    </Container>
  );
}
