import type { ReactNode } from "react";
import type { Metadata } from "next";

import { getAudienceByID } from "@/entities/audience/server";

/**
 * Generates metadata for the selected audience.
 */
export async function generateMetadata({ params }: LayoutProps<"/audiences/[id]">): Promise<Metadata> {
	const { id } = await params;
	const audienceID = Number(id);
	const audience = Number.isSafeInteger(audienceID) ? await getAudienceByID(audienceID) : undefined;

	return { title: `Audience (${audience?.title ?? id})`, description: "Explore audience wallets and insights." };
}

/**
 * Preserves the selected audience context across its views.
 */
export default function Layout({ children }: { children: ReactNode }) {
	return children;
}
