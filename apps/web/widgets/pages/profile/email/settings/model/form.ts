import { z } from "zod";

import type { UserProfile } from "@/entities/user";

export const emailSettingsFormSchema = z.object({
	email: z.string().trim().min(1, "Email is required.").pipe(z.email("Enter a valid email address.")),
});

export type EmailSettingsFormValues = z.infer<typeof emailSettingsFormSchema>;

/**
 * Creates initial email form values from the current user profile.
 */
export function getEmailSettingsFormDefaults(user: UserProfile | undefined): EmailSettingsFormValues {
	return {
		email: user?.email ?? "",
	};
}

/**
 * Converts email form values into normalized settings.
 */
export function normalizeEmailSettingsForm(values: EmailSettingsFormValues): EmailSettingsFormValues {
	return {
		email: values.email.trim(),
	};
}
