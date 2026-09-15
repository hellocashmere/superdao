import { getFilteredRows, getListQuery, getSortedRows } from "../../../../shared/api/list-query";
import { getPaginate } from "../../../../shared/api/pagination";
import { invalidQuery } from "../../../../shared/api/query-params";
import { success } from "../../../../shared/api/response";
import { getNftCollections } from "../_fixtures/nft-collection";

interface ExploreResource {
	id: number;
	slug: string;
	title: string;
	avatar: string;
	owners: number;
	active_wallets: number;
	supply: number;
	price: number;
	chain: "ethereum" | "polygon";
	wallet_count: number;
}
/**
 * Serves the generated NFT collection directory.
 */
export function GET(request: Request): Response {
	const query = getListQuery(request);
	if (query instanceof Response) return query;
	if (query.sort !== undefined && query.sort !== "name") return invalidQuery("Unsupported sort.");
	const collections: ExploreResource[] = getNftCollections();
	const filteredCollections = getFilteredRows(collections, query.query, (collection) => collection.title);
	const sortedCollections = getSortedRows(filteredCollections, query.sort, query.order, (left, right) =>
		left.title.localeCompare(right.title)
	);
	const result = getPaginate(sortedCollections, query.pagination);
	return success(result.data, result.metadata);
}
