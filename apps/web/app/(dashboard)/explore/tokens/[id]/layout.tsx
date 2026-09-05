import type { ReactNode } from "react";
import type { Metadata } from "next";

import { getToken } from "@/entities/token";

/**
 * Generates metadata for the selected token.
 */
export async function generateMetadata({ params }: LayoutProps<"/explore/tokens/[id]">): Promise<Metadata> {
  const { id } = await params;
  const token = await getToken(id);

  return {
    title: `Tokens (${token.name})`,
    description: "Explore token holder wallets and insights.",
  };
}

/**
 * Preserves the selected token context across its views.
 */
export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
