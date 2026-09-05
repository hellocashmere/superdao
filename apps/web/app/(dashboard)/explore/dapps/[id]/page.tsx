import { redirect } from "next/navigation";

/**
 * Redirects the selected dapp to its default Wallets view.
 */
export default async function Page({ params }: PageProps<"/explore/dapps/[id]">) {
  const { id } = await params;

  redirect(`/explore/dapps/${encodeURIComponent(id)}/wallets`);
}
