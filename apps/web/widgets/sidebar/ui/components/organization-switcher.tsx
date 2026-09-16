import type { ComponentPropsWithRef } from "react";
import { useEffect, useMemo } from "react";
import Link from "next/link";

import { AddIcon } from "@superdao/icons";
import { ExpandIcon } from "@superdao/icons/outline";
import { Avatar, AvatarFallback, AvatarImage } from "@superdao/ui/components/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@superdao/ui/components/dropdown-menu";

import { useGetOrganizationByID, useGetOrganizations, useOrganizationSelection } from "@/entities/organization";
import { isNotFoundError } from "@/shared/api/utils/is-not-found-error";

export interface OrganizationAvatarProps extends ComponentPropsWithRef<typeof Avatar> {
	/**
	 * Text displayed when the organization image is unavailable.
	 */
	fallback: string;
	/**
	 * URL of the organization image.
	 */
	image: string;
}

/**
 * Renders an organization image with a monogram fallback.
 */
export function OrganizationAvatar({ ref, className, image, fallback, ...props }: OrganizationAvatarProps) {
	return (
		<Avatar
			ref={ref}
			size="s"
			className={className}
			{...props}
		>
			{image ? (
				<AvatarImage
					src={image}
					alt=""
				/>
			) : null}
			<AvatarFallback variant="inverse">{fallback}</AvatarFallback>
		</Avatar>
	);
}

export interface OrganizationSwitcherProps extends ComponentPropsWithRef<"div"> {}

/**
 * Renders the active organization and organization selection menu.
 */
export function OrganizationSwitcher({ ref, className, ...props }: OrganizationSwitcherProps) {
	const organizationsQuery = useGetOrganizations();
	const { activeOrganizationID, setActiveOrganizationID } = useOrganizationSelection();
	const activeOrganizationQuery = useGetOrganizationByID(activeOrganizationID);
	const organizations = useMemo(
		() =>
			organizationsQuery.error && isNotFoundError(organizationsQuery.error) ? [] : (organizationsQuery.data ?? []),
		[organizationsQuery.data, organizationsQuery.error]
	);
	const activeOrganization =
		activeOrganizationQuery.error && isNotFoundError(activeOrganizationQuery.error)
			? undefined
			: activeOrganizationQuery.data;

	useEffect(() => {
		if (organizations.length === 0 || activeOrganization) return;

		setActiveOrganizationID(organizations[0]?.id);
	}, [activeOrganization, organizations, setActiveOrganizationID]);

	if (organizationsQuery.error && !isNotFoundError(organizationsQuery.error)) throw organizationsQuery.error;
	if (activeOrganizationQuery.error && !isNotFoundError(activeOrganizationQuery.error))
		throw activeOrganizationQuery.error;

	if (!activeOrganization) {
		return (
			<div
				ref={ref}
				data-slot="organization-switcher"
				className={className}
				{...props}
			>
				<div
					className="flex h-10 w-full items-center gap-3 px-5"
					aria-label="Loading organizations"
				>
					<span className="size-8 animate-pulse rounded-full bg-sidebar-accent" />
					<span className="h-4 w-28 animate-pulse rounded bg-sidebar-accent" />
				</div>
			</div>
		);
	}

	return (
		<div
			ref={ref}
			data-slot="organization-switcher"
			className={className}
			{...props}
		>
			<DropdownMenu>
				<DropdownMenuTrigger
					render={
						<button
							className="flex h-10 w-full items-center gap-3 px-5 text-left outline-hidden hover:bg-sidebar-accent focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-inset data-popup-open:bg-sidebar-accent"
							type="button"
						/>
					}
				>
					<OrganizationAvatar
						fallback={activeOrganization.name.charAt(0).toUpperCase()}
						image={activeOrganization.avatarUrl}
					/>
					<span className="min-w-0 flex-1 truncate text-[17px]/[21px] font-bold text-sidebar-foreground">
						{activeOrganization.name}
					</span>
					<ExpandIcon className="shrink-0 text-sidebar-muted-foreground" />
				</DropdownMenuTrigger>

				<DropdownMenuContent
					align="start"
					alignOffset={8}
					sideOffset={8}
					className="flex max-h-[min(688px,var(--available-height))] w-68 max-w-[calc(100vw-16px)] flex-col overflow-hidden px-0 py-1"
				>
					<DropdownMenuGroup className="no-scrollbar min-h-0 flex-1 scroll-fade overflow-y-auto">
						{organizations.map((organization) => (
							<DropdownMenuItem
								key={organization.id}
								className="h-10 gap-3 rounded-none px-3 text-[15px]/[24px] font-semibold data-active:bg-sidebar-active data-active:text-sidebar-active-foreground"
								data-active={organization.id === activeOrganization.id ? "" : undefined}
								onClick={() => setActiveOrganizationID(organization.id)}
							>
								<OrganizationAvatar
									fallback={organization.name.charAt(0).toUpperCase()}
									image={organization.avatarUrl}
								/>
								<span className="truncate">{organization.name}</span>
							</DropdownMenuItem>
						))}
					</DropdownMenuGroup>

					<DropdownMenuGroup className="shrink-0 bg-popover">
						<DropdownMenuItem
							className="h-10 gap-3 rounded-none px-3 text-[15px]/[24px] font-semibold"
							render={<Link href="/organizations/new" />}
						>
							<span className="flex size-8 shrink-0 items-center justify-center text-icon">
								<AddIcon className="size-6 text-icon!" />
							</span>
							Create organization
						</DropdownMenuItem>
					</DropdownMenuGroup>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
}
