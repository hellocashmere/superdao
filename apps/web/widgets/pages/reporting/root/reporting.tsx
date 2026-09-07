import type { ComponentPropsWithRef } from "react";
import { notFound } from "next/navigation";

import type { Container } from "@/shared/ui/container";

import { ReportingDashboard } from "./components/reporting-dashboard";
import { getReportingAccount } from "./model/reporting-data";

export interface ReportingPageProps extends ComponentPropsWithRef<typeof Container> {
  account: number;
}

/**
 * Resolves and renders the reporting page for a numeric account ID.
 */
export function ReportingPage({ account: accountID, ...props }: ReportingPageProps) {
  const account = getReportingAccount(accountID);
  if (!account) notFound();

  return (
    <ReportingDashboard
      {...props}
      account={account}
    />
  );
}
