import { failure, success } from "../../../../shared/api/response";

import type { OrganizationDTO } from "./model";
import { createOrganizationSlug, organizations, parseCreateOrganization } from "./model";

/**
 * Serves all organizations.
 */
export async function GET(): Promise<Response> {
	return success(organizations);
}

/**
 * Creates an organization in the demo fixture collection.
 */
export async function POST(request: Request): Promise<Response> {
	let body: unknown;

	try {
		body = await request.json();
	} catch {
		return failure(400, "INVALID_REQUEST", "The organization request body is invalid.");
	}

	const input = parseCreateOrganization(body);
	if (!input) return failure(400, "INVALID_REQUEST", "The organization request body is invalid.");

	const slug = input.slug || createOrganizationSlug(input.name);
	const baseId = slug;
	let id = baseId;
	let suffix = 2;
	while (organizations.some((candidate) => candidate.id === id)) id = `${baseId}-${suffix++}`;

	const organization: OrganizationDTO = {
		admins: input.admins ?? [],
		avatar_url: input.avatar_url ?? "",
		description: input.description ?? "",
		id: id,
		name: input.name,
		slug: slug,
	};

	organizations.push(organization);
	return Response.json({ data: organization }, { status: 201 });
}
