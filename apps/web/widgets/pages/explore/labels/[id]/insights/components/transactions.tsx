import type { ComponentPropsWithRef } from "react";

import { InfoSmallIcon } from "@superdao/icons/outline";
import { cn } from "@superdao/lib/utils";
import { Card } from "@superdao/ui/components/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "@superdao/ui/components/tooltip";

import type { LabelTransactionStatView } from "@/entities/label";

export interface LabelInsightTransactionsProps extends ComponentPropsWithRef<typeof Card> {
  stats: readonly LabelTransactionStatView[];
}

/**
 * Renders the last-thirty-day transaction summary for a label audience.
 */
export function LabelInsightTransactions({ className, ref, stats, ...props }: LabelInsightTransactionsProps) {
  return (
    <Card
      {...props}
      ref={ref}
      data-slot="label-insight-transactions"
      className={cn("min-h-29 p-3", className)}
    >
      <div className="flex items-center gap-2 text-sm/5 font-semibold text-tabs-foreground">
        <span>Last 30d transactions</span>
        <Tooltip>
          <TooltipTrigger
            render={
              <button
                type="button"
                className="inline-flex size-4 cursor-help items-center justify-center rounded-sm text-[#717a8c] outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
                aria-label="About last 30 day transactions"
              />
            }
          >
            <InfoSmallIcon size={16} />
          </TooltipTrigger>
          <TooltipContent
            side="right"
            sideOffset={8}
            className="max-w-64 font-normal"
          >
            Aggregated onchain transactions completed by audience wallets during the last 30 days.
          </TooltipContent>
        </Tooltip>
      </div>
      <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label}>
            <p
              data-tone={stat.tone}
              className="text-xl/6 font-bold data-[tone=negative]:text-[#ff5471] data-[tone=positive]:text-[#32d74b]"
            >
              {stat.value}
            </p>
            <p className="mt-1 text-[15px]/6 font-semibold text-tabs-foreground">{stat.label}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}
