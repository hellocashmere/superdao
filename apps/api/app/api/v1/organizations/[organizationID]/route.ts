import { failure, success } from "../../../../../shared/api/response";
import type { OrganizationDTO } from "../model";
import { organizations, parseUpdateOrganization } from "../model";

/**
 * Updates an organization in the demo fixture collection.
 */
export async function PATCH(
	request: Request,
	{ params }: { params: Promise<{ organizationID: string }> }
): Promise<Response> {
	let body: unknown;

	try {
		body = await request.json();
	} catch {
		return failure(400, "INVALID_REQUEST", "The organization request body is invalid.");
	}

	const input = parseUpdateOrganization(body);
	if (!input) return failure(400, "INVALID_REQUEST", "The organization request body is invalid.");

	const { organizationID } = await params;
	const index = organizations.findIndex((organization) => organization.id === organizationID);
	if (index === -1) return failure(404, "RESOURCE_NOT_FOUND", "Organization not found.");

	const current = organizations[index]!;
	const organization: OrganizationDTO = {
		...current,
		...(input.admins === undefined ? {} : { admins: input.admins }),
		...(input.avatar_url === undefined ? {} : { avatar_url: input.avatar_url }),
		...(input.description === undefined ? {} : { description: input.description }),
		...(input.name === undefined ? {} : { name: input.name }),
		...(input.slug === undefined ? {} : { slug: input.slug }),
	};

	organizations[index] = organization;
	return success(organization);
}
