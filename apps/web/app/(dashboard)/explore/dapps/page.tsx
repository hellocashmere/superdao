import type { Metadata } from "next";

import { ExploreDappsPage } from "@/widgets/pages/explore/dapps/root";

export const metadata: Metadata = {
  title: "Dapps",
  description: "Explore dapp activity and discover engaged audiences.",
};

/**
 * Renders the Explore Dapps directory.
 */
export default function Page() {
  return <ExploreDappsPage />;
}
