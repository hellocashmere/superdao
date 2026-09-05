import type { Metadata } from "next";

import { ProfileEmailSettings } from "@/widgets/pages/profile/email/settings";

export const metadata: Metadata = {
  title: "Email settings",
  description: "Add, verify, change, or remove the email connected to your Superdao profile.",
};

/**
 * Renders the current user's email settings route.
 */
export default function Page() {
  return <ProfileEmailSettings />;
}
