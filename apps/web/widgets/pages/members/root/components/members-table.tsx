"use client";

import type { ComponentPropsWithRef } from "react";

import { cn } from "@superdao/lib/utils";
import { Avatar, AvatarImage } from "@superdao/ui/components/avatar";
import { Card } from "@superdao/ui/components/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@superdao/ui/components/table";

import type { CommunityMember, MemberRole } from "@/entities/member";

import { MemberActionsMenu } from "./member-actions-menu";

export interface MembersTableProps extends ComponentPropsWithRef<typeof Card> {
  members: readonly CommunityMember[];
  onRemove: (memberID: string) => void;
  onRoleChange: (memberID: string, role: MemberRole) => void;
}

/**
 * Renders the community members table with row actions.
 */
export function MembersTable({ className, ref, members, onRemove, onRoleChange, ...props }: MembersTableProps) {
  return (
    <Card
      {...props}
      ref={ref}
      data-slot="members-table-card"
      className={cn("relative min-h-0 flex-1", className)}
    >
      <div className="min-h-0 flex-1 overflow-hidden">
        <Table className="min-w-[860px] table-fixed">
          <TableHeader>
            <TableRow className="h-[54px] border-0 hover:bg-transparent">
              <TableHead className="h-[54px] w-12 px-5 pt-6 pb-3 text-right text-[13px]/[18px] font-semibold text-[#717a8c]">
                #
              </TableHead>
              <TableHead className="h-[54px] w-[290px] px-5 pt-6 pb-3 text-[13px]/[18px] font-semibold text-[#717a8c]">
                Member
              </TableHead>
              <TableHead className="h-[54px] px-5 pt-6 pb-3 text-[13px]/[18px] font-semibold text-[#717a8c]">
                Role
              </TableHead>
              <TableHead className="h-[54px] px-5 pt-6 pb-3 text-[13px]/[18px] font-semibold text-[#717a8c]">
                Assigned by
              </TableHead>
              <TableHead className="h-[54px] px-5 pt-6 pb-3 text-[13px]/[18px] font-semibold text-[#717a8c]">
                Join date
              </TableHead>
              <TableHead className="h-[54px] w-20 px-5 pt-6 pb-3">
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {members.map((member) => (
              <TableRow
                key={member.id}
                data-role={member.role.toLowerCase()}
                className="group/member-row h-14 border-0"
              >
                <TableCell className="h-14 px-5 py-0 text-right text-[#717a8c] tabular-nums">{member.index}</TableCell>
                <TableCell className="h-14 px-5 py-0">
                  <div className="flex min-w-0 items-center gap-2">
                    <Avatar className="size-7">
                      <AvatarImage
                        src={member.avatar}
                        alt=""
                      />
                    </Avatar>
                    <span className="truncate text-sm/5 font-semibold">{member.name}</span>
                  </div>
                </TableCell>
                <TableCell className="h-14 px-5 py-0 text-sm/5">{member.role}</TableCell>
                <TableCell className="h-14 px-5 py-0 text-sm/5">{member.assignedBy ?? "–"}</TableCell>
                <TableCell className="h-14 px-5 py-0 text-sm/5 tabular-nums">{member.joinDate}</TableCell>
                <TableCell className="h-14 px-5 py-0">
                  <MemberActionsMenu
                    member={member}
                    onRemove={onRemove}
                    onRoleChange={onRoleChange}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}
