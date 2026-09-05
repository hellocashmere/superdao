import type { ComponentPropsWithRef } from "react";

import { ArrowDownIcon } from "@superdao/icons/outline";
import { cn } from "@superdao/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@superdao/ui/components/card";

import { sourceSummaries } from "../model/reporting-data";

export interface SourceSummaryGridProps extends ComponentPropsWithRef<"section"> {}

/**
 * Renders the source distribution summaries for key reporting events.
 */
export function SourceSummaryGrid({ className, ref, ...props }: SourceSummaryGridProps) {
  return (
    <section
      {...props}
      ref={ref}
      data-slot="source-summary-grid"
      className={cn("grid gap-5 xl:grid-cols-3", className)}
    >
      {sourceSummaries.map((summary) => (
        <Card
          key={summary.title}
          data-scrollable={summary.rows.length > 8}
          className="no-scrollbar h-[405px] overflow-x-hidden data-[scrollable=false]:overflow-y-hidden data-[scrollable=true]:overflow-y-auto"
        >
          <CardHeader>
            <CardTitle
              role="heading"
              aria-level={2}
            >
              {summary.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="grid grid-cols-[minmax(0,1fr)_72px_70px] text-[13px]/[18px] font-semibold text-icon">
              <span>Page_utm_source</span>
              <span className="flex items-center justify-end gap-0.5">
                Count
                <ArrowDownIcon className="size-3" />
              </span>
              <span className="text-right">% count</span>
            </div>
            <div className="py-2">
              {summary.rows.map(([source, count, percent, width]) => (
                <div
                  key={source}
                  className="grid h-8 grid-cols-[minmax(0,1fr)_72px_70px] items-center text-sm/5"
                >
                  <span className="truncate text-[#f2f3f5] first:text-icon">{source}</span>
                  <span className="relative z-0 text-right tabular-nums">
                    <span
                      className="absolute inset-y-[-2px] right-0 -z-10 rounded-sm bg-[#398fe5]/15"
                      style={{ width: `${width}%` }}
                    />
                    {count}
                  </span>
                  <span className="text-right tabular-nums">{percent}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </section>
  );
}
