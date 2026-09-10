import { failure, success } from "../../../../../../shared/api/response";
import type { RouteParams } from "../../../../../../shared/api/route-params";
import { routeID } from "../../../../../../shared/api/route-params";
import { GENERATED_ENTITY_COUNT } from "../../../../../../shared/config/fixtures";

const seeds = [
	["OpenSea", "opensea"],
	["Zapper", "zapper"],
	["Etherscan", "etherscan"],
	["Polygonscan", "polygonscan"],
	["cashmere_ton", "twitter"],
	["cashmere.lens", "lens"],
	["cashmere", "mirror"],
	["Email", "email"],
] as const;

interface WalletContact {
	id: string;
	wallet_id: number;
	label: string;
	provider: "email" | "etherscan" | "lens" | "mirror" | "opensea" | "polygonscan" | "twitter" | "zapper";
}

/**
 * Creates generated contacts for one wallet.
 */
function getWalletContacts(id: number): WalletContact[] | undefined {
	if (id > GENERATED_ENTITY_COUNT) return undefined;
	return seeds.map(([label, provider]) => ({ id: `${id}-contact-${provider}`, wallet_id: id, label, provider }));
}

/**
 * Serves generated wallet contacts.
 */
export async function GET(_request: Request, context: RouteParams<"walletID">): Promise<Response> {
	const id = await routeID(context.params, "walletID", "Invalid wallet id.");
	if (id instanceof Response) return id;
	const contacts = getWalletContacts(id);
	return contacts === undefined ? failure(404, "RESOURCE_NOT_FOUND", "Wallet not found.") : success(contacts);
}
