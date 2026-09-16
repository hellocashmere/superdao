import type { ReactNode } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getToken } from "@/entities/token/server";
import { throwResourceError } from "@/shared/api";
import { parseRouteID } from "@/shared/lib/parse-route-id";

/**
 * Generates metadata for the selected token.
 */
export async function generateMetadata({ params }: LayoutProps<"/explore/tokens/[id]">): Promise<Metadata> {
	const { id } = await params;
	const tokenID = parseRouteID(id);
	if (tokenID === undefined) notFound();
	const token = await getToken(tokenID).catch(throwResourceError);

	return {
		title: `Tokens (${token.title})`,
		description: "Explore token holder wallets and insights.",
	};
}

/**
 * Preserves the selected token context across its views.
 */
export default function Layout({ children }: { children: ReactNode }) {
	return children;
}
