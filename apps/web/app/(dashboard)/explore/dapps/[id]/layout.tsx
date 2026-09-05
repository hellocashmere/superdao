import type { ReactNode } from "react";
import type { Metadata } from "next";

import { getDapp } from "@/entities/dapp";

/**
 * Generates metadata for the selected dapp.
 */
export async function generateMetadata({ params }: LayoutProps<"/explore/dapps/[id]">): Promise<Metadata> {
  const { id } = await params;
  const dapp = await getDapp(id);

  return {
    title: `Dapps (${dapp.name})`,
    description: "Explore dapp audience wallets and insights.",
  };
}

/**
 * Preserves the selected dapp context across its views.
 */
export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
