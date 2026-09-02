import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "404 — Page not found",
  description: "The page you are looking for does not exist.",
};

/** Routes unknown authentication URLs to the auth not-found boundary. */
export default function Page() {
  notFound();
}
