"use client";

import Image from "next/image";
import Link from "next/link";

import { Button } from "@superdao/ui/button";

import { Error as ErrorPage } from "@/widgets/error";

/**
 * Renders the authentication fallback for unexpected runtime errors.
 */
export default function Error({ unstable_retry }: { error: Error & { digest?: string }; unstable_retry: () => void }) {
  return (
    <main
      data-page="auth-error"
      className="relative flex min-h-svh items-center justify-center overflow-hidden bg-background px-6 py-24 text-foreground"
    >
      <Link
        href="/auth"
        aria-label="Superdao authentication"
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
          <Button
            type="button"
            onClick={unstable_retry}
            className="px-6"
          >
            Try again
          </Button>
        }
        variant="server-error"
      />
    </main>
  );
}
