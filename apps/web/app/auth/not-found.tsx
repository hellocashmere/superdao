import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { buttonVariants } from "@superdao/ui/button";

import { Error as ErrorPage } from "@/widgets/error";

export const metadata: Metadata = {
  title: "404 — Page not found",
  description: "The page you are looking for does not exist.",
};

export default function NotFound() {
  return (
    <main className="relative flex min-h-svh items-center justify-center overflow-hidden bg-background px-6 py-24 text-foreground">
      <Link
        href="/auth"
        className="absolute top-9 left-1/2 h-12 w-46.5 -translate-x-1/2 outline-none focus-visible:rounded-lg focus-visible:ring-2 focus-visible:ring-white/40"
      >
        <Image
          src="/auth/superdao-symbol.svg"
          alt=""
          width={48}
          height={48}
          className="absolute top-0 left-0 size-12"
          priority
        />
        <Image
          src="/auth/superdao-wordmark.svg"
          alt="Superdao"
          width={117}
          height={22}
          className="absolute top-4.25 left-14.25 h-5.5 w-29.25"
          priority
        />
      </Link>
      <ErrorPage
        action={
          <Link
            className={buttonVariants({ className: "px-6" })}
            href="/"
          >
            Go to homepage
          </Link>
        }
        variant="not-found"
      />
    </main>
  );
}
