import type { ComponentPropsWithRef } from "react";
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

import { useOrganizationStore } from "@/entities/organization";

export interface OrganizationAvatarProps extends ComponentPropsWithRef<typeof Avatar> {
  fallback: string;
  image: string;
}

/**
 * Renders an organization image with a monogram fallback.
 */
export function OrganizationAvatar({ className, image, fallback, ref, ...props }: OrganizationAvatarProps) {
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
      <AvatarFallback className="text-[11px] font-bold text-white">{fallback}</AvatarFallback>
    </Avatar>
  );
}

export interface OrganizationSwitcherProps extends ComponentPropsWithRef<"div"> {}

/**
 * Renders the active organization and organization selection menu.
 */
export function OrganizationSwitcher({ className, ref, ...props }: OrganizationSwitcherProps) {
  const activeOrganizationID = useOrganizationStore((state) => state.activeOrganizationID);
  const organizations = useOrganizationStore((state) => state.organizations);
  const setActiveOrganization = useOrganizationStore((state) => state.setActiveOrganization);
  const activeOrganization =
    organizations.find((organization) => organization.id === activeOrganizationID) ?? organizations[0]!;

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
                onClick={() => setActiveOrganization(organization.id)}
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
              <AddIcon />
              Create organization
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
