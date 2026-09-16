import type { ReactNode } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getLabelDetails } from "@/entities/label/server";
import { throwResourceError } from "@/shared/api";
import { parseRouteID } from "@/shared/lib/parse-route-id";

/**
 * Generates metadata for the selected label.
 */
export async function generateMetadata({ params }: LayoutProps<"/explore/labels/[id]">): Promise<Metadata> {
	const { id } = await params;
	const labelID = parseRouteID(id);
	if (labelID === undefined) notFound();
	const label = await getLabelDetails(labelID).catch(throwResourceError);

	return {
		title: `Labels (${label.title})`,
		description: "Explore label wallets and audience insights.",
	};
}

/**
 * Preserves the selected label context across its views.
 */
export default function Layout({ children }: { children: ReactNode }) {
	return children;
}
