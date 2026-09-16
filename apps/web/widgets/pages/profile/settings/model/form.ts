import { z } from "zod";

import type { UserProfile } from "@/entities/user";
import { isWalletIdentifier } from "@/shared/lib/crypto";

export const profileSettingsFormSchema = z.object({
	avatarUrl: z.string(),
	name: z.string().trim().min(1, "Display name is required."),
	wallet: z.string().trim().refine(isWalletIdentifier, "Enter a wallet address or domain name."),
});

export type ProfileSettingsFormValues = z.infer<typeof profileSettingsFormSchema>;

/**
 * Creates initial form values from the current user profile.
 */
export function getProfileSettingsFormDefaults(user: UserProfile | undefined): ProfileSettingsFormValues {
	return {
		avatarUrl: user?.avatarUrl ?? "",
		name: user?.name ?? "",
		wallet: user?.wallet ?? "",
	};
}

/**
 * Converts form values into normalized profile settings.
 */
export function normalizeProfileSettingsForm(values: ProfileSettingsFormValues): ProfileSettingsFormValues {
	return {
		avatarUrl: values.avatarUrl,
		name: values.name.trim(),
		wallet: values.wallet.trim(),
	};
}
