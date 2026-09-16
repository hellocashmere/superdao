import type { Metadata } from "next";

import { HomePage } from "@/widgets/pages/home/root";

export const metadata: Metadata = {
	title: "Explore",
	description: "Start exploring onchain activity and discover new audiences.",
};

/**
 * Renders the primary Superdao workspace route.
 */
export default function Page() {
	return <HomePage />;
}
