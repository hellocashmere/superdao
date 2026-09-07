"use client";

import type { ComponentPropsWithRef, ReactNode } from "react";

import { MailBoldIcon, Twitter2BoldIcon } from "@superdao/icons/bold";
import { cn } from "@superdao/lib/utils";
import { Skeleton } from "@superdao/ui/components/skeleton";

import { useGetLabelHighlights } from "@/entities/label";
import { MetricCard } from "@/shared/ui/metric-card";

import { LabelBalanceChart } from "./components/balance-chart";
import { LabelWalletsTable } from "./components/table";

export interface LabelWalletsTabProps extends ComponentPropsWithRef<"div"> {
  tableActions?: ReactNode;
  label: number;
}

/**
 * Composes the highlights and wallet directory shown in the Wallets tab.
 */
export function LabelWalletsTab({ className, label, ref, tableActions, ...props }: LabelWalletsTabProps) {
  const highlightsQuery = useGetLabelHighlights(label);

  if (highlightsQuery.error) throw highlightsQuery.error;
  if (highlightsQuery.isPending) {
    return (
      <Skeleton
        {...props}
        ref={ref}
        className={cn("h-275 w-full rounded-lg", className)}
      />
    );
  }

  return (
    <div
      {...props}
      ref={ref}
      data-slot="label-wallets-tab"
      className={cn("space-y-5", className)}
    >
      <section
        aria-label="Audience highlights"
        className="grid gap-5 md:grid-cols-2 xl:grid-cols-4 xl:grid-rows-[136px_136px]"
      >
        {highlightsQuery.data.metrics.map((metric) => (
          <MetricCard
            key={metric.kind}
            className="xl:nth-1:col-start-1 xl:nth-2:col-start-2 xl:nth-3:col-start-3 xl:nth-4:col-start-1 xl:nth-5:col-start-2 xl:nth-5:row-start-2 xl:nth-6:col-start-3 xl:nth-6:row-start-2 xl:[&:nth-child(4)]:row-start-2"
            title={metric.title}
            tooltip={metric.info}
            value={metric.value}
            description={metric.description}
            footerValue={metric.footerValue}
            footerLabel={metric.footerLabel}
            icon={
              metric.kind === "email" ? (
                <MailBoldIcon size={20} />
              ) : metric.kind === "twitter" ? (
                <Twitter2BoldIcon size={20} />
              ) : undefined
            }
          />
        ))}
        <LabelBalanceChart label={label} />
      </section>
      <LabelWalletsTable
        label={label}
        toolbarActions={tableActions}
      />
    </div>
  );
}
