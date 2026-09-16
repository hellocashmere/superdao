import type { ComponentPropsWithRef } from "react";
import Image from "next/image";

import { cn } from "@superdao/lib/utils";
import { buttonVariants } from "@superdao/ui/components/button";

import { Container } from "@/shared/ui/container";

export interface CampaignsPageProps extends ComponentPropsWithRef<typeof Container> {}

/**
 * Renders the campaigns coming-soon state with its illustration and contact action.
 */
export function CampaignsPage({ ref, className, ...props }: CampaignsPageProps) {
	return (
		<Container
			ref={ref}
			data-slot="campaigns-page"
			className={cn(
				"flex min-h-0 flex-1 items-center justify-center bg-background px-6 py-16 text-foreground",
				className
			)}
			{...props}
		>
			<section
				aria-labelledby="campaigns-coming-soon-title"
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
					id="campaigns-coming-soon-title"
					className="mt-4 font-heading text-2xl/7 font-bold"
				>
					Campaigns will be available soon
				</h1>
				<p className="mt-2 max-w-140 text-[15px]/6 text-muted-foreground">
					This feature is designed for convenient communication with customers and setting up campaigns directly from
					Superdao. Please wait until it’s ready or contact us to be among the first to get access
				</p>
				<a
					href="mailto:hello@exmple.co"
					className={buttonVariants({ className: "mt-8" })}
				>
					Contact us
				</a>
			</section>
		</Container>
	);
}
