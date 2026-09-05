import { redirect } from "next/navigation";

/**
 * Redirects the selected label to its default Wallets view.
 */
export default async function Page({ params }: PageProps<"/explore/labels/[id]">) {
  const { id } = await params;

  redirect(`/explore/labels/${encodeURIComponent(id)}/wallets`);
}
