import type { ReactNode } from "react";
import type { Metadata } from "next";

import { getLabelDetails } from "@/entities/label";

/**
 * Generates metadata for the selected label.
 */
export async function generateMetadata({ params }: LayoutProps<"/explore/labels/[id]">): Promise<Metadata> {
  const { id } = await params;
  const label = await getLabelDetails(id);

  return {
    title: `Labels (${label.name})`,
    description: "Explore label wallets and audience insights.",
  };
}

/**
 * Preserves the selected label context across its views.
 */
export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
