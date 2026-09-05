"use client";

import type { ComponentPropsWithRef } from "react";
import { useMemo, useState } from "react";
import Link from "next/link";

import { useLoading } from "@superdao/hooks";
import { AddIcon } from "@superdao/icons/outline";
import { cn } from "@superdao/lib/utils";
import { Button } from "@superdao/ui/components/button";

import type { MemberRole } from "@/entities/member";
import { useMemberStore } from "@/entities/member";
import { Container } from "@/shared/ui/container";
import { PageBody, PageHeader } from "@/shared/ui/page-layout";

import { MembersPageSkeleton } from "./components/members-page-skeleton";
import { MembersPagination } from "./components/members-pagination";
import { MembersTable } from "./components/members-table";

const defaultPageSize = 16;
const pageSizeOptions = [16, 32, 48] as const;

export interface MembersPageProps extends ComponentPropsWithRef<typeof Container> {}

/**
 * Renders the community members management page.
 */
export function MembersPage({ className, ref, ...props }: MembersPageProps) {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(defaultPageSize);
  const isLoading = useLoading(3000);
  const allMembers = useMemberStore((state) => state.members);
  const changeMemberRole = useMemberStore((state) => state.changeMemberRole);
  const removeStoredMember = useMemberStore((state) => state.removeMember);
  const members = useMemo(() => allMembers.map((member, index) => ({ ...member, index: index + 1 })), [allMembers]);
  const pageCount = Math.max(1, Math.ceil(members.length / pageSize));
  const currentPage = Math.min(page, pageCount);
  const visibleMembers = members.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  function changeRole(memberID: string, role: MemberRole) {
    changeMemberRole(memberID, role);
  }

  function removeMember(memberID: string) {
    removeStoredMember(memberID);
  }

  if (isLoading) {
    return (
      <MembersPageSkeleton
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
      data-slot="members-page"
      className={cn("flex min-h-0 flex-1 flex-col lg:px-8", className)}
    >
      <PageHeader className="flex min-h-18 items-center justify-between gap-4">
        <h1 className="font-heading text-2xl/[28px] font-bold">Members</h1>
        <Button
          variant="secondary"
          nativeButton={false}
          render={<Link href="/members/add" />}
        >
          <AddIcon data-icon="inline-start" />
          Add members
        </Button>
      </PageHeader>
      <PageBody className="flex min-h-0 flex-1 flex-col pb-7">
        <MembersTable
          members={visibleMembers}
          onRoleChange={changeRole}
          onRemove={removeMember}
        />
        <MembersPagination
          page={currentPage}
          pageCount={pageCount}
          pageSize={pageSize}
          pageSizeOptions={pageSizeOptions}
          onPageSizeChange={(nextPageSize) => {
            setPageSize(nextPageSize);
            setPage(1);
          }}
          onFirst={() => setPage(1)}
          onPrevious={() => setPage((current) => Math.max(1, current - 1))}
          onNext={() => setPage((current) => Math.min(pageCount, current + 1))}
          onLast={() => setPage(pageCount)}
        />
      </PageBody>
    </Container>
  );
}
