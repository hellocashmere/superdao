import type { Metadata } from "next";

import { ExploreTokensPage } from "@/widgets/pages/explore/tokens/root";

export const metadata: Metadata = {
  title: "Tokens",
  description: "Explore tokens, balances, and holder activity.",
};

/**
 * Renders the Explore Tokens directory.
 */
export default function Page() {
  return <ExploreTokensPage />;
}
