"use client";

import type { ComponentPropsWithRef } from "react";

import { WarningIcon } from "@superdao/icons/outline";
import { cn } from "@superdao/lib/utils";
import { Alert, AlertDescription, AlertTitle } from "@superdao/ui/components/alert";
import { Tabs, TabsContent } from "@superdao/ui/components/tabs";

import { useGetDapp } from "@/entities/dapp";
import { throwResourceError } from "@/shared/api";
import { Container } from "@/shared/ui/container";
import { PageBody } from "@/shared/ui/page-layout";

import { DappIDHeader } from "./components/header";
import { DappDetailsSkeleton } from "./components/skeleton";
import { DappInsightsTab } from "./insights/insights";
import { DappWalletsTab } from "./wallets/wallets";

export interface ExploreDappDetailsPageProps extends ComponentPropsWithRef<"div"> {
  /**
   * Backend-provided ID of the dapp to display.
   */
  dappID: number;
  tab: "insights" | "wallets";
}

/**
 * Renders the wallet directory for a selected dapp.
 */
export function ExploreDappDetailsPage({ className, dappID, ref, tab, ...props }: ExploreDappDetailsPageProps) {
  const dappQuery = useGetDapp(dappID);
  if (dappQuery.error) throwResourceError(dappQuery.error);

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
        <Alert
          className="mb-5"
          variant="destructive"
        >
          <WarningIcon aria-hidden="true" />
          <AlertTitle>Dapp activity is not real time</AlertTitle>
          <AlertDescription>
            New interactions can take up to 24 hours to reach wallet activity and ranking metrics.
          </AlertDescription>
        </Alert>
        <PageBody className="pb-16">
          <TabsContent value="wallets">{tab === "wallets" ? <DappWalletsTab dappID={dappID} /> : null}</TabsContent>
          <TabsContent value="insights">{tab === "insights" ? <DappInsightsTab dappID={dappID} /> : null}</TabsContent>
        </PageBody>
      </Tabs>
    </Container>
  );
}
