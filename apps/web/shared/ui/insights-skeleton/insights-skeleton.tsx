import type { ComponentPropsWithRef } from "react";

import { cn } from "@superdao/lib/utils";
import { Card, CardContent } from "@superdao/ui/components/card";
import { Skeleton } from "@superdao/ui/components/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@superdao/ui/components/table";

export interface InsightsSkeletonProps extends ComponentPropsWithRef<"div"> {}

/**
 * Renders the shared loading layout for Explore insight tabs.
 */
export function InsightsSkeleton({ ref, className, ...props }: InsightsSkeletonProps) {
	return (
		<div
			ref={ref}
			data-slot="insights-skeleton"
			className={cn("space-y-6", className)}
			{...props}
		>
			<section>
				<h2 className="flex h-14 items-center text-xl/6 font-bold">Balances and transactions</h2>
				<div className="grid gap-5 xl:grid-cols-4">
					<div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-1">
						{Array.from({ length: 2 }, (_, index) => (
							<Card
								key={index}
								className="min-h-34"
							>
								<CardContent className="space-y-4 py-5">
									<Skeleton className="h-5 w-24" />
									<Skeleton className="h-7 w-32" />
									<Skeleton className="h-5 w-40" />
								</CardContent>
							</Card>
						))}
					</div>
					{Array.from({ length: 2 }, (_, index) => (
						<Card
							key={index}
							className={cn("h-74", index === 1 && "xl:col-span-2")}
						>
							<CardContent className="flex flex-1 flex-col gap-5 py-5">
								<Skeleton className="h-5 w-40" />
								<Skeleton className="min-h-48 w-full flex-1" />
							</CardContent>
						</Card>
					))}
				</div>
				<Card className="mt-5">
					<CardContent className="grid gap-5 py-5 sm:grid-cols-3">
						{Array.from({ length: 4 }, (_, index) => (
							<div key={index}>
								<Skeleton className="h-5 w-24" />
								<Skeleton className="mt-2 h-6 w-32" />
							</div>
						))}
					</CardContent>
				</Card>
			</section>

			<section>
				<h2 className="flex h-14 items-center text-xl/6 font-bold">Contacts</h2>
				<div className="grid gap-5 xl:grid-cols-[245px_1fr]">
					<div className="grid grid-rows-2 gap-5">
						{Array.from({ length: 2 }, (_, index) => (
							<Card
								key={index}
								className="h-full"
							>
								<CardContent className="py-5">
									<div className="space-y-3">
										<Skeleton className="h-5 w-24" />
										<Skeleton className="h-7 w-32" />
										<Skeleton className="h-5 w-40" />
									</div>
								</CardContent>
							</Card>
						))}
					</div>
					<Card>
						<h3 className="px-5 pt-3 text-sm/5 font-medium text-tabs-foreground">Twitter influencers</h3>
						<div className="overflow-hidden pb-2.5">
							<InsightsTable
								avatarColumn={0}
								headings={["Name", "Username", "Followers", "NFTs", "Balance, USD"]}
								rows={5}
							/>
						</div>
					</Card>
				</div>
			</section>

			<section>
				<h2 className="flex h-14 items-center text-xl/6 font-bold">Wallet profile</h2>
				<div className="grid gap-5 lg:grid-cols-2">
					{Array.from({ length: 3 }, (_, index) => (
						<Card
							key={index}
							className={cn("h-74", index === 2 && "lg:col-span-2")}
						>
							<CardContent className="space-y-5 py-5">
								<Skeleton className="h-5 w-28" />
								<Skeleton className="h-48 w-full" />
							</CardContent>
						</Card>
					))}
				</div>
			</section>

			<section>
				<h2 className="flex h-14 items-center text-xl/6 font-bold">Audience overlap</h2>
				<Card>
					<div className="overflow-hidden pb-2.5">
						<InsightsTable
							avatarColumn={1}
							headings={["#", "Label", "Owners in audience", "Share in audience", "Owners", "Floor price"]}
							rows={25}
							wide
						/>
					</div>
				</Card>
			</section>
		</div>
	);
}

interface InsightsTableProps {
	avatarColumn: number;
	headings: readonly string[];
	rows: number;
	wide?: boolean;
}

/**
 * Renders a loading table used by the insight tab skeleton.
 */
function InsightsTable({ avatarColumn, headings, rows, wide = false }: InsightsTableProps) {
	return (
		<Table
			className={cn(
				wide && "min-w-[1000px]",
				"[&_tbody_tr]:h-14 [&_td]:h-14 [&_td]:px-5 [&_td]:py-0 [&_th]:h-[54px] [&_th]:px-5 [&_th]:pt-6 [&_th]:pb-3 [&_thead_tr]:hover:bg-transparent"
			)}
		>
			<TableHeader>
				<TableRow>
					{headings.map((heading) => (
						<TableHead key={heading}>{heading}</TableHead>
					))}
				</TableRow>
			</TableHeader>
			<TableBody>
				{Array.from({ length: rows }, (_, index) => (
					<TableRow key={index}>
						{headings.map((heading, cellIndex) => (
							<TableCell key={heading}>
								{cellIndex === avatarColumn ? (
									<div className="flex items-center gap-4">
										<Skeleton className="size-7 rounded-full" />
										<Skeleton className="h-5 w-28" />
									</div>
								) : (
									<Skeleton className={cn("h-5 w-16", cellIndex > avatarColumn && "ml-auto")} />
								)}
							</TableCell>
						))}
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}
