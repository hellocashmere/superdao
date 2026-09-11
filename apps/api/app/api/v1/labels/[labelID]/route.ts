import { parseID } from "../../../../../shared/api/query-params";
import { failure, success } from "../../../../../shared/api/response";
import type { RouteParams } from "../../../../../shared/api/route-params";
import { GENERATED_ENTITY_COUNT } from "../../../../../shared/config/fixtures";

const seeds = [
	["art", "Art", "#D693FF", "interest"],
	["music", "Music", "#FFDA1A", "interest"],
	["fashion", "Fashion", "#3A9DFF", "interest"],
	["luxury", "Luxury", "#5EFAD4", "interest"],
	["developer", "Developer", "#A8F230", "persona"],
	["professional", "Professional", "#F23051", "persona"],
	["early-adopter", "Early adopter", "#91FF8E", "persona"],
	["whale", "Whale", "#88C3FF", "persona"],
	["influencer", "Influencer", "#C15CFF", "persona"],
	["gamer", "Gamer", "#FFDA1A", "persona"],
	["hunter", "Hunter", "#A8F230", "persona"],
	["defi-trader", "DeFi trader", "#36BED9", "persona"],
	["nft-trader", "NFT trader", "#3A9DFF", "persona"],
	["token-investor", "Token investor", "#32D74B", "persona"],
	["donor", "Donor", "#FFDA1A", "persona"],
	["voter", "Voter", "#D693FF", "persona"],
	["non-human", "Non-human", "#DBDEFF", "persona"],
] as const;

interface Label {
	id: number;
	slug: string;
	name: string;
	wallet_count: number;
	color: string;
	category: "interest" | "persona";
}

/**
 * Creates one deterministic label by its id.
 */
function getLabel(id: number): Label | undefined {
	return Array.from({ length: GENERATED_ENTITY_COUNT }, (_, index): Label => {
		const [seedSlug, name, color, category] = seeds[index % seeds.length] ?? seeds[0];
		const slug = index < seeds.length ? seedSlug : `${seedSlug}-${index + 1}`;

		return {
			id: index + 1,
			slug: slug,
			name: name,
			wallet_count: (340 + index * 7) * 1_000,
			color: color,
			category: category,
		};
	}).find((label) => label.id === id);
}

/**
 * Serves one generated label.
 */
export async function GET(_request: Request, context: RouteParams<"labelID">): Promise<Response> {
	const { labelID } = await context.params;
	const id = parseID(labelID);
	if (id === null) return failure(400, "INVALID_QUERY", "Invalid label id.");
	const label = getLabel(id);
	return label === undefined ? failure(404, "RESOURCE_NOT_FOUND", "Label not found.") : success(label);
}
