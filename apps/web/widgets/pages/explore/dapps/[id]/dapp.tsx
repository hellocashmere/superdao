"use client";

import type { ComponentPropsWithRef } from "react";

import { cn } from "@superdao/lib/utils";
import { InfoIcon } from "@superdao/icons/outline";
import { Alert, AlertDescription, AlertTitle } from "@superdao/ui/components/alert";
import { Tabs, TabsContent } from "@superdao/ui/components/tabs";

import { useGetDapp } from "@/entities/dapp";
import { Container } from "@/shared/ui/container";
import { PageBody } from "@/shared/ui/page-layout";

import { DappIDHeader } from "./components/header";
import { DappDetailsSkeleton } from "./components/skeleton";
import { DappInsightsTab } from "./insights/insights";
import { DappWalletsTab } from "./wallets/wallets";

export interface ExploreDappDetailsPageProps extends ComponentPropsWithRef<"div"> {
  /**
   * Route identifier of the dapp to display.
   */
  dappID: string;
  tab: "insights" | "wallets";
}

/**
 * Renders the wallet directory for a selected dapp.
 */
export function ExploreDappDetailsPage({ className, dappID, ref, tab, ...props }: ExploreDappDetailsPageProps) {
  const dappQuery = useGetDapp(dappID);
  if (dappQuery.error) throw dappQuery.error;

  if (dappQuery.isPending) {
    return (
      <DappDetailsSkeleton
        {...props}
        ref={ref}
        className={className}
      />
    );
  }

  return (
    <Container
      {...props}
      ref={ref}
      data-page="explore-dapp-details"
      className={cn("flex min-h-0 flex-1 flex-col", className)}
    >
      <Tabs
        value={tab}
        className="gap-0"
      >
        <DappIDHeader dapp={dappQuery.data} />
        <Alert className="mb-5" variant="info"><InfoIcon aria-hidden="true" /><AlertTitle>Wallet data is updated daily</AlertTitle><AlertDescription>Metrics may take up to 24 hours to reflect the latest on-chain activity.</AlertDescription></Alert>
        <PageBody className="pb-16">
          <TabsContent value="wallets">{tab === "wallets" ? <DappWalletsTab dappID={dappID} /> : null}</TabsContent>
          <TabsContent value="insights">{tab === "insights" ? <DappInsightsTab dappID={dappID} /> : null}</TabsContent>
        </PageBody>
      </Tabs>
    </Container>
  );
}
