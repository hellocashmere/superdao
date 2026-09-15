import { parseID } from "../../../../../shared/api/query-params";
import { failure, success } from "../../../../../shared/api/response";
import type { RouteParams } from "../../../../../shared/api/route-params";
import { getReport } from "../../_fixtures/report";

interface Report {
	id: number;
	title: string;
	wallet_count: number;
	wallets: Array<{
		id: number;
		wallet: string;
		avatar: string;
		occurred_at: string;
		rank: number;
		target: "WALLET_CONNECT" | "PAGE_VIEW" | "TARGET_ACTION_MINT";
		source: string;
		labels: string[];
		balance: number;
		nfts: number;
		contacts: Array<"link" | "mirror" | "opensea" | "twitter">;
	}>;
	source_summaries: Array<{
		title: string;
		rows: Array<{ source: string; count: number; percent: number; width: number }>;
	}>;
	conversion_data: Array<{ date: string; page_view: number; wallet_connect: number; mint: number }>;
}

/**
 * Serves one generated report.
 */
export async function GET(_request: Request, context: RouteParams<"reportID">): Promise<Response> {
	const { reportID } = await context.params;
	const id = parseID(reportID);
	if (id === null) return failure(400, "INVALID_QUERY", "Invalid report id.");

	const report: Report | undefined = getReport(id);
	return report === undefined ? failure(404, "RESOURCE_NOT_FOUND", "Report not found.") : success(report);
}
