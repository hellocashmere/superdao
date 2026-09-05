import type { Metadata } from "next";

import { ProfileSettings } from "@/widgets/pages/profile/settings";

export const metadata: Metadata = {
  title: "Profile settings",
  description: "Edit the local Superdao demo profile.",
};

/**
 * Renders the current user's profile settings route.
 */
export default function Page() {
  return <ProfileSettings />;
}
