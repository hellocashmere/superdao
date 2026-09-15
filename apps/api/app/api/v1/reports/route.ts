import { getListQuery } from "../../../../shared/api/list-query";
import { getPaginate } from "../../../../shared/api/pagination";
import { success } from "../../../../shared/api/response";
import { getReports } from "../_fixtures/report";

interface ReportSummary {
	id: number;
	title: string;
}

/**
 * Serves sidebar reporting accounts.
 */
export function GET(request: Request): Response {
	const query = getListQuery(request, { defaultLimit: 16, keys: ["limit", "offset"] });
	if (query instanceof Response) return query;
	const reports: ReportSummary[] = getReports();
	const result = getPaginate(reports, query.pagination);
	return success(result.data, result.metadata);
}
