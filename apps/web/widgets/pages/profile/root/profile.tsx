import type { ComponentPropsWithRef } from "react";
import { redirect } from "next/navigation";

export interface ProfilePageProps extends ComponentPropsWithRef<"div"> {}

/**
 * Redirects the profile overview to the profile settings page.
 */
export function ProfilePage(props: ProfilePageProps) {
  void props;
  redirect("/profile/settings");

  return null;
}
