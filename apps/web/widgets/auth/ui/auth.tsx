import type { ComponentPropsWithRef } from "react";
import Image from "next/image";
import Link from "next/link";

import { cn } from "@superdao/lib/utils";

import { AuthActions } from "./blocks/auth-actions";

export interface AuthPageProps extends ComponentPropsWithRef<"main"> {}

/**
 * Renders the wallet connection page with legal links.
 */
export function AuthPage({ className, ref, ...props }: AuthPageProps) {
  return (
    <main
      ref={ref}
      data-page="auth"
      className={cn("relative min-h-svh overflow-hidden bg-background text-foreground", className)}
      {...props}
    >
      <div
        data-slot="superdao-logo"
        className="absolute top-9 left-1/2 h-12 w-46.5 -translate-x-1/2"
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
      </div>

      <section
        aria-labelledby="auth-title"
        data-slot="auth-panel"
        className="absolute top-[calc(50%-84px)] left-1/2 flex w-70 -translate-x-1/2 flex-col items-center gap-6 [@media(max-height:520px)]:top-32"
      >
        <h1
          id="auth-title"
          className="font-heading text-2xl/7 font-bold"
        >
          Connect wallet
        </h1>
        <AuthActions />
      </section>

      <p className="absolute right-4 bottom-14 left-4 text-center text-[13px]/[18px] text-foreground">
        <Link
          href="/terms"
          className="text-muted-foreground outline-none hover:text-white focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-white/40"
        >
          Terms of Service
        </Link>
        {" and "}
        <Link
          href="/privacy"
          className="text-muted-foreground outline-none hover:text-white focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-white/40"
        >
          Privacy Policy
        </Link>
      </p>
    </main>
  );
}
