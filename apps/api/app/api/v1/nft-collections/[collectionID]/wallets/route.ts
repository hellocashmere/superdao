import { getFilteredRows, getListQuery, getSortedRows } from "../../../../../../shared/api/list-query";
import { getPaginate } from "../../../../../../shared/api/pagination";
import { invalidQuery } from "../../../../../../shared/api/query-params";
import { failure, success } from "../../../../../../shared/api/response";
import type { RouteParams } from "../../../../../../shared/api/route-params";
import { routeID } from "../../../../../../shared/api/route-params";
import { GENERATED_ENTITY_COUNT } from "../../../../../../shared/config/fixtures";
import { getAudienceWallets } from "../../../_fixtures/audience";

interface AudienceWalletActivity {
	avatar: string;
	title: string;
}
type AudienceWalletContact = "email" | "link" | "mirror" | "opensea" | "twitter";

interface AudienceWalletTag {
	title: string;
	variant: "blue" | "green" | "orange" | "pink" | "purple" | "yellow";
}

interface NftCollectionWallet {
	id: number;
	nft_collection_id: number;
	title: string;
	avatar: string;
	rank: number;
	age: string;
	age_details?: string;
	labels: AudienceWalletTag[];
	balance: number;
	nfts: number;
	twitter: number | null;
	activity: AudienceWalletActivity[];
	contacts: AudienceWalletContact[];
}

/**
 * Serves generated wallets associated with a NFT collection.
 */
export async function GET(request: Request, context: RouteParams<"collectionID">): Promise<Response> {
	const id = await routeID(context.params, "collectionID", "Invalid NFT collection id.");
	if (id instanceof Response) return id;
	const fixtures = getAudienceWallets(id, GENERATED_ENTITY_COUNT);
	const wallets: NftCollectionWallet[] | undefined = fixtures?.map((wallet) => ({
		...wallet,
		nft_collection_id: id,
	}));
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
