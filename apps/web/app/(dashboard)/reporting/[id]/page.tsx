import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { parseReportingAccountID, ReportingPage } from "@/widgets/pages/reporting/root";

export const metadata: Metadata = {
  title: "Reporting",
};

/**
 * Renders reporting for the selected numeric account ID.
 */
export default async function Page({ params }: PageProps<"/reporting/[id]">) {
  const { id } = await params;
  const accountID = parseReportingAccountID(id);
  if (accountID === undefined) notFound();

  return <ReportingPage account={accountID} />;
}
