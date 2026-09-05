import type { ComponentPropsWithRef } from "react";

import { cn } from "@superdao/lib/utils";
import { Skeleton } from "@superdao/ui/components/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@superdao/ui/components/table";

import { Container } from "@/shared/ui/container";
import { PageBody, PageHeader } from "@/shared/ui/page-layout";

export interface MembersPageSkeletonProps extends ComponentPropsWithRef<typeof Container> {}

const skeletonRows = Array.from({ length: 12 }, (_, index) => index);

/**
 * Renders the loading layout for the members page.
 */
export function MembersPageSkeleton({ className, ref, ...props }: MembersPageSkeletonProps) {
  return (
    <Container
      {...props}
      ref={ref}
      aria-busy="true"
      data-slot="members-page-skeleton"
      className={cn("flex min-h-0 flex-1 flex-col overflow-hidden lg:px-8", className)}
    >
      <PageHeader className="flex min-h-18 items-center justify-between gap-4">
        <Skeleton className="h-7 w-28" />
        <Skeleton className="h-10 w-36 rounded-lg" />
      </PageHeader>
      <PageBody className="min-h-0 flex-1 overflow-hidden pb-7">
        <div className="h-full min-h-0 overflow-hidden rounded-lg bg-[#252b36]">
          <Table className="min-w-[860px] table-fixed">
            <TableHeader>
              <TableRow className="h-[54px] border-0 hover:bg-transparent">
                <TableHead className="w-12 px-5 pt-6 pb-3">
                  <Skeleton className="ml-auto h-[18px] w-5" />
                </TableHead>
                <TableHead className="w-[290px] px-5 pt-6 pb-3">
                  <Skeleton className="h-[18px] w-24" />
                </TableHead>
                <TableHead className="px-5 pt-6 pb-3">
                  <Skeleton className="h-[18px] w-12" />
                </TableHead>
                <TableHead className="px-5 pt-6 pb-3">
                  <Skeleton className="h-[18px] w-20" />
                </TableHead>
                <TableHead className="px-5 pt-6 pb-3">
                  <Skeleton className="h-[18px] w-16" />
                </TableHead>
                <TableHead className="w-20 px-5 pt-6 pb-3" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {skeletonRows.map((index) => (
                <TableRow
                  key={index}
                  className="h-14 border-0 hover:bg-transparent"
                >
                  <TableCell className="px-5 py-0">
                    <Skeleton className="ml-auto h-[18px] w-5" />
                  </TableCell>
                  <TableCell className="px-5 py-0">
                    <div className="flex items-center gap-2">
                      <Skeleton className="size-7 shrink-0 rounded-full" />
                      <Skeleton className="h-[18px] w-32" />
                    </div>
                  </TableCell>
                  <TableCell className="px-5 py-0">
                    <Skeleton className="h-[18px] w-14" />
                  </TableCell>
                  <TableCell className="px-5 py-0">
                    <Skeleton className="h-[18px] w-24" />
                  </TableCell>
                  <TableCell className="px-5 py-0">
                    <Skeleton className="h-[18px] w-20" />
                  </TableCell>
                  <TableCell className="px-5 py-0">
                    <Skeleton className="mx-auto size-5 rounded-md" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </PageBody>
    </Container>
  );
}
