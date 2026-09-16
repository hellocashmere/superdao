import type { ComponentPropsWithRef } from "react";

import { cn } from "@superdao/lib/utils";
import { Skeleton } from "@superdao/ui/components/skeleton";

import { Container } from "@/shared/ui/container";
import { PageBody, PageHeader } from "@/shared/ui/page-layout";

export interface AudienceDetailsSkeletonProps extends ComponentPropsWithRef<typeof Container> {}

/**
 * Renders the loading layout for an audience details screen.
 */
export function AudienceDetailsSkeleton({ ref, className, ...props }: AudienceDetailsSkeletonProps) {
	return (
		<Container
			ref={ref}
			aria-busy="true"
			data-slot="audience-details-skeleton"
			className={cn("flex min-h-0 flex-1 flex-col", className)}
			{...props}
		>
			<PageHeader className="flex min-h-18 items-center gap-3">
				<Skeleton className="size-8 rounded-md" />
				<Skeleton className="h-7 w-56" />
			</PageHeader>
			<PageBody className="space-y-5 pb-16">
				<div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
					{Array.from({ length: 7 }, (_, index) => (
						<Skeleton
							key={index}
							className="h-34 rounded-lg"
						/>
					))}
				</div>
				<Skeleton className="h-120 rounded-lg" />
			</PageBody>
		</Container>
	);
}
