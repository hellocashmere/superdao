import { redirect } from "next/navigation";

/**
 * Redirects the selected token to its default Wallets view.
 */
export default async function Page({ params }: PageProps<"/explore/tokens/[id]">) {
  const { id } = await params;

  redirect(`/explore/tokens/${encodeURIComponent(id)}/wallets`);
}
