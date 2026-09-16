"use client";

import type { ComponentPropsWithRef } from "react";

import type { UsePaginationReturn } from "@superdao/hooks";
import { usePagination } from "@superdao/hooks";
import { cn } from "@superdao/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@superdao/ui/components/avatar";
import { Button } from "@superdao/ui/components/button";
import { Card } from "@superdao/ui/components/card";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@superdao/ui/components/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@superdao/ui/components/table";
import { toast } from "@superdao/ui/components/toast";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

import type { MemberRole } from "@/entities/member";
import { useMemberStore } from "@/entities/member";

import { MemberActionsMenu } from "./member-actions-menu";

const defaultPageSize = 16;
const pageSizeOptions = [16, 32, 48] as const;

export interface MembersTableProps extends ComponentPropsWithRef<"div"> {}

/**
 * Renders the community members table with row actions.
 */
export function MembersTable({ ref, className, ...props }: MembersTableProps) {
	const members = useMemberStore((state) => state.members);
	const changeMemberRole = useMemberStore((state) => state.changeMemberRole);
	const removeStoredMember = useMemberStore((state) => state.removeMember);
	const pagination = usePagination({
		limit: defaultPageSize,
		offset: 0,
		total: members.length,
	});
	const visibleMembers = members.slice(pagination.offset, pagination.offset + pagination.limit);

	/**
	 * Updates a member role and confirms the change.
	 */
	function changeRole(memberID: string, role: MemberRole) {
		const member = members.find((candidate) => candidate.id === memberID);

		if (!member || member.role === role) return;

		changeMemberRole(memberID, role);
		toast.add({
			title: role === "Member" ? `${member.role} rights revoked` : `${role} rights granted`,
			description: `${member.name}'s role is now ${role}.`,
			type: "success",
		});
	}

	/**
	 * Removes a member and confirms the change.
	 */
	function removeMember(memberID: string) {
		const member = members.find((candidate) => candidate.id === memberID);

		if (!member) return;

		removeStoredMember(memberID);
		toast.add({
			title: "Member removed",
			description: `${member.name} was removed from the organization.`,
			type: "success",
		});
	}

	return (
		<div
			ref={ref}
			data-slot="members-table"
			className={cn("flex min-h-0 flex-1 flex-col", className)}
			{...props}
		>
			<Card className="relative min-h-0 flex-1">
				<div className="min-h-0 flex-1 overflow-hidden">
					<Table className="min-w-215 table-fixed">
						<TableHeader>
							<TableRow className="h-13.5 border-0 hover:bg-transparent">
								<TableHead className="h-13.5 w-12 px-5 pt-6 pb-3 text-right text-[13px]/[18px] font-semibold text-[#717a8c]">
									#
								</TableHead>
								<TableHead className="h-13.5 w-72.5 px-5 pt-6 pb-3 text-[13px]/[18px] font-semibold text-[#717a8c]">
									Member
								</TableHead>
								<TableHead className="h-13.5 px-5 pt-6 pb-3 text-[13px]/[18px] font-semibold text-[#717a8c]">
									Role
								</TableHead>
								<TableHead className="h-13.5 px-5 pt-6 pb-3 text-[13px]/[18px] font-semibold text-[#717a8c]">
									Assigned by
								</TableHead>
								<TableHead className="h-13.5 px-5 pt-6 pb-3 text-[13px]/[18px] font-semibold text-[#717a8c]">
									Join date
								</TableHead>
								<TableHead className="h-13.5 w-20 px-5 pt-6 pb-3">
									<span className="sr-only">Actions</span>
								</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{visibleMembers.map((member) => (
								<TableRow
									key={member.id}
									data-role={member.role.toLowerCase()}
									className="group/member-row h-14 border-0"
								>
									<TableCell className="h-14 px-5 py-0 text-right text-[#717a8c] tabular-nums">
										{member.index}
									</TableCell>
									<TableCell className="h-14 px-5 py-0">
										<div className="flex min-w-0 items-center gap-2">
											<Avatar size="compact">
												<AvatarImage
													src={member.avatar}
													alt=""
												/>
												<AvatarFallback variant="inverse">{member.name.charAt(0).toUpperCase()}</AvatarFallback>
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
											onRemove={removeMember}
											onRoleChange={changeRole}
										/>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</div>
			</Card>
			<MembersPagination pagination={pagination} />
		</div>
	);
}

export interface MembersPaginationProps extends ComponentPropsWithRef<"div"> {
	pagination: UsePaginationReturn;
}

/**
 * Renders pagination controls for the members table.
 */
export function MembersPagination({ ref, className, pagination, ...props }: MembersPaginationProps) {
	return (
		<div
			ref={ref}
			data-slot="members-pagination"
			className={cn(
				"flex min-h-17 flex-wrap items-center justify-end gap-6 px-6 py-3 text-[13px]/[18px] text-tabs-foreground",
				className
			)}
			{...props}
		>
			<div className="hidden items-center gap-2 lg:flex">
				<span className="min-w-20 text-center text-foreground">Rows per page</span>
				<Select
					value={`${pagination.limit}`}
					onValueChange={(value) => pagination.setLimit(Number(value))}
				>
					<SelectTrigger
						size="sm"
						className="w-20"
						aria-label="Rows per page"
					>
						<SelectValue placeholder={pagination.limit} />
					</SelectTrigger>
					<SelectContent side="top">
						<SelectGroup>
							{pageSizeOptions.map((option) => (
								<SelectItem
									key={option}
									value={`${option}`}
								>
									{option}
								</SelectItem>
							))}
						</SelectGroup>
					</SelectContent>
				</Select>
			</div>

			<span
				className="min-w-20 text-center text-foreground"
				aria-live="polite"
			>
				{pagination.page} of {pagination.pageCount.toLocaleString("en-US").replace(/,/g, " ")} pages
			</span>

			<div className="flex items-center gap-2">
				<Button
					type="button"
					variant="secondary"
					size="icon-sm"
					className="hidden lg:inline-flex"
					disabled={!pagination.canGoPrevious}
					aria-label="Go to first page"
					onClick={pagination.goToFirst}
				>
					<ChevronsLeft />
				</Button>
				<Button
					type="button"
					variant="secondary"
					size="icon-sm"
					disabled={!pagination.canGoPrevious}
					aria-label="Go to previous page"
					onClick={pagination.goToPrevious}
				>
					<ChevronLeft />
				</Button>
				<Button
					type="button"
					variant="secondary"
					size="icon-sm"
					disabled={!pagination.canGoNext}
					aria-label="Go to next page"
					onClick={pagination.goToNext}
				>
					<ChevronRight />
				</Button>
				<Button
					type="button"
					variant="secondary"
					size="icon-sm"
					className="hidden lg:inline-flex"
					disabled={!pagination.canGoNext}
					aria-label="Go to last page"
					onClick={pagination.goToLast}
				>
					<ChevronsRight />
				</Button>
			</div>
		</div>
	);
}
