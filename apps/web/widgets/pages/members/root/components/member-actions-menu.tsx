"use client";

import type { ComponentPropsWithRef } from "react";

import { CopyIcon, CrownIcon, CrownOffIcon, DeleteIcon, DotsIcon, ProIcon, ProOffIcon } from "@superdao/icons/outline";
import { cn } from "@superdao/lib/utils";
import { Button } from "@superdao/ui/components/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@superdao/ui/components/dropdown-menu";
import { toast } from "@superdao/ui/components/toast";

import type { CommunityMember, MemberRole } from "@/entities/member";

export interface MemberActionsMenuProps extends ComponentPropsWithRef<"div"> {
  member: CommunityMember;
  onRemove: (memberID: string) => void;
  onRoleChange: (memberID: string, role: MemberRole) => void;
}

/**
 * Renders the role-aware actions for a community member.
 */
export function MemberActionsMenu({
  className,
  ref,
  member,
  onRemove,
  onRoleChange,
  ...props
}: MemberActionsMenuProps) {
  async function copyAddress() {
    try {
      await navigator.clipboard.writeText(member.address);
      toast.add({
        title: "Address copied",
        description: `${member.name}'s address has been copied to your clipboard.`,
        type: "success",
      });
    } catch {
      toast.add({
        title: "Couldn't copy address",
        description: "Check your browser permissions and try again.",
        type: "error",
      });
    }
  }

  return (
    <div
      {...props}
      ref={ref}
      data-slot="member-actions"
      data-role={member.role.toLowerCase()}
      className={cn("flex justify-end", className)}
    >
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              className="rounded-full text-muted-foreground"
              aria-label={`Actions for ${member.name}`}
            />
          }
        >
          <DotsIcon size={24} />
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-auto min-w-[175px] bg-[#343a46] ring-0"
        >
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={copyAddress}>
              <CopyIcon />
              Copy address
            </DropdownMenuItem>

            {member.role === "Owner" ? (
              <DropdownMenuItem onClick={() => onRoleChange(member.id, "Member")}>
                <CrownOffIcon />
                Revoke owner rights
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem onClick={() => onRoleChange(member.id, "Owner")}>
                <CrownIcon />
                Grant owner
              </DropdownMenuItem>
            )}

            {member.role === "Admin" ? (
              <DropdownMenuItem onClick={() => onRoleChange(member.id, "Member")}>
                <ProOffIcon />
                Revoke admin rights
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem onClick={() => onRoleChange(member.id, "Admin")}>
                <ProIcon />
                Grant admin
              </DropdownMenuItem>
            )}

            <DropdownMenuItem
              variant="destructive"
              onClick={() => onRemove(member.id)}
            >
              <DeleteIcon />
              Remove
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
