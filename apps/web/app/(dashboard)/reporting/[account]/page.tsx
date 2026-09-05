import type { Metadata } from "next";

import { ReportingPage } from "@/widgets/pages/reporting/root";

export async function generateMetadata({ params }: PageProps<"/reporting/[account]">): Promise<Metadata> {
  const { account } = await params;

  return {
    title: `Reporting (${account})`,
  };
}

/** Renders reporting for the selected account. */
export default async function Page({ params }: PageProps<"/reporting/[account]">) {
  const { account } = await params;

  return <ReportingPage account={account} />;
}
