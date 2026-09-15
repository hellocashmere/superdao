import { failure, success } from "../../../../../../shared/api/response";
import type { RouteParams } from "../../../../../../shared/api/route-params";
import { routeID } from "../../../../../../shared/api/route-params";
import { isDemoProfileWallet } from "../../../../../../shared/config/demo-profile";
import { GENERATED_ENTITY_COUNT } from "../../../../../../shared/config/fixtures";

const seeds = [
	["OpenSea", "opensea"],
	["Zapper", "zapper"],
	["Etherscan", "etherscan"],
	["Polygonscan", "polygonscan"],
	["cashmere", "twitter"],
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

	const contactCount = isDemoProfileWallet(id) ? seeds.length : 3 + (id % 6);

	return Array.from({ length: contactCount }, (_, index) => {
		const [label, provider] = seeds[(id + index) % seeds.length] ?? seeds[0];

		return { id: `${id}-contact-${provider}`, wallet_id: id, label, provider };
	});
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
