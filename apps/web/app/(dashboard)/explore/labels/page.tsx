import type { Metadata } from "next";

import { ExploreLabelsPage } from "@/widgets/pages/explore/labels/root";

export const metadata: Metadata = {
  title: "Labels",
  description: "Explore onchain wallet labels and connected audiences.",
};

/**
 * Renders the Explore Labels route.
 */
export default function Page() {
  return <ExploreLabelsPage />;
}
