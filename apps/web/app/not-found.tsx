import type { Metadata } from "next";
import Link from "next/link";

import { buttonVariants } from "@superdao/ui/button";

import { Error as ErrorPage } from "@/widgets/error";

export const metadata: Metadata = {
  title: "404 — Page not found",
  description: "The page you are looking for does not exist.",
};

export default function NotFound() {
  return (
    <ErrorPage
      action={
        <Link
          className={buttonVariants({ className: "px-6" })}
          href="/"
        >
          Go to homepage
        </Link>
      }
      className="min-h-svh"
      variant="not-found"
    />
  );
}
