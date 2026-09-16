import type { ComponentPropsWithRef } from "react";
import Link from "next/link";

import { AddIcon } from "@superdao/icons/outline";
import { cn } from "@superdao/lib/utils";
import { Button } from "@superdao/ui/components/button";

import { Container } from "@/shared/ui/container";
import { PageBody, PageHeader } from "@/shared/ui/page-layout";

import { MembersTable } from "./components/members-table";

export interface MembersPageProps extends ComponentPropsWithRef<typeof Container> {}

/**
 * Renders the community members management page.
 */
export function MembersPage({ ref, className, ...props }: MembersPageProps) {
	return (
		<Container
			ref={ref}
			data-slot="members-page"
			className={cn("flex min-h-0 flex-1 flex-col lg:px-8", className)}
			{...props}
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
				<MembersTable />
			</PageBody>
		</Container>
	);
}
