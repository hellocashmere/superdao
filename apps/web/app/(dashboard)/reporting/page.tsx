import type { Metadata } from "next";

import { ReportingPage } from "@/widgets/pages/reporting/root";

export const metadata: Metadata = {
  title: "Reporting",
};

/**
 * Renders the reporting overview route.
 */
export default function Page() {
  return <ReportingPage />;
}
