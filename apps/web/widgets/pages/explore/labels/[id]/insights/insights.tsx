"use client";

import type { ComponentPropsWithRef } from "react";

import { cn } from "@superdao/lib/utils";
import { Skeleton } from "@superdao/ui/components/skeleton";
import { MetricCard } from "@/shared/ui/metric-card";

import { useGetLabelInsights } from "@/entities/label";

import { LabelInsightTransactions } from "./components/transactions";

import { LabelAudienceOverlapTable } from "./components/audience-overlap-table";
import { LabelInsightBarChart } from "./components/bar-chart";
import { LabelTwitterInfluencersTable } from "./components/twitter-influencers-table";

export interface LabelInsightsTabProps extends ComponentPropsWithRef<"div"> {
  label: string;
}

/**
 * Composes the analytics blocks shown in the label Insights tab.
 */
export function LabelInsightsTab({ className, label, ref, ...props }: LabelInsightsTabProps) {
  const insightsQuery = useGetLabelInsights(label);

  if (insightsQuery.error) throw insightsQuery.error;
  if (insightsQuery.isPending) {
    return (
      <Skeleton
        {...props}
        ref={ref}
        className={cn("h-225 w-full rounded-lg", className)}
      />
    );
  }

  const insights = insightsQuery.data;

  return (
    <div
      {...props}
      ref={ref}
      data-slot="label-insights-tab"
      className={cn("space-y-6", className)}
    >
      <section>
        <h2 className="mb-4 text-xl/6 font-bold">Balances and transactions</h2>
        <div className="grid gap-5 xl:grid-cols-4">
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-1">
            {insights.balanceMetrics.map((metric) => (
              <MetricCard
                key={metric.title}
                title={metric.title}
                tooltip={metric.info}
                value={metric.value}
                description={metric.description}
                footerValue={metric.footer}
              />
            ))}
          </div>
          <LabelInsightBarChart
            label={label}
            dataKey="walletBalance"
            title="Wallet balance, USD"
            description="Based on ETH, USDT, USDC, DAI"
          />
          <LabelInsightBarChart
            className="xl:col-span-2"
            label={label}
            dataKey="nftAllocation"
            title="NFT allocation"
            description="NFTs per wallet"
            tone="cyan"
          />
        </div>
        <LabelInsightTransactions
          className="mt-5"
          stats={insights.transactionStats}
        />
      </section>

      <section>
        <h2 className="mb-4 text-xl/6 font-bold">Contacts</h2>
        <div className="grid gap-5 xl:grid-cols-[245px_1fr]">
          <div className="space-y-5">
            {insights.contactMetrics.map((metric) => (
              <MetricCard
                key={metric.title}
                title={metric.title}
                tooltip={metric.info}
                value={metric.value}
                description={metric.description}
                footerValue={metric.footer}
              />
            ))}
          </div>
          <LabelTwitterInfluencersTable label={label} />
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-xl/6 font-bold">Wallet profile</h2>
        <div className="grid gap-5 lg:grid-cols-2">
          <LabelInsightBarChart
            label={label}
            dataKey="superrank"
            title="Superrank"
            tone="multi"
          />
          <LabelInsightBarChart
            label={label}
            dataKey="interests"
            title="Interests"
            tone="cyan"
          />
          <LabelInsightBarChart
            className="lg:col-span-2"
            label={label}
            dataKey="personas"
            title="Personas"
            tone="cyan"
          />
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-xl/6 font-bold">Audience overlap</h2>
        <LabelAudienceOverlapTable label={label} />
      </section>
    </div>
  );
}
