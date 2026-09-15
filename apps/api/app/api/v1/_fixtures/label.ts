export const LABEL_ENTITY_COUNT = 100;

interface LabelFixture {
	id: number;
	slug: string;
	title: string;
	wallet_count: number;
	color: string;
	category: "interest" | "persona";
}

const labelSeeds = [
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
 * Creates one deterministic label from its zero-based index.
 */
function createLabel(index: number): LabelFixture {
	const [seedSlug, title, color, category] = labelSeeds[index % labelSeeds.length] ?? labelSeeds[0];
	return {
		id: index + 1,
		slug: index < labelSeeds.length ? seedSlug : `${seedSlug}-${index + 1}`,
		title: title,
		wallet_count: (340 + index * 7) * 1_000,
		color: color,
		category: category,
	};
}

/**
 * Creates the complete deterministic label directory.
 */
export function getLabels(): LabelFixture[] {
	return Array.from(
		{
			length: LABEL_ENTITY_COUNT,
		},
		(_, index) => createLabel(index)
	);
}

/**
 * Creates one deterministic label directly by ID.
 */
export function getLabel(id: number): LabelFixture | undefined {
	return Number.isInteger(id) && id >= 1 && id <= LABEL_ENTITY_COUNT ? createLabel(id - 1) : undefined;
}
