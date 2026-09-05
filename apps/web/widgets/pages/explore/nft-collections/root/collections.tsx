"use client";

import type { ComponentPropsWithRef } from "react";
import { useMemo, useState } from "react";

import { useLoading, usePagination } from "@superdao/hooks";
import { cn } from "@superdao/lib/utils";

import { useGetNftCollections } from "@/entities/nft-collection";
import { Container } from "@/shared/ui/container";
import { PageBody } from "@/shared/ui/page-layout";

import { NftCollectionsRootHeader } from "./components/header";
import { NftCollectionsRootSkeleton } from "./components/skeleton";
import { NftCollectionsRootPagination, NftCollectionsRootTable } from "./components/table";

const defaultPageSize = 16;
const pageSizeOptions = [16, 32, 48] as const;

export interface ExploreNftCollectionsPageProps extends ComponentPropsWithRef<"div"> {}

/**
 * Renders the searchable NFT collections directory.
 */
export function ExploreNftCollectionsPage({ className, ref, ...props }: ExploreNftCollectionsPageProps) {
  const collectionsQuery = useGetNftCollections();
  const collections = collectionsQuery.data;
  const [search, setSearch] = useState("");
  const isSearching = useLoading(700);

  const filteredCollections = useMemo(() => {
    return (collections ?? []).filter(({ name }) => name.toLowerCase().includes(search.toLowerCase()));
  }, [collections, search]);

  const pagination = usePagination({
    limit: defaultPageSize,
    offset: 0,
    total: filteredCollections.length,
  });

  const visibleCollections = filteredCollections.slice(pagination.offset, pagination.offset + pagination.limit);

  if (collectionsQuery.error) throw collectionsQuery.error;

  if (collectionsQuery.isPending) {
    return (
      <NftCollectionsRootSkeleton
        {...props}
        ref={ref}
        className={className}
      />
    );
  }

  return (
    <Container
      {...props}
      ref={ref}
      data-page="explore-nft-collections-directory"
      className={cn("flex min-h-0 flex-1 flex-col", className)}
    >
      <NftCollectionsRootHeader
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
        <NftCollectionsRootTable
          collections={visibleCollections}
          rowOffset={pagination.offset}
          isLoading={Boolean(search) && isSearching}
        />
        <NftCollectionsRootPagination
          pagination={pagination}
          pageSizeOptions={pageSizeOptions}
        />
      </PageBody>
    </Container>
  );
}
