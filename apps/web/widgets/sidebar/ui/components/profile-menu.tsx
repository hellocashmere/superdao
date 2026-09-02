import type { ComponentPropsWithRef } from "react";
import Link from "next/link";

import { EditIcon, MailIcon } from "@superdao/icons";
import { Avatar, AvatarFallback, AvatarImage } from "@superdao/ui/components/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@superdao/ui/components/dropdown-menu";

import { useSessionStore } from "@/entities/session";
import { useUserStore } from "@/entities/user";
import { LogoutMenuItem } from "@/features/authentication";

export interface ProfileMenuProps extends ComponentPropsWithRef<"div"> {}

/**
 * Renders the current profile and account actions in the sidebar footer.
 */
export function ProfileMenu({ className, ref, ...props }: ProfileMenuProps) {
  const userID = useSessionStore((state) => state.userID);
  const user = useUserStore((state) => state.users.find((candidate) => candidate.id === userID));

  if (!user) {
    return null;
  }

  const fallback = user.name.charAt(0).toUpperCase();

  return (
    <div
      ref={ref}
      data-slot="sidebar-profile"
      className={className}
      {...props}
    >
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <button
              className="flex h-10 w-full items-center gap-3 px-5 text-left text-[15px]/[24px] font-semibold outline-hidden hover:bg-sidebar-accent focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-inset data-popup-open:bg-sidebar-accent"
              type="button"
            />
          }
        >
          <Avatar size="s">
            <AvatarImage
              src={user.avatarUrl}
              alt=""
            />
            <AvatarFallback className="font-bold text-white">{fallback}</AvatarFallback>
          </Avatar>
          <span className="min-w-0 flex-1 truncate">{user.name}</span>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="start"
          alignOffset={8}
          side="top"
          sideOffset={4}
          className="w-[272px]"
        >
          <DropdownMenuItem
            className="h-10 gap-3 rounded-none px-3 text-[15px]/[24px] font-semibold"
            render={<Link href="/profile/settings" />}
          >
            <EditIcon size={24} />
            Edit profile
          </DropdownMenuItem>
          <DropdownMenuItem
            className="h-10 gap-3 rounded-none px-3 text-[15px]/[24px] font-semibold"
            render={<Link href="/profile/email/settings" />}
          >
            <MailIcon size={24} />
            Email settings
          </DropdownMenuItem>
          <LogoutMenuItem />
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
