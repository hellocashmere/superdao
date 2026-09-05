import type { Metadata } from "next";

import { CampaignsPage } from "@/widgets/pages/campaigns/root";

export const metadata: Metadata = {
  title: "Campaigns",
  description: "Create and manage campaigns for your Superdao audience.",
};

/**
 * Renders the Campaigns workspace route.
 */
export default function Page() {
  return <CampaignsPage />;
}
