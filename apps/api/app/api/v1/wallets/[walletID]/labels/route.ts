import { failure, success } from "../../../../../../shared/api/response";
import type { RouteParams } from "../../../../../../shared/api/route-params";
import { routeID } from "../../../../../../shared/api/route-params";
import { GENERATED_ENTITY_COUNT } from "../../../../../../shared/config/fixtures";

const seeds = [
	["Developer", "constructive"],
	["Crypto native", "fuchsia"],
	["Gamer", "yellow"],
	["ENS", "blue"],
	["Whale", "amber"],
	["Non-human", "cyan"],
	["Collector", "primary"],
	["Early adopter", "violet"],
] as const;

interface WalletLabel {
	id: string;
	wallet_id: number;
	label: string;
	variant: "amber" | "blue" | "constructive" | "cyan" | "fuchsia" | "primary" | "violet" | "yellow";
}

/**
 * Creates generated labels for one wallet.
 */
function getWalletLabels(id: number): WalletLabel[] | undefined {
	if (id > GENERATED_ENTITY_COUNT) return undefined;

	const labelCount = 3 + (id % 6);

	return Array.from({ length: labelCount }, (_, index) => {
		const [label, tone] = seeds[(id + index) % seeds.length] ?? seeds[0];
		return { id: `${id}-label-${index + 1}`, wallet_id: id, label, variant: tone };
	});
}

/**
 * Serves generated wallet labels.
 */
export async function GET(_request: Request, context: RouteParams<"walletID">): Promise<Response> {
	const id = await routeID(context.params, "walletID", "Invalid wallet id.");
	if (id instanceof Response) return id;

	const labels = getWalletLabels(id);
	return labels === undefined ? failure(404, "RESOURCE_NOT_FOUND", "Wallet not found.") : success(labels);
}
