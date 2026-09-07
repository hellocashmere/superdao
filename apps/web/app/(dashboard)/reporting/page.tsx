import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Reporting",
};

/**
 * Redirects the reporting root to the canonical account route.
 */
export default function Page() {
  redirect("/reporting/666");
}
