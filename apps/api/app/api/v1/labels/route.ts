import { getListQuery } from "../../../../shared/api/list-query";
import { getPaginate } from "../../../../shared/api/pagination";
import { invalidQuery, stableSort } from "../../../../shared/api/query-params";
import { success } from "../../../../shared/api/response";
import { getLabels } from "../_fixtures/label";

interface Label {
	id: number;
	slug: string;
	title: string;
	wallet_count: number;
	color: string;
	category: "interest" | "persona";
}

/**
 * Serves the generated label directory.
 */
export function GET(request: Request): Response {
	const query = getListQuery(request, {
		defaultLimit: 16,
		keys: ["q", "category", "limit", "offset", "sort", "order"],
	});
	if (query instanceof Response) return query;
	const category = query.values.category;
	if (category !== undefined && category !== "interest" && category !== "persona")
		return invalidQuery("Unsupported category.");
	if (query.sort !== undefined && query.sort !== "name" && query.sort !== "category")
		return invalidQuery("Unsupported sort.");
	const needle = query.query?.trim().toLowerCase();
	let labels: Label[] = getLabels().filter(
		(label) =>
			(needle === undefined || label.title.toLowerCase().includes(needle)) &&
			(category === undefined || label.category === category)
	);
	if (query.sort !== undefined) {
		labels = stableSort(labels, (left, right) => {
			const field = query.sort === "name" ? "title" : "category";
			return (query.order === "desc" ? -1 : 1) * left[field].localeCompare(right[field]);
		});
	}
	const result = getPaginate(labels, query.pagination);
	return success(result.data, result.metadata);
}
