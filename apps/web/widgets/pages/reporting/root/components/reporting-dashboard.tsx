"use client";

import type { ComponentPropsWithRef } from "react";
import { useMemo, useState } from "react";

import { cn } from "@superdao/lib/utils";

import { Container } from "@/shared/ui/container";
import { PageBody, PageHeader } from "@/shared/ui/page-layout";

import type { ReportingAccount, ReportingDateRange, ReportingPeriod } from "../model/reporting-data";
import { reportingWallets } from "../model/reporting-data";

import { ConversionChart } from "./conversion-chart";
import { ReportingTable } from "./reporting-table";
import { SourceSummaryGrid } from "./source-summary-grid";

export interface ReportingDashboardProps extends ComponentPropsWithRef<typeof Container> {
  account: ReportingAccount;
}

/**
 * Renders the interactive reporting dashboard for a resolved account.
 */
export function ReportingDashboard({ account, className, ref, ...props }: ReportingDashboardProps) {
  const [query, setQuery] = useState("");
  const [actions, setActions] = useState<readonly string[]>([]);
  const [sources, setSources] = useState<readonly string[]>([]);
  const [labels, setLabels] = useState<readonly string[]>([]);
  const [period, setPeriod] = useState<ReportingPeriod>("All time");
  const [dateRange, setDateRange] = useState<ReportingDateRange>();

  const filteredWallets = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return reportingWallets.filter((wallet) => {
      const matchesQuery = !normalizedQuery || wallet.wallet.toLowerCase().includes(normalizedQuery);
      const matchesAction = actions.length === 0 || actions.includes(wallet.target);
      const matchesSource = sources.length === 0 || sources.includes(wallet.source);
      const matchesLabels = labels.length === 0 || labels.some((label) => wallet.labels.includes(label));
      const matchesPeriod = walletMatchesPeriod(wallet.occurredAt, period, dateRange);

      return matchesQuery && matchesAction && matchesSource && matchesLabels && matchesPeriod;
    });
  }, [actions, dateRange, labels, period, query, sources]);

  return (
    <Container
      {...props}
      ref={ref}
      data-slot="reporting-dashboard"
      className={cn("flex min-h-0 flex-1 flex-col lg:px-8", className)}
    >
      <PageHeader className="flex min-h-18 items-center">
        <div className="flex items-end gap-3">
          <h1 className="font-heading text-2xl/[28px] font-bold">{account.name}</h1>
          <span className="pb-0.5 text-xl/6 font-bold text-[#717a8c]">{account.walletCount}</span>
        </div>
      </PageHeader>
      <PageBody className="space-y-5 pb-14">
        <ConversionChart />
        <SourceSummaryGrid />
        <ReportingTable
          wallets={filteredWallets}
          query={query}
          selectedActions={actions}
          selectedSources={sources}
          selectedLabels={labels}
          period={period}
          dateRange={dateRange}
          onQueryChange={setQuery}
          onActionsChange={setActions}
          onSourcesChange={setSources}
          onLabelsChange={setLabels}
          onPeriodChange={(nextPeriod, nextRange) => {
            setPeriod(nextPeriod);
            setDateRange(nextRange);
          }}
          onResetFilters={() => {
            setQuery("");
            setActions([]);
            setSources([]);
            setLabels([]);
            setPeriod("All time");
            setDateRange(undefined);
          }}
        />
      </PageBody>
    </Container>
  );
}

function walletMatchesPeriod(occurredAt: string, period: ReportingPeriod, range?: ReportingDateRange) {
  if (period === "All time") return true;

  const occurred = new Date(occurredAt);

  if (period === "Custom period") {
    if (!range?.from) return true;

    const from = new Date(range.from);
    from.setHours(0, 0, 0, 0);
    const to = new Date(range.to ?? range.from);
    to.setHours(23, 59, 59, 999);

    return occurred >= from && occurred <= to;
  }

  const end = new Date(2026, 7, 28, 23, 59, 59, 999);
  const start = new Date(end);
  const days = period === "Today" ? 0 : period === "Last 7 days" ? 6 : 29;
  start.setDate(start.getDate() - days);
  start.setHours(0, 0, 0, 0);

  return occurred >= start && occurred <= end;
}
