import type { ComponentPropsWithRef } from "react";

import { cn } from "@superdao/lib/utils";
import { Card, CardContent } from "@superdao/ui/components/card";
import { Skeleton } from "@superdao/ui/components/skeleton";

import { Container } from "@/shared/ui/container";
import { InsightsSkeleton } from "@/shared/ui/insights-skeleton";
import { PageBody, PageHeader } from "@/shared/ui/page-layout";

export interface TokenDetailsSkeletonProps extends ComponentPropsWithRef<typeof Container> {
	tab: "insights" | "wallets";
}

/**
 * Renders the loading layout for a token details screen.
 */
export function TokenDetailsSkeleton({ ref, className, tab, ...props }: TokenDetailsSkeletonProps) {
	return (
		<Container
			ref={ref}
			aria-busy="true"
			data-slot="token-details-skeleton"
			className={cn("flex min-h-0 flex-1 flex-col", className)}
			{...props}
		>
			<PageHeader className="flex min-h-18 items-center gap-3">
				<Skeleton className="size-8 rounded-md" />
				<Skeleton className="size-8 rounded-full" />
				<Skeleton className="h-7 w-56" />
			</PageHeader>
			<PageBody className="space-y-5 pb-16">{tab === "insights" ? <InsightsSkeleton /> : <WalletsSkeleton />}</PageBody>
		</Container>
	);
}

/**
 * Renders the wallet-tab portion of a token details skeleton.
 */
function WalletsSkeleton() {
	return (
		<>
			<section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4 xl:grid-rows-[136px_136px]">
				{Array.from({ length: 6 }, (_, index) => (
					<Card
						key={index}
						className="xl:[&:nth-child(1)]:col-start-1 xl:[&:nth-child(2)]:col-start-2 xl:[&:nth-child(3)]:col-start-3 xl:[&:nth-child(4)]:col-start-1 xl:[&:nth-child(4)]:row-start-2 xl:[&:nth-child(5)]:col-start-2 xl:[&:nth-child(5)]:row-start-2 xl:[&:nth-child(6)]:col-start-3 xl:[&:nth-child(6)]:row-start-2"
					>
						<CardContent className="flex flex-1 flex-col py-3">
							<Skeleton className="h-5 w-28" />
							<Skeleton className="mt-2 h-7 w-24" />
							<Skeleton className="mt-1 h-[18px] w-36" />
							<Skeleton className="mt-auto h-[18px] w-20" />
						</CardContent>
					</Card>
				))}
				<Card className="min-h-[292px] md:col-span-2 xl:col-span-1 xl:col-start-4 xl:row-span-2 xl:row-start-1">
					<CardContent className="py-3">
						<Skeleton className="h-5 w-36" />
						<div className="mt-6 flex h-[220px] items-end gap-5 px-3">
							{[72, 50, 34, 18].map((height) => (
								<Skeleton
									key={height}
									className="flex-1"
									style={{ height: `${height}%` }}
								/>
							))}
						</div>
					</CardContent>
				</Card>
			</section>
			<Skeleton className="h-120 rounded-lg" />
		</>
	);
}
