import type { Metadata } from "next";

import { AudienceDetailsPage } from "@/widgets/pages/audiences/[id]";

export async function generateMetadata({ params }: PageProps<"/audiences/[id]">): Promise<Metadata> {
  const { id } = await params;

  return {
    title: `Audience (${id})`,
    description: "Explore audience wallets and insights.",
  };
}

/** Renders a standalone audience wallet directory. */
export default async function Page({ params }: PageProps<"/audiences/[id]">) {
  const { id } = await params;

  return (
    <AudienceDetailsPage audienceID={id} />
  );
}
