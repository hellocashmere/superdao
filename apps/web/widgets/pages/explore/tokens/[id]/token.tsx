"use client";

import type { ComponentPropsWithRef } from "react";

import { RefreshIcon } from "@superdao/icons/outline";
import { cn } from "@superdao/lib/utils";
import { Alert, AlertDescription, AlertTitle } from "@superdao/ui/components/alert";
import { Tabs, TabsContent } from "@superdao/ui/components/tabs";

import { useGetToken } from "@/entities/token";
import { throwResourceError } from "@/shared/api";
import { Container } from "@/shared/ui/container";
import { PageBody } from "@/shared/ui/page-layout";

import { TokenIDHeader } from "./components/header";
import { TokenDetailsSkeleton } from "./components/skeleton";
import { TokenInsightsTab } from "./insights/insights";
import { TokenWalletsTab } from "./wallets/wallets";

export interface ExploreTokenDetailsPageProps extends ComponentPropsWithRef<"div"> {
  /**
   * Backend-provided ID of the token to display.
   */
  tokenID: number;
  tab: "insights" | "wallets";
}

/**
 * Renders the wallet directory for a selected token.
 */
export function ExploreTokenDetailsPage({ className, ref, tab, tokenID, ...props }: ExploreTokenDetailsPageProps) {
  const tokenQuery = useGetToken(tokenID);
  if (tokenQuery.error) throwResourceError(tokenQuery.error);

  if (tokenQuery.isPending) {
    return (
      <TokenDetailsSkeleton
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
      data-page="explore-token-details"
      className={cn("flex min-h-0 flex-1 flex-col", className)}
    >
      <Tabs
        value={tab}
        className="gap-0"
      >
        <TokenIDHeader token={tokenQuery.data} />
        <Alert
          className="mb-5"
          variant="constructive"
        >
          <RefreshIcon aria-hidden="true" />
          <AlertTitle>Token balances are reconciled every day</AlertTitle>
          <AlertDescription>
            Each refresh folds in the latest indexed transfers and recalculates wallet rankings.
          </AlertDescription>
        </Alert>
        <PageBody className="pb-16">
          <TabsContent value="wallets">{tab === "wallets" ? <TokenWalletsTab tokenID={tokenID} /> : null}</TabsContent>
          <TabsContent value="insights">
            {tab === "insights" ? <TokenInsightsTab tokenID={tokenID} /> : null}
          </TabsContent>
        </PageBody>
      </Tabs>
    </Container>
  );
}
