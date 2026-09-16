import { z } from "zod";

import type { OrganizationView } from "@/entities/organization";
import { isEthereumAddress } from "@/shared/lib/crypto";

const walletIDSchema = z
	.string()
	.trim()
	.refine((value) => value === "" || isEthereumAddress(value), "Wallet address must start with 0x.");

export const organizationSettingsFormSchema = z.object({
	admins: z.array(z.object({ wallet: walletIDSchema })),
	avatarUrl: z.string(),
	name: z.string().trim().min(1, "Organization name is required."),
	slug: z
		.string()
		.trim()
		.regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase letters, numbers, and single hyphens only."),
});

export type OrganizationSettingsFormValues = z.infer<typeof organizationSettingsFormSchema>;

/**
 * Creates initial settings form values from an organization.
 */
export function getOrganizationSettingsFormDefaults(
	organization: OrganizationView | undefined
): OrganizationSettingsFormValues {
	return {
		admins: (organization?.admins ?? []).map((wallet) => ({ wallet })),
		avatarUrl: organization?.avatarUrl ?? "",
		name: organization?.name ?? "",
		slug: organization?.slug ?? "",
	};
}

/**
 * Converts settings form values into normalized organization values.
 */
export function normalizeOrganizationSettingsForm(
	values: OrganizationSettingsFormValues
): OrganizationSettingsFormValues {
	return {
		admins: values.admins.map(({ wallet }) => ({ wallet: wallet.trim() })).filter(({ wallet }) => Boolean(wallet)),
		avatarUrl: values.avatarUrl,
		name: values.name.trim(),
		slug: values.slug.trim(),
	};
}
