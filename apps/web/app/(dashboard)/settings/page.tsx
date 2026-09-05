import type { Metadata } from "next";

import { Settings } from "@/widgets/pages/settings/root";

export const metadata: Metadata = {
  title: "Settings",
  description: "Manage organization settings and its custom URL.",
};

/**
 * Renders organization settings for the active workspace.
 */
export default function Page() {
  return <Settings />;
}
