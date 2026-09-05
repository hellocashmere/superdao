"use client";

import type { ComponentPropsWithRef } from "react";
import Image from "next/image";

import { cn } from "@superdao/lib/utils";

import { Container } from "@/shared/ui/container";

export interface HomePageProps extends ComponentPropsWithRef<"div"> {}

/**
 * Renders the Explore welcome state on the primary workspace route.
 */
export function HomePage({ ref, className, ...props }: HomePageProps) {
  return (
    <Container
      ref={ref}
      data-page="home"
      className={cn("flex min-h-0 flex-1 items-center justify-center py-16 text-foreground", className)}
      {...props}
    >
      <section
        aria-labelledby="explore-welcome-title"
        className="flex w-full max-w-140 flex-col items-center text-center"
      >
        <Image
          src="/illustrations/1d2215b8c103e10c9ac348060932be06.svg"
          alt=""
          width={228}
          height={200}
          priority
        />
        <h1
          id="explore-welcome-title"
          className="mt-4 font-heading text-2xl/7 font-bold"
        >
          Let&#39;s get started
        </h1>
        <p className="mt-2 max-w-140 text-[15px]/6 text-muted-foreground">
          Explore wallets, labels, collections, tokens, and dapps to find the right audience for your next campaign
        </p>
      </section>
    </Container>
  );
}
