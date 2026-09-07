"use client";

import type { ComponentPropsWithRef } from "react";
import { useMemo, useState } from "react";

import { usePagination } from "@superdao/hooks";
import { cn } from "@superdao/lib/utils";

import { useGetTokens } from "@/entities/token";
import { Container } from "@/shared/ui/container";
import { PageBody } from "@/shared/ui/page-layout";

import { TokensRootHeader } from "./components/header";
import { TokensRootSkeleton } from "./components/skeleton";
import { TokensRootPagination, TokensRootTable } from "./components/table";

const defaultPageSize = 16;
const pageSizeOptions = [16, 32, 48] as const;

export interface ExploreTokensPageProps extends ComponentPropsWithRef<"div"> {}

/**
 * Renders the searchable tokens directory.
 */
export function ExploreTokensPage({ className, ref, ...props }: ExploreTokensPageProps) {
  const tokensQuery = useGetTokens();
  const tokens = tokensQuery.data;
  const [search, setSearch] = useState("");
  const filteredTokens = useMemo(() => {
    return (tokens ?? []).filter(({ name }) => name.toLowerCase().includes(search.toLowerCase()));
  }, [search, tokens]);

  const pagination = usePagination({
    limit: defaultPageSize,
    offset: 0,
    total: filteredTokens.length,
  });

  const visibleTokens = filteredTokens.slice(pagination.offset, pagination.offset + pagination.limit);

  if (tokensQuery.error) throw tokensQuery.error;

  if (tokensQuery.isPending) {
    return (
      <TokensRootSkeleton
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
      data-page="explore-tokens-directory"
      className={cn("flex min-h-0 flex-1 flex-col", className)}
    >
      <TokensRootHeader
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
        <TokensRootTable
          tokens={visibleTokens}
          rowOffset={pagination.offset}
        />
        <TokensRootPagination
          pagination={pagination}
          pageSizeOptions={pageSizeOptions}
        />
      </PageBody>
    </Container>
  );
}
