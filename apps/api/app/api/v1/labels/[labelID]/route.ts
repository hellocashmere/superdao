import { parseID } from "../../../../../shared/api/query-params";
import { failure, success } from "../../../../../shared/api/response";
import type { RouteParams } from "../../../../../shared/api/route-params";
import { getLabel } from "../../_fixtures/label";

interface Label {
	id: number;
	slug: string;
	title: string;
	wallet_count: number;
	color: string;
	category: "interest" | "persona";
}

/**
 * Serves one generated label.
 */
export async function GET(_request: Request, context: RouteParams<"labelID">): Promise<Response> {
	const { labelID } = await context.params;
	const id = parseID(labelID);
	if (id === null) return failure(400, "INVALID_QUERY", "Invalid label id.");

	const label: Label | undefined = getLabel(id);
	return label === undefined ? failure(404, "RESOURCE_NOT_FOUND", "Label not found.") : success(label);
}
