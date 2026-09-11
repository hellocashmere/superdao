import { getPaginate } from "../../../../shared/api/pagination";
import { invalidQuery, pagination, scalar, stableSort, validateKeys } from "../../../../shared/api/query-params";
import { success } from "../../../../shared/api/response";
import { GENERATED_ENTITY_COUNT } from "../../../../shared/config/fixtures";

interface Label {
	id: number;
	slug: string;
	name: string;
	wallet_count: number;
	color: string;
	category: "interest" | "persona";
}

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

/**
 * Creates the deterministic label directory.
 */
function getLabels(): Label[] {
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
	});
}

/**
 * Serves the generated label directory.
 */
export function GET(request: Request): Response {
	const params = new URL(request.url).searchParams;
	if (!validateKeys(params, ["q", "category", "limit", "offset", "sort", "order"]))
		return invalidQuery("Unsupported query parameter.");
	const limitOffset = pagination(params);
	const q = scalar(params, "q");
	const category = scalar(params, "category");
	const sort = scalar(params, "sort");
	const order = scalar(params, "order");
	if (limitOffset === null || [q, category, sort, order].includes(null))
		return invalidQuery("Invalid query parameters.");
	if (category !== undefined && category !== "interest" && category !== "persona")
		return invalidQuery("Unsupported category.");
	if (sort !== undefined && sort !== "name" && sort !== "category") return invalidQuery("Unsupported sort.");
	if (order !== undefined && order !== "asc" && order !== "desc") return invalidQuery("Unsupported order.");
	const needle = q?.trim().toLowerCase();
	let labels = getLabels().filter(
		(label) =>
			(needle === undefined || label.name.toLowerCase().includes(needle)) &&
			(category === undefined || label.category === category)
	);
	if (sort !== undefined)
		labels = stableSort(labels, (left, right) => (order === "desc" ? -1 : 1) * left[sort].localeCompare(right[sort]));
	const result = getPaginate(labels, limitOffset);
	return success(result.data, result.metadata);
}
