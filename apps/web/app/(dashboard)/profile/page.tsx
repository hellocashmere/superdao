import { redirect } from "next/navigation";

/**
 * Redirects the former profile route to the profile settings page.
 */
export default function Page() {
  redirect("/profile/settings");
}
