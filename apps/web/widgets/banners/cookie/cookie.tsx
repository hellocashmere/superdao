"use client";

import type { ComponentPropsWithRef } from "react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@superdao/ui/components/button";

import { useUserStore } from "@/entities/user";
import { Banner, BannerActions, BannerDescription, BannerIcon, BannerTitle } from "@/shared/ui/banner";

export interface CookieBannerProps extends ComponentPropsWithRef<"aside"> {}

/**
 * Renders the global cookie consent notice until the user accepts it.
 */
export function CookieBanner({ ref, className, ...props }: CookieBannerProps) {
	const acceptCookies = useUserStore((state) => state.acceptCookies);
	const hasAcceptedCookies = useUserStore((state) => state.hasAcceptedCookies);
	const hasHydrated = useUserStore((state) => state.hasHydrated);

	if (!hasHydrated) {
		return null;
	}

	return (
		<Banner
			ref={ref}
			open={!hasAcceptedCookies}
			showCloseButton={false}
			aria-label="Cookie notice"
			data-widget="cookie-banner"
			className={className}
			{...props}
		>
			<BannerIcon>
				<Image
					src="/auth/cookie.svg"
					alt=""
					width={36}
					height={36}
					className="size-9"
				/>
			</BannerIcon>
			<BannerTitle>
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
				<Button
					onClick={acceptCookies}
					size="sm"
				>
					Accept cookies
				</Button>
			</BannerActions>
		</Banner>
	);
}
