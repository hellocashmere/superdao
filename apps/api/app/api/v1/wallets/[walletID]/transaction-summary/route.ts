import { failure, success } from "../../../../../../shared/api/response";
import type { RouteParams } from "../../../../../../shared/api/route-params";
import { routeID } from "../../../../../../shared/api/route-params";
import { GENERATED_ENTITY_COUNT } from "../../../../../../shared/config/fixtures";

const seeds = [
	["Sent", "-0,01 ETH", "Ethereum", "Apr 20, 2023", "negative", "up", "transfer", "/tokens/ethereum.png"],
	["Received", "+849,984 USDC", "USD Coin (PoS)", "Apr 19, 2023", "positive", "down", "transfer", "/tokens/usdc.png"],
	["Contract", "–", "0x949u...98H5", "Apr 14, 2023", "muted", "none", "contract", "/tokens/contract.png"],
	["Approved", "–", "Tether USD", "Apr 8, 2023", "muted", "none", "approved", "/tokens/tether.png"],
	["Unknown", "–", "–", "Mar 27, 2023", "muted", "none", "unknown", null],
] as const;

interface WalletTransactionSummary {
	id: number;
	wallet_id: number;
	title: string;
	tooltip: string;
	metrics: Array<{ id: string; label: string; value: string; tone: "default" | "negative" | "positive" }>;
	transactions: Array<{
		id: string;
		type: string;
		kind: "approved" | "contract" | "transfer" | "unknown";
		date: string;
		asset: string;
		asset_icon: string | null;
		amount: string;
		direction: "down" | "none" | "up";
		tone: "muted" | "negative" | "positive";
	}>;
}

/**
 * Creates a generated transaction summary for one wallet.
 */
function getWalletTransactionSummary(id: number): WalletTransactionSummary | undefined {
	if (id > GENERATED_ENTITY_COUNT) return undefined;
	return {
		id: id,
		wallet_id: id,
		title: "Last 30d transactions",
		tooltip: "Made at least one transaction",
		metrics: [
			{ id: "outgoing-transactions", label: "Outgoing transactions", value: "258 940", tone: "default" },
			{ id: "volume", label: "Volume", value: "$370,827.38", tone: "default" },
			{ id: "income", label: "Income", value: "+$403,735.50", tone: "positive" },
			{ id: "outcome", label: "Outcome", value: "-$429,040.02", tone: "negative" },
		],
		transactions: seeds.map(([type, amount, asset, date, tone, direction, kind, assetIcon], index) => ({
			id: `${id}-transaction-${index + 1}`,
			type: type,
			amount: amount,
			asset: asset,
			date: date,
			tone: tone,
			direction: direction,
			kind: kind,
			asset_icon: assetIcon,
		})),
	};
}

/**
 * Serves a generated wallet transaction summary.
 */
export async function GET(_request: Request, context: RouteParams<"walletID">): Promise<Response> {
	const id = await routeID(context.params, "walletID", "Invalid wallet id.");
	if (id instanceof Response) return id;
	const summary = getWalletTransactionSummary(id);
	return summary === undefined ? failure(404, "RESOURCE_NOT_FOUND", "Wallet not found.") : success(summary);
}
