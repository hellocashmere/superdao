import type { Metadata } from "next";

import { AuthPage } from "@/widgets/pages/auth/root";

export const metadata: Metadata = {
  title: "Connect wallet",
  description: "Connect a wallet to continue to Superdao.",
};

/**
 * Renders the Superdao wallet authentication route.
 */
export default function Page() {
  return <AuthPage />;
}
