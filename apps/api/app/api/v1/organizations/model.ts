/**
 * Organization record returned by the API.
 */
export interface OrganizationDTO {
	admins: readonly string[];
	avatar_url: string;
	description: string;
	id: string;
	name: string;
	slug: string;
}

/**
 * Organization creation payload accepted by the API.
 */
export interface CreateOrganizationDTO {
	admins?: readonly string[];
	avatar_url?: string;
	description?: string;
	name: string;
	slug?: string;
}

/**
 * Organization update payload accepted by the API.
 */
export interface UpdateOrganizationDTO {
	admins?: readonly string[];
	avatar_url?: string;
	description?: string;
	name?: string;
	slug?: string;
}

const createKeys = new Set(["admins", "avatar_url", "description", "name", "slug"]);
const updateKeys = new Set(["admins", "avatar_url", "description", "name", "slug"]);

/**
 * Mutable organization fixtures shared by the collection and detail handlers.
 */
export const organizations: OrganizationDTO[] = [
	{
		admins: ["0x95987f247317823BD2334265AcebE6A87d4b4A35", "0xD67B249f202E7171DF1efd6fa8719Afc0D155CBE"],
		avatar_url: "/avatars/acme.svg",
		description: "",
		id: "acme",
		name: "Acme Inc.",
		slug: "acme",
	},
	{
		admins: [],
		avatar_url: "/avatars/cashmere.png",
		description: "",
		id: "cashmere-engineering-university",
		name: "Cashmere Engineering University",
		slug: "cashmere-engineering-university",
	},
];

/**
 * Creates a URL-safe slug from an organization name.
 */
export function createOrganizationSlug(name: string): string {
	return (
		name
			.trim()
			.toLowerCase()
			.replace(/[^a-z0-9]+/g, "-")
			.replace(/^-|-$/g, "") || "organization"
	);
}

/**
 * Checks shared optional fields in an organization mutation payload.
 */
function hasValidOptionalFields(input: Record<string, unknown>): boolean {
	if (["avatar_url", "description", "slug"].some((key) => input[key] !== undefined && typeof input[key] !== "string")) {
		return false;
	}

	if (input.slug !== undefined && (input.slug as string).trim() === "") return false;
	if (input.avatar_url !== undefined && (input.avatar_url as string).trim() === "") return false;

	return !(
		input.admins !== undefined &&
		(!Array.isArray(input.admins) ||
			input.admins.length === 0 ||
			input.admins.some((admin) => typeof admin !== "string" || admin.trim() === ""))
	);
}

/**
 * Checks a create request and returns its normalized value.
 */
export function parseCreateOrganization(value: unknown): CreateOrganizationDTO | undefined {
	if (!value || typeof value !== "object" || Array.isArray(value)) return undefined;

	const input = value as Record<string, unknown>;
	if (Object.keys(input).some((key) => !createKeys.has(key))) return undefined;
	if (typeof input.name !== "string" || input.name.trim() === "") return undefined;
	if (!hasValidOptionalFields(input)) return undefined;
	const admins = input.admins as readonly string[] | undefined;
	const avatarUrl = input.avatar_url as string | undefined;
	const description = input.description as string | undefined;
	const slug = input.slug as string | undefined;

	return {
		admins: admins?.map((admin) => admin.trim()),
		avatar_url: avatarUrl?.trim(),
		description: description?.trim(),
		name: input.name.trim(),
		slug: slug?.trim(),
	};
}

/**
 * Checks an update request and returns its normalized value.
 */
export function parseUpdateOrganization(value: unknown): UpdateOrganizationDTO | undefined {
	if (!value || typeof value !== "object" || Array.isArray(value)) return undefined;

	const input = value as Record<string, unknown>;
	if (Object.keys(input).some((key) => !updateKeys.has(key))) return undefined;
	if (Object.keys(input).length === 0) return undefined;
	if (input.name !== undefined && (typeof input.name !== "string" || input.name.trim() === "")) return undefined;
	if (!hasValidOptionalFields(input)) return undefined;
	const admins = input.admins as readonly string[] | undefined;
	const avatarUrl = input.avatar_url as string | undefined;
	const description = input.description as string | undefined;
	const name = input.name as string | undefined;
	const slug = input.slug as string | undefined;

	return {
		admins: admins?.map((admin) => admin.trim()),
		avatar_url: avatarUrl?.trim(),
		description: description?.trim(),
		name: name?.trim(),
		slug: slug?.trim(),
	};
}
