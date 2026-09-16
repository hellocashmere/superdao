import type { ComponentPropsWithRef } from "react";
import Link from "next/link";

import { ArrowLeftIcon } from "@superdao/icons/outline";
import { cn } from "@superdao/lib/utils";
import { Avatar, AvatarImage } from "@superdao/ui/components/avatar";

import { PageHeader } from "../header/page-header";

export interface PageHeaderIDProps extends ComponentPropsWithRef<typeof PageHeader> {
	/**
	 * Destination for the optional back button.
	 */
	back?: string;

	/**
	 * Primary heading displayed for the resource.
	 */
	title: string;

	/**
	 * Optional image URL displayed beside the title.
	 */
	avatar?: string;

	/**
	 * Resource count displayed beside the title.
	 */
	count: string | number;
}

/**
 * Renders a detail-page header with resource identity and optional navigation.
 */
export function PageHeaderID({ ref, className, back, title, avatar, count, children, ...props }: PageHeaderIDProps) {
	return (
		<PageHeader
			ref={ref}
			data-slot="page-header-id"
			className={cn("flex min-h-18 items-center justify-between gap-5", className)}
			{...props}
		>
			<div className="flex min-w-0 items-center gap-3">
				{back ? (
					<Link
						href={back}
						aria-label="Back"
						className="-ml-2 flex size-8 shrink-0 items-center justify-center rounded-full text-tabs-foreground outline-none hover:bg-sidebar-accent hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/40"
					>
						<ArrowLeftIcon size={24} />
					</Link>
				) : null}
				{avatar ? (
					<Avatar size="s">
						<AvatarImage
							src={avatar}
							alt=""
						/>
					</Avatar>
				) : null}
				<div className="flex min-w-0 items-end gap-3">
					<h1 className="truncate text-2xl/7 font-bold">{title}</h1>
					<span className="pb-0.5 text-xl/6 font-bold text-tabs-foreground">{count}</span>
				</div>
			</div>
			{children}
		</PageHeader>
	);
}
