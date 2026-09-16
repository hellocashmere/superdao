import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { parseRouteID } from "@/shared/lib/parse-route-id";
import { ReportingPage } from "@/widgets/pages/reporting/[id]";

export const metadata: Metadata = {
	title: "Reporting",
};

/**
 * Renders reporting for the selected numeric account ID.
 */
export default async function Page({ params }: PageProps<"/reporting/[id]">) {
	const { id } = await params;
	const accountID = parseRouteID(id);
	if (accountID === undefined) notFound();

	return <ReportingPage accountID={accountID} />;
}
