import type { ComponentPropsWithRef } from "react";
import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { ArrowDownIcon } from "@superdao/icons";
import { AddIcon } from "@superdao/icons/outline";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@superdao/ui/components/collapsible";
import {
	SidebarGroup,
	SidebarGroupContent,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem,
} from "@superdao/ui/components/sidebar";
import { toast } from "@superdao/ui/components/toast";

import { useCreateAudience, useGetSidebarAudiences } from "@/entities/audience";
import { useGetSidebarReports } from "@/entities/reporting";
import type { CreatedAudience } from "@/widgets/pages/audiences";
import { CreateAudienceDialog } from "@/widgets/pages/audiences";

import type { SidebarNavigationChild } from "../../model/navigation";
import { sidebarNavigation } from "../../model/navigation";

export interface SidebarNavigationProps extends ComponentPropsWithRef<"nav"> {}

/**
 * Renders the application navigation and its collapsible sections.
 */
export function SidebarNavigation({ ref, className, ...props }: SidebarNavigationProps) {
	const pathname = usePathname();
	const router = useRouter();
	const sidebarAudiencesQuery = useGetSidebarAudiences();
	const sidebarReportsQuery = useGetSidebarReports();
	const createAudience = useCreateAudience();
	const [isCreateDialogOpen, setIsCreateDialogOpen] = useState<boolean>(false);
	const [openSections, setOpenSections] = useState<Record<string, boolean>>({});

	/**
	 * Creates an audience from the sidebar dialog.
	 */
	async function saveAudience(audience: CreatedAudience) {
		const response = await createAudience.mutateAsync({ title: audience.title, walletCount: audience.walletCount });
		const audienceID = response.data.id;

		setIsCreateDialogOpen(false);
		toast.add({
			title: "Audience created",
			description: `${audience.title} is ready to explore.`,
			type: "success",
		});
		router.push(`/audiences/${audienceID}`);
	}

	return (
		<nav
			ref={ref}
			id="sidebar-navigation"
			data-slot="sidebar-navigation"
			className={className}
			aria-label="Primary navigation"
			{...props}
		>
			<SidebarGroup>
				<SidebarGroupContent>
					<SidebarMenu>
						{sidebarNavigation.map((item) => {
							const Icon = item.icon;
							const children: readonly SidebarNavigationChild[] | undefined =
								item.kind === "audiences"
									? [
											...(sidebarAudiencesQuery.data ?? []).map((audience) => ({
												title: audience.title,
												href: `/audiences/${audience.id}`,
												meta:
													audience.walletCount > 0
														? new Intl.NumberFormat("en", { notation: "compact" }).format(audience.walletCount)
														: undefined,
											})),
											{ title: "Add audience", href: "/audiences/new", meta: "+" },
										]
									: item.title === "Reporting"
										? (sidebarReportsQuery.data?.data ?? []).map((report) => ({
												title: report.title,
												href: `/reporting/${report.id}`,
											}))
										: item.children;
							const hasActiveChild = children?.some(
								(child) => pathname === child.href || pathname.startsWith(`${child.href}/`)
							);
							const isItemActive = pathname !== "/" && pathname === item.href && !hasActiveChild;

							if (!children) {
								return (
									<SidebarMenuItem key={item.title}>
										<SidebarMenuButton
											isActive={isItemActive}
											render={<Link href={item.href} />}
										>
											<Icon />
											<span>{item.title}</span>
										</SidebarMenuButton>
									</SidebarMenuItem>
								);
							}

							return (
								<Collapsible
									key={item.title}
									open={openSections[item.title] ?? Boolean(item.defaultOpen || isItemActive || hasActiveChild)}
									onOpenChange={(open) => {
										setOpenSections((currentSections) => ({ ...currentSections, [item.title]: open }));
									}}
								>
									<SidebarMenuItem>
										<CollapsibleTrigger
											className="group/collapsible-trigger"
											render={<SidebarMenuButton isActive={isItemActive} />}
										>
											<Icon />
											<span>{item.title}</span>
											<ArrowDownIcon
												size={14}
												className="ml-auto !size-4 shrink-0 transition-transform !duration-0 group-data-panel-open/collapsible-trigger:rotate-180"
											/>
										</CollapsibleTrigger>
										<CollapsibleContent>
											<SidebarMenuSub>
												{children.map((child) => {
													const isAddAudience = child.href === "/audiences/new";

													return (
														<SidebarMenuSubItem key={child.title}>
															<SidebarMenuSubButton
																isActive={pathname === child.href || pathname.startsWith(`${child.href}/`)}
																render={<Link href={child.href} />}
																data-action={isAddAudience ? "add-audience" : undefined}
																className="data-[action=add-audience]:font-semibold data-active:[&>span:last-child]:text-sidebar-active-foreground data-[action=add-audience]:hover:[&>svg]:text-sidebar-muted-foreground data-[action=add-audience]:active:[&>svg]:text-sidebar-muted-foreground"
																onClick={(event) => {
																	if (isAddAudience) {
																		event.preventDefault();
																		setIsCreateDialogOpen(true);
																	}
																}}
															>
																<span>{child.title}</span>
																{isAddAudience ? (
																	<AddIcon
																		size={16}
																		className="ml-auto"
																		aria-hidden="true"
																	/>
																) : child.meta ? (
																	<span className="ml-auto text-xs text-sidebar-muted-foreground tabular-nums">
																		{child.meta}
																	</span>
																) : null}
															</SidebarMenuSubButton>
														</SidebarMenuSubItem>
													);
												})}
											</SidebarMenuSub>
										</CollapsibleContent>
									</SidebarMenuItem>
								</Collapsible>
							);
						})}
					</SidebarMenu>
				</SidebarGroupContent>
			</SidebarGroup>
			<CreateAudienceDialog
				open={isCreateDialogOpen}
				onOpenChange={setIsCreateDialogOpen}
				onCreate={(audience) => void saveAudience(audience)}
			/>
		</nav>
	);
}
