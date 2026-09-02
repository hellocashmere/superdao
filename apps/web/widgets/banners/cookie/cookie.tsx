"use client";

import type { ComponentPropsWithRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@superdao/ui/components/button";

import { useUserStore } from "@/entities/user";
import { Banner, BannerActions, BannerDescription, BannerIcon, BannerTitle } from "@/shared/ui/banner";

export interface CookieBannerProps extends ComponentPropsWithRef<"aside"> {}

/**
 * Renders the global cookie consent notice until the user accepts it.
 */
export function CookieBanner({ className, ref, ...props }: CookieBannerProps) {
  const pathname = usePathname();
  const acceptCookies = useUserStore((state) => state.acceptCookies);
  const hasAcceptedCookies = useUserStore((state) => state.hasAcceptedCookies);
  const hasHydrated = useUserStore((state) => state.hasHydrated);

  if (pathname === "/_components" || !hasHydrated) {
    return null;
  }

  return (
    <Banner
      {...props}
      ref={ref}
      open={!hasAcceptedCookies}
      showCloseButton={false}
      aria-label="Cookie notice"
      data-widget="cookie-banner"
      className={className}
    >
      <BannerIcon>
        <Image
          src="/auth/cookie.svg"
          alt=""
          width={40}
          height={40}
          className="size-10"
        />
      </BannerIcon>
      <BannerTitle>
        We use cookies
        <BannerDescription>
          We use cookies to improve your browsing experience. By clicking &#34;Accept Cookies&#34;, you agree to the use
          of cookies on our website. To find out more visit our{" "}
          <Link
            href="/cookie-policy"
            className="font-medium text-primary outline-none hover:underline focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-white/40"
          >
            Cookie Policy
          </Link>
        </BannerDescription>
      </BannerTitle>
      <BannerActions>
        <Button onClick={acceptCookies}>Accept cookies</Button>
      </BannerActions>
    </Banner>
  );
}
