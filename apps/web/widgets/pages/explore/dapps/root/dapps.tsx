"use client";

import type { ComponentPropsWithRef } from "react";
import { useMemo, useState } from "react";

import { usePagination } from "@superdao/hooks";
import { cn } from "@superdao/lib/utils";

import { useGetDapps } from "@/entities/dapp";
import { Container } from "@/shared/ui/container";
import { PageBody } from "@/shared/ui/page-layout";

import { DappsRootHeader } from "./components/header";
import { DappsRootSkeleton } from "./components/skeleton";
import { DappsRootPagination, DappsRootTable } from "./components/table";

const defaultPageSize = 16;
const pageSizeOptions = [16, 32, 48] as const;

export interface ExploreDappsPageProps extends ComponentPropsWithRef<"div"> {}

/**
 * Renders the searchable dapps directory.
 */
export function ExploreDappsPage({ ref, className, ...props }: ExploreDappsPageProps) {
	const dappsQuery = useGetDapps();
	const dapps = dappsQuery.data;
	const [search, setSearch] = useState<string>("");
	const filteredDapps = useMemo(() => {
		return (dapps ?? []).filter(({ title }) => title.toLowerCase().includes(search.toLowerCase()));
	}, [dapps, search]);

	const pagination = usePagination({
		limit: defaultPageSize,
		offset: 0,
		total: filteredDapps.length,
	});

	const visibleDapps = filteredDapps.slice(pagination.offset, pagination.offset + pagination.limit);

	if (dappsQuery.error) throw dappsQuery.error;

	if (dappsQuery.isPending) {
		return (
			<DappsRootSkeleton
				ref={ref}
				className={className}
				{...props}
			/>
		);
	}

	return (
		<Container
			ref={ref}
			className={cn("flex min-h-0 flex-1 flex-col", className)}
			{...props}
		>
			<DappsRootHeader
				search={search}
				onClearSearch={() => {
					setSearch("");
					pagination.reset();
				}}
				onSearchChange={(event) => {
					setSearch(event.target.value);
					pagination.reset();
				}}
			/>
			<PageBody className="flex min-h-0 flex-1 flex-col pb-7">
				<DappsRootTable
					dapps={visibleDapps}
					rowOffset={pagination.offset}
				/>
				<DappsRootPagination
					pagination={pagination}
					pageSizeOptions={pageSizeOptions}
				/>
			</PageBody>
		</Container>
	);
}
