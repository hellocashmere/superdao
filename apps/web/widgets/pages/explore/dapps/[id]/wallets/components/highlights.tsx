import type { ComponentPropsWithRef } from "react";

import { MailBoldIcon, Twitter2BoldIcon } from "@superdao/icons/bold";
import { cn } from "@superdao/lib/utils";

import { useGetDappHighlights } from "@/entities/dapp";
import { MetricCard } from "@/shared/ui/metric-card";

import { DappBalanceChart } from "./balance-chart";

export interface DappHighlightsProps extends ComponentPropsWithRef<"section"> {
  dappID: string;
}

/**
 * Renders audience highlights for the selected dapp.
 */
export function DappHighlights({ className, dappID, ref, ...props }: DappHighlightsProps) {
  const highlightsQuery = useGetDappHighlights(dappID);

  if (highlightsQuery.error) throw highlightsQuery.error;
  if (highlightsQuery.isPending) return null;

  return (
    <section
      {...props}
      ref={ref}
      aria-label="Dapp audience highlights"
      data-slot="dapp-highlights"
      className={cn("grid gap-5 md:grid-cols-2 xl:grid-cols-4 xl:grid-rows-[136px_136px]", className)}
    >
      {highlightsQuery.data.metrics.map((metric) => (
        <MetricCard
          key={metric.kind}
          title={metric.title} value={metric.value} description={metric.description} footerValue={metric.footerValue} footerLabel={metric.footerLabel} tooltip={metric.info}
          icon={metric.kind === "email" ? <MailBoldIcon size={20} /> : metric.kind === "twitter" ? <Twitter2BoldIcon size={20} /> : undefined}
        />
      ))}
      <DappBalanceChart data={highlightsQuery.data.balanceDistribution} />
    </section>
  );
}
