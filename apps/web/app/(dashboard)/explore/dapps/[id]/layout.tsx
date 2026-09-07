import type { ReactNode } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getDapp } from "@/entities/dapp";
import { throwResourceError } from "@/shared/api";
import { parseRouteID } from "@/shared/lib/parse-route-id";

/**
 * Generates metadata for the selected dapp.
 */
export async function generateMetadata({ params }: LayoutProps<"/explore/dapps/[id]">): Promise<Metadata> {
  const { id } = await params;
  const dappID = parseRouteID(id);
  if (dappID === undefined) notFound();
  const dapp = await getDapp(dappID).catch(throwResourceError);

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
