import type { Metadata } from "next";
import Link from "next/link";

import { Button } from "@superdao/ui/button";

import { Error as ErrorPage } from "@/widgets/error";

export const metadata: Metadata = {
  title: "404 — Page not found",
  description: "The page you are looking for does not exist.",
};

export default function NotFound() {
  return (
    <ErrorPage
      action={
        <Button
          className="px-6"
          render={<Link href="/" />}
        >
          Go to homepage
        </Button>
      }
      variant="not-found"
    />
  );
}
