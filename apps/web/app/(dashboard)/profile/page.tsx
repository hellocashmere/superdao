import type { Metadata } from "next";

import { ProfilePage } from "@/widgets/pages/profile/root";

export const metadata: Metadata = {
  title: "Profile",
};

/**
 * Renders the profile overview route.
 */
export default function Page() {
  return <ProfilePage />;
}
