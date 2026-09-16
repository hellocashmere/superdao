import type { ComponentPropsWithRef } from "react";

import { cn } from "@superdao/lib/utils";
import { Skeleton } from "@superdao/ui/components/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@superdao/ui/components/table";

import { Container } from "@/shared/ui/container";
import { PageBody, PageHeader } from "@/shared/ui/page-layout";

export interface TokensRootSkeletonProps extends ComponentPropsWithRef<typeof Container> {}

const skeletonRows = Array.from({ length: 12 }, (_, index) => index);

/**
 * Renders the loading layout for the tokens root page.
 */
export function TokensRootSkeleton({ ref, className, ...props }: TokensRootSkeletonProps) {
	return (
		<Container
			ref={ref}
			aria-busy="true"
			data-slot="tokens-root-skeleton"
			className={cn("flex min-h-0 flex-1 flex-col overflow-hidden", className)}
			{...props}
		>
			<PageHeader className="flex min-h-18 items-center justify-between gap-5">
				<Skeleton className="h-7 w-36" />
				<Skeleton className="hidden h-10 w-60 rounded-lg sm:block" />
			</PageHeader>
			<PageBody className="min-h-0 flex-1 overflow-hidden pb-7">
				<div className="flex h-full min-h-0 flex-col overflow-hidden rounded-lg bg-[#252b36]">
					<div className="min-h-0 flex-1 overflow-hidden">
						<Table className="min-w-215 table-fixed">
							<TableHeader>
								<TableRow className="h-13.5 border-0 hover:bg-transparent">
									<TableHead className="w-12 px-5 pt-6 pb-3">
										<Skeleton className="ml-auto h-4.5 w-5" />
									</TableHead>
									<TableHead className="w-72.5 px-5 pt-6 pb-3">
										<Skeleton className="h-4.5 w-24" />
									</TableHead>
									{["w-16", "w-20", "w-16", "w-28", "w-12"].map((width, index) => (
										<TableHead
											key={`${width}-${index}`}
											className="px-5 pt-6 pb-3"
										>
											<Skeleton className={cn("ml-auto h-4.5", width)} />
										</TableHead>
									))}
								</TableRow>
							</TableHeader>
							<TableBody>
								{skeletonRows.map((index) => (
									<TableRow
										key={index}
										className="h-14 border-0 hover:bg-transparent"
									>
										<TableCell className="px-5 py-0">
											<Skeleton className="ml-auto h-4.5 w-5" />
										</TableCell>
										<TableCell className="px-5 py-0">
											<div className="flex items-center gap-3">
												<Skeleton className="size-7 shrink-0 rounded-full" />
												<Skeleton className="h-4.5 w-32" />
											</div>
										</TableCell>
										{["w-12", "w-16", "w-12", "w-20", "size-4"].map((width, cellIndex) => (
											<TableCell
												key={`${index}-${cellIndex}`}
												className="px-5 py-0"
											>
												<Skeleton
													className={cn(cellIndex === 4 ? "mx-auto" : "ml-auto", width, cellIndex === 4 ? "" : "h-4.5")}
												/>
											</TableCell>
										))}
									</TableRow>
								))}
							</TableBody>
						</Table>
					</div>
				</div>
			</PageBody>
		</Container>
	);
}
