import { getAvatarUrl } from "../../../../../../shared/api/avatar-url";
import { failure, success } from "../../../../../../shared/api/response";
import type { RouteParams } from "../../../../../../shared/api/route-params";
import { routeID } from "../../../../../../shared/api/route-params";
import { isDemoProfileWallet } from "../../../../../../shared/config/demo-profile";
import { GENERATED_ENTITY_COUNT } from "../../../../../../shared/config/fixtures";

const names = ["Nakamigos", "ENS domains", "Art Blocks", "Meebits", "Azuki", "Potatoz", "Wrapped Cryptopunks"];

const avatarHashes = [
	"13f789cec096eaa9226cb1759fc74954",
	"190842423a18e1e6e14e3cc9e06bf656",
	"1f79e197d628f529836a2ddd3d4c93d5",
];

interface WalletActivity {
	id: string;
	wallet_id: number;
	title: string;
	avatar: string;
}

/**
 * Creates generated activity for one wallet.
 */
function getWalletActivity(id: number): WalletActivity[] | undefined {
	if (id > GENERATED_ENTITY_COUNT) return undefined;

	const activityCount = isDemoProfileWallet(id) ? 8 : 4 + (id % 5);

	return Array.from({ length: activityCount }, (_, index) => ({
		id: `${id}-activity-${index + 1}`,
		wallet_id: id,
		title: names[(id + index) % names.length] ?? "Collection",
		avatar: getAvatarUrl(avatarHashes[(id + index) % avatarHashes.length] ?? ""),
	}));
}

/**
 * Serves generated wallet activity.
 */
export async function GET(_request: Request, context: RouteParams<"walletID">): Promise<Response> {
	const id = await routeID(context.params, "walletID", "Invalid wallet id.");
	if (id instanceof Response) return id;

	const activity = getWalletActivity(id);
	return activity === undefined ? failure(404, "RESOURCE_NOT_FOUND", "Wallet not found.") : success(activity);
}
