import { getFilteredRows, getListQuery, getSortedRows } from "../../../../../../shared/api/list-query";
import { getPaginate } from "../../../../../../shared/api/pagination";
import { invalidQuery } from "../../../../../../shared/api/query-params";
import { failure, success } from "../../../../../../shared/api/response";
import type { RouteParams } from "../../../../../../shared/api/route-params";
import { routeID } from "../../../../../../shared/api/route-params";
import { getAudienceWallets } from "../../../_fixtures/audience";
import { LABEL_ENTITY_COUNT } from "../../../_fixtures/label";

type AudienceWalletContact = "email" | "link" | "mirror" | "opensea" | "twitter";

interface LabelWalletTag {
	title: string;
	variant: "blue" | "green" | "orange" | "pink" | "purple" | "yellow";
}
interface LabelWalletActivity {
	avatar: string;
	title: string;
}

interface LabelWallet {
	id: number;
	label_id: number;
	title: string;
	avatar: string;
	rank: number;
	age: string;
	age_details?: string;
	labels: LabelWalletTag[];
	balance: number;
	nfts: number;
	twitter: number | null;
	activity: LabelWalletActivity[];
	contacts: AudienceWalletContact[];
}

/**
 * Serves generated wallets associated with a label.
 */
export async function GET(request: Request, context: RouteParams<"labelID">): Promise<Response> {
	const id = await routeID(context.params, "labelID", "Invalid label id.");
	if (id instanceof Response) return id;
	const fixtures = getAudienceWallets(id, LABEL_ENTITY_COUNT);
	const wallets: LabelWallet[] | undefined = fixtures?.map((wallet) => ({ ...wallet, label_id: id }));
	if (wallets === undefined) return failure(404, "RESOURCE_NOT_FOUND", "Resource not found.");

	const query = getListQuery(request, {
		defaultLimit: 12,
		keys: ["q", "label", "limit", "offset", "sort", "order"],
		repeatedKeys: ["label"],
	});
	if (query instanceof Response) return query;
	if (query.sort !== undefined && query.sort !== "index" && query.sort !== "rank")
		return invalidQuery("Unsupported sort.");

	const labels = (query.repeated.label ?? []).map((label) => label.toLowerCase());
	const filteredWallets = getFilteredRows(wallets, query.query, (wallet) => wallet.title).filter(
		(wallet) => labels.length === 0 || wallet.labels.some((label) => labels.includes(label.title.toLowerCase()))
	);
	const sortedWallets = getSortedRows(filteredWallets, query.sort, query.order, (left, right) =>
		query.sort === "rank" ? left.rank - right.rank : left.id - right.id
	);
	const result = getPaginate(sortedWallets, query.pagination);
	return success(result.data, result.metadata);
}
