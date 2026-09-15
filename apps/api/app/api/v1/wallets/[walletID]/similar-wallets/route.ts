import { getAvatarUrl } from "../../../../../../shared/api/avatar-url";
import { failure, success } from "../../../../../../shared/api/response";
import type { RouteParams } from "../../../../../../shared/api/route-params";
import { routeID } from "../../../../../../shared/api/route-params";
import { GENERATED_ENTITY_COUNT } from "../../../../../../shared/config/fixtures";

const names = ["cryptoboss.eth", "0x959D...4A35", "daoist.eth", "AyoeManise", "based.eth", "gm.ton"];

const avatarHashes = [
	"8011097d544d3394192a4931205299aa",
	"8553af2b045a6752c135140a88835e32",
	"13dc38b7e837a16722c6c7b6a695fa46",
];

interface SimilarWallet {
	id: string;
	wallet_id: number;
	similar_wallet_id: number;
	title: string;
	avatar: string;
	score: number;
}

/**
 * Creates generated similar wallets.
 */
function getSimilarWallets(id: number): SimilarWallet[] | undefined {
	if (id > GENERATED_ENTITY_COUNT) return undefined;
	return Array.from({ length: 8 }, (_, index) => {
		const similarWalletID = ((id + index) % GENERATED_ENTITY_COUNT) + 1;
		return {
			id: `${id}-${similarWalletID}`,
			wallet_id: id,
			similar_wallet_id: similarWalletID,
			title: names[index % names.length] ?? "wallet.eth",
			avatar: getAvatarUrl(avatarHashes[index % avatarHashes.length] ?? ""),
			score: 60 + ((id + index * 7) % 40),
		};
	});
}

/**
 * Serves generated similar wallets.
 */
export async function GET(_request: Request, context: RouteParams<"walletID">): Promise<Response> {
	const id = await routeID(context.params, "walletID", "Invalid wallet id.");
	if (id instanceof Response) return id;

	const wallets = getSimilarWallets(id);
	return wallets === undefined ? failure(404, "RESOURCE_NOT_FOUND", "Wallet not found.") : success(wallets);
}
